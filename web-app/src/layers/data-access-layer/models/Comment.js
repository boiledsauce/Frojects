const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comment', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Text: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TaskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Task',
        key: 'Id'
      }
    },
    AuthorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'Id'
      }
    },
    CreationDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Comment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
      {
        name: "TaskId",
        using: "BTREE",
        fields: [
          { name: "TaskId" },
        ]
      },
      {
        name: "AuthorId",
        using: "BTREE",
        fields: [
          { name: "AuthorId" },
        ]
      },
    ]
  });
};
