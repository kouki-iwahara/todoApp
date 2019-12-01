<template>
  <div>
    <div>
      <input v-model="taskState" type="radio" value="allState" />全て
      <input v-model="taskState" type="radio" value="working" />作業中
      <input v-model="taskState" type="radio" value="complete" />完了
    </div>
    <todo-list :task-state="taskState" />
  </div>
</template>

<script>
import TodoList from '~/components/TodoList.vue'

export default {
  components: {
    TodoList
  },
  data() {
    return {
      taskState: 'allState'
    }
  }
}
</script>
