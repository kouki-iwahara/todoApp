const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

// 全てのタスクを取得
router.get('/', todoController.getAllTodos)
// タスクの追加
router.post('/', todoController.addTodo)
// stateの切り替え
router.get('/update', todoController.updateState)
// タスクの削除
router.get('/del', todoController.delTodo)

module.exports = router
