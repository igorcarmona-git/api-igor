const {Sequelize} = require('sequelize');
const db = require('../src/infra/db');

const User = db.define('Users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: Sequelize.ENUM,
        values: ['ACTIVE', 'INACTIVE'],
        allowNull: false,
        defaultValue: 'ACTIVE'
    }
}, {timestamps: true});

module.exports = User