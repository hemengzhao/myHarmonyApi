var express = require('express');
var router = express.Router();

const {Article} = require('../../models')

router.get('/', async function (req, res, next){
    try{
        const condition = {
            order: [['id', 'DESC']]
        }
        const articles = await Article.findAll(condition)
        res.json({
            status: true,
            messages: '查询成功',
            data: articles 
        })
    } catch(err){
        res.status(500).json({
            status: false,
            messages: '查询失败',
            errors: [err.messages] 
        })
    }
    
})

router.get('/:id', async function (req, res, next){
    try{
        const {id} = req.params
  
        const article = await Article.findByPk(id)
        console.log(id, article)
        if(article){
            res.json({
                status: true,
                messages: '查询成功',
                data: article 
            })
        } else {
            res.status(404).json({
                status: false,
                messages: '没有数据',
                data: '' 
            })
        }
     
    } catch(err){
        res.status(500).json({
            status: false,
            messages: '查询失败',
            errors: [err.messages] 
        })
    }
    
})


module.exports = router