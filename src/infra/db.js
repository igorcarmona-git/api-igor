const { Sequelize } = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './src/infra/database.sqlite'
});

module.exports = db;

