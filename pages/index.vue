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
        <input type="text">
        <button>
          追加
        </button>
      </div>
      <div class="todo-list" align="center">
        <div>
          <input type="radio" value="allState">全て
          <input type="radio" value="working">作業中
          <input type="radio" value="complete">完了
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
            <tr>
              <td />
              <td />
              <td>
                <button />
              </td>
              <td>
                <button />
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
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
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
