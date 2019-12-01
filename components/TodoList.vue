<template>
  <div class="todo-list" align="center">
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
            <button @click="updateState($store.state.todo.todos.indexOf(todo))">
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
</template>

<script>
export default {
  props: {
    taskState: {
      type: String,
      required: true
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
  methods: {
    // stateボタンの状態切り替え
    updateState(index) {
      this.$store.dispatch('todo/updateState', index)
    },
    // タスクの消去
    async delTodo(index) {
      await this.$store.dispatch('todo/delTodo', index)
      console.log('delTodo', this.$store.state.todo.todos)
    }
  }
}
</script>
