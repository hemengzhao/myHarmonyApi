var express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

var router = express.Router();
const upload = multer({ dest: 'uploads/' });

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