module.exports = (sequelize, DataTypes) => {

  return sequelize.define('Deadline', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false
    }
  })

}
