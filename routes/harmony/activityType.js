var express = require("express");
var router = express.Router();
const { ActivityType } = require("../../models");
const { NotFoundError, success, failure } = require("../../utils/response");

// 首页分类模块
router.get("/", async function (req, res, next) {
    try { 
        const list = await ActivityType.findAll();
        success(res, "查询成功", list);
    } catch (err) {
        failure(res, err);
    }
});

// 添加首页分类模块
router.post("/", async function (req, res, next) {
    try { 
        const {name,image_src, navigator_url, open_type} = req.body;
        const condition = {
            name,image_src, navigator_url, open_type
        } 
        const list = await ActivityType.create(condition);
        success(res, "创建成功", list);
    } catch (err) {
        failure(res, err);
    }
});

// 删除首页分类模块
router.delete("/:id", async function (req, res, next) {
    try {  
         const swilper = await getSwilper(req);
         await swilper.destroy();
        success(res, "删除成功", list);
    } catch (err) {
        failure(res, err);
    }
});

// 删除首页分类模块
router.put("/:id", async function (req, res, next) {
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
    const swilper = await ActivityType.findByPk(id);
    if (!swilper) {
      throw new NotFoundError(`ID: ${id}的分类模块未找到。`);
    }
    return swilper;
  }
module.exports = router;