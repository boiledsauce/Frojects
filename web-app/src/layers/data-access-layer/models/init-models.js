const { DataTypes } = require("sequelize")
const _Comment = require("./Comment");
const _Deadline = require("./Deadline");
const _Project = require("./Project");
const _Task = require("./Task");
const _User = require("./User");
const _UserProjectAccess = require("./UserProjectAccess");

function initModels(sequelize) {
  const Comment = _Comment(sequelize, DataTypes);
  const Deadline = _Deadline(sequelize, DataTypes);
  const Project = _Project(sequelize, DataTypes);
  const Task = _Task(sequelize, DataTypes);
  const User = _User(sequelize, DataTypes);
  const UserProjectAccess = _UserProjectAccess(sequelize, DataTypes);

  Task.belongsTo(Project, { as: "Project", foreignKey: "ProjectId"});
  Project.hasMany(Task, { as: "Tasks", foreignKey: "ProjectId"});
  UserProjectAccess.belongsTo(Project, { as: "Project", foreignKey: "ProjectId"});
  Project.hasMany(UserProjectAccess, { as: "UserProjectAccesses", foreignKey: "ProjectId"});
  Comment.belongsTo(Task, { as: "Task", foreignKey: "TaskId"});
  Task.hasMany(Comment, { as: "Comments", foreignKey: "TaskId"});
  Deadline.belongsTo(Task, { as: "Task", foreignKey: "TaskId"});
  Task.hasMany(Deadline, { as: "Deadlines", foreignKey: "TaskId"});
  Comment.belongsTo(User, { as: "Author", foreignKey: "AuthorId"});
  User.hasMany(Comment, { as: "Comments", foreignKey: "AuthorId"});
  Project.belongsTo(User, { as: "Owner", foreignKey: "OwnerId"});
  User.hasMany(Project, { as: "Projects", foreignKey: "OwnerId"});
  UserProjectAccess.belongsTo(User, { as: "User", foreignKey: "UserId"});
  User.hasMany(UserProjectAccess, { as: "UserProjectAccesses", foreignKey: "UserId"});

  return {
    Comment,
    Deadline,
    Project,
    Task,
    User,
    UserProjectAccess,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
