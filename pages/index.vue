<template>
  <div class="container">
    <div>
      <Logo />
      <todo-form />
      <radio-btn />
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import TodoForm from '~/components/TodoForm.vue'
import RadioBtn from '~/components/RadioBtn.vue'

export default {
  components: {
    Logo,
    TodoForm,
    RadioBtn
  },
  async asyncData({ store }) {
    // 全てのtodoを読み込んで表示する
    await store.dispatch('todo/fetchTodos')
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 50vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
