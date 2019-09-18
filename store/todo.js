import querystring from 'querystring'

export const state = () => ({
  todos: []
})

export const mutations = {
  setTodos(state, todos) {
    state.todos = todos.slice()
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
  // 全てのtodoを読み込んで表示する
  async fetchTodos({ commit }) {
    let todos = []
    // todoの読み込み
    const fetchedTodos = await this.$axios.$get('/todo').catch(error => {
      console.log(error)
    })
    // 読み込んだ値があれば削除ボタンを作りtodosに格納。
    if (fetchedTodos) {
      fetchedTodos.forEach(todo => {
        todo.delBtn = '削除'
      })
      console.log(fetchedTodos)
      todos = fetchedTodos.slice()
    }
    // 読み込んだtodos、もしくは空の値がstateにセットされる
    commit('setTodos', todos)
  },
  async addTodo({ commit }, taskContent) {
    const req = {
      taskContent
    }
    // 入力された値をrequestし、stateに値を追加
    const addedTodo = await this.$axios
      .$post('/todo', querystring.stringify(req))
      .catch(error => {
        console.log(error.message)
      })
    addedTodo.delBtn = '削除'
    commit('addTodo', addedTodo)
  },
  // 状態ボタンの切り替え
  async updateState({ commit, state }, index) {
    // クリックされたtaskIdのstateの値が更新されレスポンスで返り格納される('作業中'or'完了')
    const taskState = await this.$axios
      .$put(`/todo/update/${state.todos[index].taskId}`)
      .catch(error => {
        console.log(error.message)
      })
    commit('updateState', { index, taskState })
  },
  // タスクデータをDBと画面から削除する
  async delTodo({ commit, state }, index) {
    const deletedTodo = await this.$axios
      .$delete(`/todo/del/${state.todos[index].taskId}`)
      .catch(error => {
        console.log(error.message)
      })
    console.log('deleted', deletedTodo)
    commit('delTodo', index)
  }
}
