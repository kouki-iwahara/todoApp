export const state = () => ({
  todos: []
})

export const mutations = {
  setTodos(state, todos) {
    state.todos = todos
  }
}

export const getters = {
  todos(state) {
    return state.todos
  }
}

export const actions = {
  setTodoAction({ commit, state }, todos) {
    commit('setTodos', todos)
    console.log(state.todos)
  }
}
