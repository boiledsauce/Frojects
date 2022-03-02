const { DataTypes } = require("sequelize")
const _Comment = require("./comment")
const _Deadline = require("./deadline")
const _Project = require("./project")
const _Task = require("./task")
const _User = require("./user")

initModels = (sequelize) => {
  const Comment = _Comment(sequelize, DataTypes)
  const Deadline = _Deadline(sequelize, DataTypes)
  const Project = _Project(sequelize, DataTypes)
  const Task = _Task(sequelize, DataTypes)
  const User = _User(sequelize, DataTypes)
  const UserProjectAccess = sequelize.define('UserProjectAccess', {}, {})

  Task.belongsTo(Project, { foreignKey: "projectId"})
  Project.hasMany(Task, { foreignKey: "projectId"})
  Comment.belongsTo(Task, { foreignKey: "taskId"})
  Task.hasMany(Comment, { foreignKey: "taskId"})
  Deadline.belongsTo(Task, { foreignKey: "taskId"})
  Task.hasOne(Deadline, { foreignKey: "taskId"})

  Comment.belongsTo(User, { foreignKey: "authorId"})
  User.hasMany(Comment, { foreignKey: "authorId"})
  Project.belongsTo(User, { foreignKey: "ownerId"})
  Project.belongsToMany(User, { through: UserProjectAccess, foreignKey: 'projectId' })
  User.belongsToMany(Project, { through: UserProjectAccess, foreignKey: 'userId' })

  sequelize.sync()

  return {
    Comment,
    Deadline,
    Project,
    Task,
    User,
    UserProjectAccess
  }

}

module.exports = { initModels }
