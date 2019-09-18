const models = require('../models')

const todoController = {
  // 全てのタスクの取得 path: todo/ method: get
  async getAllTodos(req, res) {
    const allTodos = await models.todos.findAll().catch(error => {
      console.log(error)
      res.status(404).send({ error: error.message })
    })
    res.status(200).send(allTodos)
  },
  //  タスクの追加 path: /todo method: post
  async addTodo(req, res) {
    // 作られたタスクを受け取る
    const createdTodo = await models.todos
      .create({
        taskContent: req.body.taskContent
      })
      .catch(error => {
        console.log(error)
        res.status(404).send({ error: error.message })
      })
    // この時点ではtaskStateが格納されていない
    console.log(createdTodo)
    // 追加されたtodoを取得
    const addedTodo = await models.todos
      .findOne({ where: { taskId: createdTodo.taskId } })
      .catch(error => {
        console.log(error)
        return res.status(404).send({ error: error.message })
      })
    console.log(addedTodo)
    return res.status(200).send(addedTodo)
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
          return res.status(404).send({ error: error.message })
        })
      return res.status(200).send(updateTodo.taskState)
    }
    // taskStateが完了なら作業中にupdate
    if (todoData.taskState === '完了') {
      const updateTodo = await todoData
        .update({ taskState: '作業中' })
        .catch(error => {
          console.log(error)
          return res.status(404).send({ error: error.message })
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
