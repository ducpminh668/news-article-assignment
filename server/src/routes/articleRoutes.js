const express = require('express');
const router = express.Router()
const articleController = require('../controllers/articlesController')

router.get('/:id', articleController.getArticle)
router.delete('/:id', articleController.deleteArticle)
router.patch('/:id', articleController.updateArticle)

router.get('/', articleController.listArticles)

router.post('/', articleController.createArticle)



module.exports = router;
