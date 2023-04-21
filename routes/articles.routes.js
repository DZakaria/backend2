const express = require('express')
// const { EditArticles, getAllarticles,createArticles, saveArticle, oneArticle, putArticles, patchArticles, deleteArticles } = require('../controllers/articles.controller')
const articleController = require('../controllers/articles.controller')

const router = express.Router()
const multer  = require('multer')
const path = require('path')


router.get('/articles', articleController.getAllarticles)
router.get('/articles/create', articleController.createArticles)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/../public/uploads`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,uniqueSuffix+ path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })



router.post('/articles', upload.single('url'),  articleController.saveArticle)

router.get('/articles/:id', articleController.oneArticle)

router.get('/article/update/:id', articleController.EditArticles)

// router.post('/articles/update/:id', putArticles)
router.post('/articles/update/:id', articleController.putArticles)

router.patch('/articles/:id', articleController.patchArticles)

router.get('/articles/delete/:id', articleController.deleteArticles)// node taykhdem ab get ol post

module.exports = router