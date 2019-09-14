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
  addTodoAction({ commit }, todo) {
    commit('addTodo', todo)
  },
  changeStateAction({ commit }, { index, taskState }) {
    commit('changeState', { index, taskState })
  },
  delTodoAction({ commit }, index) {
    commit('delTodo', index)
  }
}
