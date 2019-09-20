<template>
  <div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ''
    }
  },
  methods: {
    // タスクの追加
    async addTodo() {
      await this.$store.dispatch('todo/addTodo', this.content)
      this.content = ''
      console.log('addTodo', this.$store.state.todo.todos)
    }
  }
}
</script>

<style scoped>
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
