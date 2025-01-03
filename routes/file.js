var express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

var router = express.Router();
const upload = multer({ dest: 'uploads/' });

// 创建临时文件夹，用于存储切片文件
const TEMP_DIR = path.join(__dirname, '../uploads/temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// 上传切片的接口
router.post('/upload-chunk', upload.single('chunk'), async (req, res) => {
  try {
    const { index, hash } = req.body;
    const chunk = req.file;
    
    // 创建以文件hash命名的文件夹
    const chunkDir = path.join(TEMP_DIR, hash);
    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir);
    }

    // 将切片从临时路径移动到指定文件夹
    const chunkPath = path.join(chunkDir, `${index}`);
    fs.renameSync(chunk.path, chunkPath);

    res.json({
      code: 0,
      message: '切片上传成功'
    });
  } catch (error) {
    res.status(500).json({
      code: 1,
      message: '切片上传失败',
      error: error.message
    });
  }
});

// 合并切片的接口
router.post('/merge', async (req, res) => {
  try {
    const { hash, filename, size } = req.body;
    const chunkDir = path.join(TEMP_DIR, hash);
    const filePath = path.join(__dirname, '../uploads', filename);

    // 读取所有切片
    const chunks = fs.readdirSync(chunkDir);
    // 排序切片
    chunks.sort((a, b) => a - b);

    // 创建写入流
    const writeStream = fs.createWriteStream(filePath);
    
    // 依次写入切片
    for (const chunk of chunks) {
      const chunkPath = path.join(chunkDir, chunk);
      const buffer = fs.readFileSync(chunkPath);
      writeStream.write(buffer);
      // 删除切片文件
      fs.unlinkSync(chunkPath);
    }
    writeStream.end();

    // 删除临时切片目录
    fs.rmdirSync(chunkDir);

    res.json({
      code: 0,
      message: '文件合并成功',
      url: `/uploads/${filename}`
    });
  } catch (error) {
    res.status(500).json({
      code: 1,
      message: '文件合并失败',
      error: error.message
    });
  }
});

/* GET users listing. */
router.post('/upload', upload.single('file'), function(req, res, next) {

  console.log('接收到文件:', req.file);
  console.log('分片编号:', req.body.chunkNumber);
  console.log('总分片数:', req.body.totalChunks);

  if (!req.file) {
      return res.status(400).json({ message: '未选择文件' });
  }

  const totalChunks = parseInt(req.body.totalChunks);
  const originalName = req.file.originalname;

  // 使用临时文件名保存分片
  const chunkFilePath = path.join('uploads', `${Date.now()}-${req.file.originalname}.part${req.body.chunkNumber}`);
  fs.renameSync(req.file.path, chunkFilePath);

  if (parseInt(req.body.chunkNumber) === totalChunks) {
      // 当只有一个分片时，直接使用上传的文件
      if (totalChunks === 1) {
          const finalFilePath = path.join('uploads', originalName);
          fs.renameSync(chunkFilePath, finalFilePath);
          return res.json({ message: '文件上传成功', filename: originalName });
      }

      const mergedFilePath = path.join('uploads', originalName);
      const writeStream = fs.createWriteStream(mergedFilePath);

      for (let i = 1; i <= totalChunks; i++) {
          const partFilePath = path.join('uploads', `${Date.now()}-${originalName}.part${i}`);
          console.log(`检查分片文件: ${partFilePath}`);

          // 检查分片文件是否存在
          if (fs.existsSync(partFilePath)) {
              const readStream = fs.createReadStream(partFilePath);
              readStream.pipe(writeStream, { end: false });

              readStream.on('end', () => {
                // 删除分片文件
                  fs.unlinkSync(partFilePath);
              });
          } else {
              console.error(`分片文件不存在: ${partFilePath}`);
              return res.status(400).json({ message: `分片文件不存在: ${partFilePath}` });
          }
      }

      writeStream.on('finish', () => {
          res.json({ message: '文件上传成功', filename: originalName });
      });

      writeStream.on('error', (err) => {
          console.error(err);
          res.status(500).json({ message: '合并分片失败' });
      });
  } else {
      res.json({ message: '分片上传成功', chunkNumber: req.body.chunkNumber });
  }
 
});

module.exports = router;


// // 前端示例代码
// const chunkSize = 1024 * 1024; // 1MB per chunk
// const chunks = Math.ceil(file.size / chunkSize);
// const fileHash = await calculateHash(file); // 计算文件hash

// for (let i = 0; i < chunks; i++) {
//   const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
//   const formData = new FormData();
//   formData.append('chunk', chunk);
//   formData.append('hash', fileHash);
//   formData.append('index', i);
  
//   await axios.post('/file/upload-chunk', formData);
// }

// // 所有切片上传完成后，请求合并
// await axios.post('/file/merge', {
//   hash: fileHash,
//   filename: file.name,
//   size: file.size
// });