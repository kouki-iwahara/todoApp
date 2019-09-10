const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

router.get('/json', todoController.getAllTodos)

module.exports = router
