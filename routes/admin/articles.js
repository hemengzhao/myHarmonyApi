var express = require("express");
var router = express.Router();

const { Article } = require("../../models");
const { Op } = require("sequelize");

const { NotFoundError, success, failure } = require("../../utils/response");
router.get("/", async function (req, res, next) {
  try {
    const query = req.query;
    const page = Math.abs(Number(query.page)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const condition = {
      order: [["id", "DESC"]],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    };

    if (query.title) {
      condition.where = {
        title: {
          [Op.like]: `%${query.title}%`,
        },
      };
    }

    const { rows, count } = await Article.findAndCountAll(condition);
    success(res, "查询成功", {
      articles: rows,
      pagination: {
        total: count,
        currentPage: page,
        pageSize,
      },
    });
  } catch (err) {
    failure(res, err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const article = await getArticle(req);

    success(res, "查询成功", article);
  } catch (err) {
    failure(res, err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const { title, content } = req.body;
    const condition = {
      title,
      content,
    };

    const articles = await Article.create(condition);

    success(res, "添加成功", articles, 201);
  } catch (err) {
    failure(res, err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const article = await getArticle(req);
    await article.destroy();

    success(res, "删除成功", article);
  } catch (err) {
    failure(res, err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const article = await getArticle(req);

    const { title, content } = req.body;
    const condition = {
      title,
      content,
    };
    await article.update(condition);
    success(res, "更新成功", article);
  } catch (err) {
    failure(res, err);
  }
});

async function getArticle(req) {
  const { id } = req.params;
  const article = await Article.findByPk(id);
  if (!article) {
    throw new NotFoundError(`ID: ${id}的文章未找到。`);
  }
  return article;
}

module.exports = router;
