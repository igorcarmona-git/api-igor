const { DataTypes } = require('sequelize');
const db = require('../infra/db')
const User = db.define('user', {
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM,
        values: ["ACTIVE", "INACTIVE"],
        defaultValue: 'ACTIVE', 
      },
})

User.associations = (models) => {
    User.hasOne(models.person, { foreignKey: 'userId', sourceKey: 'cpf' })
}

module.exports = User