import querystring from 'querystring'

export const state = () => ({
  todos: []
})

export const mutations = {
  setTodos(state, todos) {
    state.todos = todos
  },
  addTodo(state, todo) {
    state.todos.push(todo)
  },
  updateState(state, { index, taskState }) {
    state.todos[index].taskState = taskState
  },
  delTodo(state, index) {
    state.todos.splice(index, 1)
  }
}

export const getters = {
  todos(state) {
    return state.todos
  }
}

export const actions = {
  setTodoAction({ commit }, todos) {
    commit('setTodos', todos)
  },
  async addTodoAction({ commit }, taskContent) {
    const req = {
      taskContent
    }
    // 入力された値をrequestし、stateに値を追加
    const todo = await this.$axios.$post('/todo', querystring.stringify(req))
    todo.delBtn = '削除'
    commit('addTodo', todo)
  },
  // 状態ボタンの切り替え
  async fetchState({ commit, state }, index) {
    // クリックされたタスクのデータからrequestするparamsを生成
    const todo = state.todos[index]
    const taskData = {
      taskId: todo.taskId,
      taskState: todo.taskState
    }
    // 更新されたstateの値がレスポンスで返り格納される('作業中'or'完了')
    const taskState = await this.$axios.$get('/todo/update', {
      params: taskData
    })
    commit('updateState', { index, taskState })
  },
  delTodoAction({ commit }, index) {
    commit('delTodo', index)
  }
}
