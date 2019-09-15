<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        ToDo List
      </h1>
      <h2 class="subtitle">
        タスクを追加してください
      </h2>
      <div>
        <input v-model="content" type="text" />
        <button @click="addTodo">
          追加
        </button>
      </div>
      <div class="todo-list" align="center">
        <div>
          <input v-model="taskState" type="radio" value="allState" />全て
          <input v-model="taskState" type="radio" value="working" />作業中
          <input v-model="taskState" type="radio" value="complete" />完了
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>コメント</th>
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in computedTodos" :key="todo.value">
              <td>{{ $store.state.todo.todos.indexOf(todo) + 1 }}</td>
              <td>{{ todo.taskContent }}</td>
              <td>
                <button
                  @click="changeState($store.state.todo.todos.indexOf(todo))"
                >
                  {{ todo.taskState }}
                </button>
              </td>
              <td>
                <button @click="delTodo($store.state.todo.todos.indexOf(todo))">
                  {{ todo.delBtn }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import querystring from 'querystring'
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      content: '',
      taskState: 'allState'
    }
  },
  computed: {
    computedTodos() {
      // ラジオボタンが'作業中'の時、作業中のタスクだけを残し表示
      if (this.taskState === 'working') {
        return this.$store.getters['todo/todos'].filter(function(todo) {
          return todo.taskState === '作業中'
        })
      }
      // ラジオボタンが'完了'の時、完了のタスクだけを残し表示
      if (this.taskState === 'complete') {
        return this.$store.getters['todo/todos'].filter(function(todo) {
          return todo.taskState === '完了'
        })
      }
      // ラジオボタンが'全て'の時、全てのタスクを表示
      return this.$store.getters['todo/todos']
    }
  },
  async asyncData({ app }) {
    const todos = await app.$axios.$get('/todo').catch(error => {
      console.log(error)
    })
    return {
      todos
    }
  },
  created() {
    this.todos.forEach(todo => {
      todo.delBtn = '削除'
      console.log(todo)
    })
    this.$store.dispatch('todo/setTodoAction', this.todos)
  },
  methods: {
    // タスクの追加
    async addTodo() {
      await this.$store.dispatch('todo/addTodoAction', this.content)
      this.content = ''
      console.log('addTodo', this.$store.state.todo.todos)
    },
    // stateボタンの状態切り替え
    changeState(index) {
      this.$store.dispatch('todo/fetchState', index)
    },
    // タスクの消去
    async delTodo(index) {
      await this.$store.dispatch('todo/fetchDelTodo', index)
      console.log('delTodo', this.$store.state.todo.todos)
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
