const { DataTypes } = require("sequelize")
const _Comment = require("./Comment")
const _Deadline = require("./Deadline")
const _Project = require("./Project")
const _Task = require("./Task")
const _User = require("./User")

initModels = (sequelize) => {
  const Comment = _Comment(sequelize, DataTypes)
  const Deadline = _Deadline(sequelize, DataTypes)
  const Project = _Project(sequelize, DataTypes)
  const Task = _Task(sequelize, DataTypes)
  const User = _User(sequelize, DataTypes)

  Task.belongsTo(Project, { foreignKey: "projectId"})
  Project.hasMany(Task, { foreignKey: "projectId"})
  Comment.belongsTo(Task, { foreignKey: "taskId"})
  Task.hasMany(Comment, { foreignKey: "taskId"})
  Deadline.belongsTo(Task, { foreignKey: "taskId"})
  Task.hasOne(Deadline, { foreignKey: "taskId"})

  Comment.belongsTo(User, { foreignKey: "authorId"})
  User.hasMany(Comment, { foreignKey: "authorId"})
  Project.belongsTo(User, { foreignKey: "ownerId"})
  Project.belongsToMany(User, { through: 'UserProjectAccess' })
  User.belongsToMany(Project, { through: 'UserProjectAccess' })

  sequelize.sync()

  return {
    Comment,
    Deadline,
    Project,
    Task,
    User,
    //UserProjectAccess
  }

}

module.exports = { initModels }
