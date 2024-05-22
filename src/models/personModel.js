const { DataTypes } = require('sequelize');
const db = require('../infra/db')

const person = db.define('person', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  telefone:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  nascimento:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type:  DataTypes.NUMBER,
    allowNull: false,
    unique: true
  }
});

person.associations = (models) => {
  person.hasOne(models.user, { foreignKey: 'cpf', sourceKey: 'userId' })
}

