'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'todos',
      [
        {
          task_content: 'jsの勉強をする',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          task_content: 'パスタを作る',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          task_content: '映画に行く',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('todos', null, {})
  }
}
