const models = require('../models')

const todoController = {
  // path: todo/ 全てのタスクの取得
  getAllTodos(req, res) {
    models.todos.findAll().then(todos => {
      console.log(`全てのタスク: ${todos}`)
      if (!todos) {
        console.log('タスクがありません')
        res.status(404).send({ error: 'タスクがありません' })
        return
      }
      res.status(200).send(todos)
    })
  },
  //  タスクの追加 path: /todo method: post
  addTodo(req, res) {
    models.todos
      .create({ taskContent: req.body.taskContent })
      .then(todo => {
        // この時点ではtaskStateが格納されていない
        console.log(todo)
        // 登録されたtodoを習得
        return models.todos.findOne({ where: { taskId: todo.taskId } })
      })
      .then(todo => {
        console.log(todo)
        res.status(200).send(todo)
      })
      .catch(error => {
        console.log(error)
        res.status(404).send({ error: error.message })
      })
  }
}

module.exports = todoController
