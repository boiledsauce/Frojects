module.exports = (sequelize, DataTypes) => {

  return sequelize.define('User', {
      id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
      },
      firstName: {
          type: DataTypes.STRING(50),
          allowNull: false
      },
      lastName: {
          type: DataTypes.STRING(50),
          allowNull: false
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: "Email"
      },
      openId: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      hashedPassword: {
        type: DataTypes.CHAR(60),
        allowNull: true
      }

  })

}
