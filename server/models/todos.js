'use strict'
module.exports = (sequelize, DataTypes) => {
  const todos = sequelize.define(
    'todos',
    {
      taskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      taskContent: DataTypes.STRING,
      taskState: DataTypes.STRING
    },
    {
      underscored: true
    }
  )
  todos.associate = function(models) {
    // associations can be defined here
  }
  return todos
}
