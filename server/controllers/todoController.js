const models = require('../models')

const todoController = {
  // path: todo/ 全てのタスクの取得
  getAllTodos (req, res) {
    models.todos.findAll()
      .then((todos) => {
        console.log(`全てのタスク: ${todos}`)
        if (!todos) {
          console.log('タスクがありません')
          res.sendStatus(404)
          return
        }
        res.status(200).send(todos)
      })
  }
}

module.exports = todoController
