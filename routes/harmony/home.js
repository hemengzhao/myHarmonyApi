var express = require("express");
var router = express.Router();
const { HomeSwilper } = require("../../models");
const { NotFoundError, success, failure } = require("../../utils/response");

// 首页轮播图
router.get("/swilper", async function (req, res, next) {
    try { 
        const list = await HomeSwilper.findAll();
        success(res, "查询成功", list);
    } catch (err) {
        failure(res, err);
    }
});

// 添加首页轮播图
router.post("/swilper", async function (req, res, next) {
    try { 
        const {imgurl, goods_id,navigator_url, open_type } = req.body;
        const condition = {
            imgurl, goods_id,navigator_url, open_type
        }
        console.log("🚀 ~ condition:", condition, HomeSwilper)
        const list = await HomeSwilper.create(condition);
        success(res, "创建成功", list);
    } catch (err) {
        failure(res, err);
    }
});

// 删除首页轮播图
router.delete("/swilper/:id", async function (req, res, next) {
    try {  
         const swilper = await getSwilper(req);
         await swilper.destroy();
        success(res, "删除成功", list);
    } catch (err) {
        failure(res, err);
    }
});

// 删除首页轮播图
router.put("/swilper/:id", async function (req, res, next) {
    try {  
         const swilper = await getSwilper(req);
         const {imgurl, goods_id, navigator_url, open_type } = req.body;
         const condition = {
             imgurl, goods_id, navigator_url, open_type
         }
         await swilper.update(condition);
         success(res, "更新成功", article);
    } catch (err) {
        failure(res, err);
    }
});
async function getSwilper(req) {
    const { id } = req.params;
    const swilper = await HomeSwilper.findByPk(id);
    if (!swilper) {
      throw new NotFoundError(`ID: ${id}的轮播图未找到。`);
    }
    return swilper;
  }
module.exports = router;