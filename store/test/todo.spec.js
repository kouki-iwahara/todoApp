import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import clonedeep from 'lodash.clonedeep'
import axios from 'axios'
import * as todo from '@/store/todo'

const localVue = createLocalVue()
localVue.use(Vuex)

// 変数が巻き上げられる
// let mockAxiosGetResult
// jest.mock('axios', () => {
//   // let mockAxiosGetResult //ここに定義すると巻き上げは無いがスコープで他から参照できない
//   return mockAxiosGetResult
// })

// ここにモックを直接書くとエラーは出ない
let mockAxiosGetResult
jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
  $post: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
  $put: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
  $delete: jest.fn(() => Promise.resolve(mockAxiosGetResult))
}))

describe('store/todo.js', () => {
  let store
  let todo1, todo2
  beforeEach(() => {
    store = new Vuex.Store(clonedeep(todo))
    todo1 = {
      taskId: 1,
      taskContent: 'test1',
      taskState: '作業中',
      delBtn: '削除'
    }
    todo2 = {
      taskId: 2,
      taskContent: 'test2',
      taskState: '完了',
      delBtn: '削除'
    }
  })

  // gettersのテスト
  describe('getters', () => {
    let todos
    beforeEach(() => {
      todos = [todo1, todo2].slice()
      store.replaceState({
        todos
      })
    })
    // getters[todos]
    describe('todos', () => {
      test('連想配列を取得できるか', () => {
        // 特定の構造と値を持つ要素が配列に含まれていることをチェック
        expect(store.getters.todos).toContainEqual(todo1)
      })
      test('全てのtodoが取得できるか', () => {
        // 受け取った配列が期待される配列の要素全てを含む場合に一致
        expect(store.getters.todos).toEqual(expect.arrayContaining(todos))
      })
    })
  })

  // actionsのテスト
  describe('actions', () => {
    let todos
    beforeEach(() => {
      todos = [todo1].slice()
      store.$axios = axios
      store.replaceState({
        todos: [todo1]
      })
    })
    describe('fetchTodos', () => {
      test('todoが取得できるか', async done => {
        // axiosのresponceを定義 fetchTodos発火によりdelBtnが追加される
        mockAxiosGetResult = [
          {
            taskId: todo1.taskId,
            taskContent: todo1.taskContent,
            taskState: todo1.taskState
          }
        ].slice()
        await store.dispatch('fetchTodos')
        expect(store.getters.todos).toEqual(expect.arrayContaining(todos))
        done()
      })
    })
    describe('addTodo', () => {
      test('todoが追加されるか', async done => {
        // 配列で定義したら結果が[[...]]になった為、配列で定義しなかった
        mockAxiosGetResult = {
          taskId: todo1.taskId,
          taskContent: todo1.taskContent,
          taskState: todo1.taskState
        }
        await store.dispatch('addTodo')
        expect(store.getters.todos).toEqual(expect.arrayContaining(todos))
        done()
      })
    })
    describe('updateState', () => {
      test('stateが更新されるか', async done => {
        // store.getters.todos[0]が、'taskState', '作業中'であるかの確認
        expect(store.getters.todos[0]).toHaveProperty('taskState', '作業中')
        mockAxiosGetResult = '完了'
        await store.dispatch('updateState', 0)
        // update後のtaskStateをチェック
        expect(store.getters.todos[0]).toHaveProperty('taskState', '完了')
        done()
      })
    })
    describe('delTodo', () => {
      test('todoが削除されるか ', async done => {
        // todo1が格納されているか
        expect(store.getters.todos).toContainEqual(todo1)
        await store.dispatch('delTodo', 0)
        // todo1が削除されたか
        expect(store.getters.todos).not.toContainEqual(todo1)
        done()
      })
    })
  })
})
