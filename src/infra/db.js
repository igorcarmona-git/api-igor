const Sequelize = require('sequelize');
const env = (process.env.NODE_ENV || 'development').trim(); // Removendo espaços em branco
const config = require("../../config/config");

// Verificando se o ambiente está definido nas configurações
if (!(env in config)) {
  throw new Error(`Configuração para o ambiente '${env}' não encontrada.`);
}

// Obtendo as configurações corretas com base no ambiente
const configEnv = config[env];

// Criando a conexão com o banco de dados usando as configurações do ambiente
const db = new Sequelize(configEnv.database, configEnv.username, configEnv.password, {
  host: configEnv.host,
  dialect: configEnv.dialect,
  dialectOptions: configEnv.dialectOptions
});

module.exports = db;