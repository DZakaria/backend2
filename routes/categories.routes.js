const express = require('express')
const { getAllCategories, saveCategories, oneCategorie, putCategories, patchCategories, deleteCategories } = require('../controllers/categories.controller')

const router = express.Router()



router.get('/categories', getAllCategories)

router.post('/categories', saveCategories)

router.get('/categories/:id', oneCategorie)

router.put('/categories/:id', putCategories)

router.patch('/categories/:id', patchCategories)

router.delete('/categories/:id', deleteCategories)

module.exports = router