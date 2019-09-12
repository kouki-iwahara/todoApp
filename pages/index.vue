<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        ToDo List
      </h1>
      <h2 class="subtitle">
        タスクを追加してください
      </h2>
      <div>
        <input v-model="content" type="text">
        <button>
          追加
        </button>
      </div>
      <div class="todo-list" align="center">
        <div>
          <input v-model="radioBtnState" type="radio" value="allState">全て
          <input v-model="radioBtnState" type="radio" value="working">作業中
          <input v-model="radioBtnState" type="radio" value="complete">完了
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
              <td>{{ computedTodos.indexOf(todo) + 1 }}</td>
              <td>{{ todo.taskContent }}</td>
              <td>
                <button>
                  {{ todo.taskState }}
                </button>
              </td>
              <td>
                <button>
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
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  computed: {
    computedTodos () {
      return this.todos
    }
  },
  async asyncData ({ app }) {
    const todos = await app.$axios.$get('/todo/json')
      .catch((error) => {
        console.log(error)
      })
    return {
      todos,
      content: '',
      radioBtnState: 'allState'
    }
  },
  created () {
    this.todos.forEach((todo) => {
      todo.delBtn = '削除'
      console.log(todo)
    })
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
