const { DataTypes } = require('sequelize');
const db = require('../../src/infra/db')

module.exports = db.define('person', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefone:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  nascimento:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  cpf:{
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  status:{
    type: DataTypes.ENUM,
    values: ["ACTIVE", "INACTIVE"],
    defaultValue: 'ACTIVE', 
  }
});