require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASS_DEV,
    database: process.env.DB_DATABASE_DEV,
    host: process.env.DB_HOSTNAME_DEV,
    dialect: process.env.DB_DIALECT_DEV,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: true
  },
  test: {
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASS_TEST,
    database: process.env.DB_DATABASE_TEST,
    host: process.env.DB_HOSTNAME_TEST,
    dialect: process.env.DB_DIALECT_TEST,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  production: {
    username: process.env.DB_USER_PROD,
    password: process.env.DB_PASS_PROD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOSTNAME_PROD,
    dialect: process.env.DB_DIALECT_PROD,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
