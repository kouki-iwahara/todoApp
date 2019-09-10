const models = require('../models')

const todoController = {
  // path: todo/json 全てのタスクの取得
  getAllTodos (req, res) {
    models.todos.findAll()
      .then((todos) => {
        console.log(`全てのタスク: ${todos}`)
        if (!todos) {
          console.log('タスクがありません')
          res.send('タスクがありません')
          return
        }
        res.json(todos)
      })
  }
}

module.exports = todoController
