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
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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