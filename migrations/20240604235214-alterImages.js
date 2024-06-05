const { DataTypes } = require('sequelize');
const User = require('../src/models/userModel');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Verifica se a coluna já existe
      const table = await queryInterface.describeTable('Images');

      if (!table.userId) {
        // Adiciona a coluna userId se não existir
        await queryInterface.addColumn(
          'Images',
          'userId',
          {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          { transaction }
        );
      }

      // Adiciona a constraint de chave estrangeira
      await queryInterface.addConstraint(
        'Images',
        {
          fields: ['userId'],
          type: 'foreign key',
          name: 'fk_images_userId', // Nome da constraint
          references: {
            table: User, // Nome da tabela referenciada
            field: 'id', // Nome da coluna referenciada
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          transaction,
        }
      );
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Remove a constraint de chave estrangeira
      await queryInterface.removeConstraint('Images', 'fk_images_userId', { transaction });
      
      // Remove a coluna userId se necessário
      const table = await queryInterface.describeTable('Images');
      if (table.userId) {
        await queryInterface.removeColumn('Images', 'userId', { transaction });
      }
    });
  },
};
