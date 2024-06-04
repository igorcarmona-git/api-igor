const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './src/infra/data/database.sqlite',
});

module.exports = db;