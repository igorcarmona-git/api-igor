const { DataTypes } = require('sequelize');
const db = require('../infra/db');
const User = require('./userModel');

const Profile = db.define('Profiles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Profile;