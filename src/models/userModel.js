const { DataTypes } = require('sequelize');
const db = require('../infra/db')
const User = db.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status:{
        type: DataTypes.ENUM,
        values: ["ACTIVE", "INACTIVE"],
        defaultValue: 'ACTIVE', 
    },
})

module.exports = User