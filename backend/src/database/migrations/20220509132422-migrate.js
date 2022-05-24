'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // await queryInterface.addColumn('User', 'auto_generated_password', { type: Sequelize.STRING, defaultValue: '' });
    await queryInterface.addColumn('Application', 'agent_name', { 
      type: Sequelize.STRING, 
      defaultValue: '',
      validate: {
        notNull: { msg: 'Agent is required' },
      },
    });
    await queryInterface.addColumn('Application', 'company', { 
      type: Sequelize.STRING, 
      defaultValue: '',
      validate: {
        notNull: { msg: 'Company is required' },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
