export const state = () => ({
  todos: []
})

export const mutations = {
  setTodos(state, todos) {
    state.todos = todos
  },
  addTodo(state, todo) {
    state.todos.push(todo)
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
  }
}
