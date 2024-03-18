const { Sequelize } = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './src/infra/database2.sqlite'
});

module.exports = db;

