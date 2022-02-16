const { DataTypes } = require("sequelize")
const _Comment = require("./Comment")
const _Deadline = require("./Deadline")
const _Project = require("./Project")
const _Task = require("./Task")
const _User = require("./User")
const _UserProjectAccess = require("./UserProjectAccess")

initModels = (sequelize) => {
  const Comment = _Comment(sequelize, DataTypes)
  const Deadline = _Deadline(sequelize, DataTypes)
  const Project = _Project(sequelize, DataTypes)
  const Task = _Task(sequelize, DataTypes)
  const User = _User(sequelize, DataTypes)
  const UserProjectAccess = _UserProjectAccess(sequelize, DataTypes)

  Task.belongsTo(Project, { foreignKey: "projectId"})
  Project.hasMany(Task, { foreignKey: "projectId"})
  UserProjectAccess.belongsTo(Project, { foreignKey: "projectId"})
  Project.hasMany(UserProjectAccess, { foreignKey: "projectId"})
  Comment.belongsTo(Task, { foreignKey: "taskId"})
  Task.hasMany(Comment, { foreignKey: "taskId"})
  Deadline.belongsTo(Task, { foreignKey: "taskId"})
  Task.hasMany(Deadline, { foreignKey: "taskId"})
  Comment.belongsTo(User, { foreignKey: "authorId"})
  User.hasMany(Comment, { foreignKey: "authorId"})
  Project.belongsTo(User, { foreignKey: "ownerId"})
  User.hasMany(Project, { foreignKey: "ownerId"})
  UserProjectAccess.belongsTo(User, { foreignKey: "userId"})
  User.hasMany(UserProjectAccess, { foreignKey: "userId"})

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
