'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
        allowNull: false,
        defaultValue: 'ACTIVE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('Profiles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
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
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('Images', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      profileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Profiles',
          key: 'id'
        }
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Profiles');
    await queryInterface.dropTable('Images');
  }
};
