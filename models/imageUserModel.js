const { Sequelize } = require('sequelize');
const db = require('../src/infra/db');

const Image = db.define('Images', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'Users',
            key: 'id'
        }
    },
    profileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'Profiles',
            key: 'id'
        }
    },
    filename:{
        type: Sequelize.STRING,
        allowNull: false
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Image