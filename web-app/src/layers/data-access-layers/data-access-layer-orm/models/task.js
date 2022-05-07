module.exports = (sequelize, DataTypes) => {

  return sequelize.define('Task', {
      id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
      },
      title: {
          type: DataTypes.STRING(255),
          allowNull: false
      },
      description: {
          type: DataTypes.STRING(255),
          allowNull: false
      },
      isCompleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false     
      }
  })

}
