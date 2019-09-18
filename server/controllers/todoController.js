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
  },
  // taskStateの切り替え path: todo/update method: put
  async updateState(req, res) {
    // 渡されたidのタスクを取得
    const todoData = await models.todos
      .findOne({
        where: { taskId: req.params.id }
      })
      .catch(error => {
        console.log(error)
      })
    // taskStateが作業中なら完了にupdate
    if (todoData.taskState === '作業中') {
      const updateTodo = await todoData
        .update({ taskState: '完了' })
        .catch(error => {
          console.log(error)
          res.status(404).send({ error: error.message })
        })
      return res.status(200).send(updateTodo.taskState)
    }
    // taskStateが完了なら作業中にupdate
    if (todoData.taskState === '完了') {
      const updateTodo = await todoData
        .update({ taskState: '作業中' })
        .catch(error => {
          console.log(error)
          res.status(404).send({ error: error.message })
        })
      return res.status(200).send(updateTodo.taskState)
    }
  },
  // タスクの消去 path: todo/del method: delete
  async delTodo(req, res) {
    // 渡されたidのタスクを取得
    const todoData = await models.todos.findOne({
      where: { taskId: req.params.id }
    })
    // 取得したタスクを消去
    const delTodo = await todoData.destroy({ force: true }).catch(error => {
      console.log(error)
      res.status(404).send({ error: error.message })
    })
    return res.status(200).send(delTodo)
  }
}

module.exports = todoController
