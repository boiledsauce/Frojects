module.exports = (sequelize, DataTypes) => {

  return sequelize.define('UserProjectAccess', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    inviteDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
    
  })

}
