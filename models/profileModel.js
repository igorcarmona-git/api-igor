const {Sequelize} = require('sequelize');
const db = require('../src/infra/db');

const Profile = db.define('Profiles', {
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
    bio: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    birthdate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Profile;