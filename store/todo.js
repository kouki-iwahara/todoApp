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
  changeState(state, { index, taskState }) {
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
  changeStateAction({ commit }, { index, taskState }) {
    commit('changeState', { index, taskState })
  },
  delTodoAction({ commit }, index) {
    commit('delTodo', index)
  }
}
