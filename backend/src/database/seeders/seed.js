const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Role',
      [
        {
          name: 'Admin',
          permissions: [
            'ALL_ORDERS_PAGE',
            'SEGMENTED_ORDERS_PAGE',
            'MY_ORDERS_PAGE',
            'WAREHOUSE_PAGE',
            'AGENT_PAGE',
          ],
        },
        {
          name: 'Delivery Manager',
          permissions: [
            'ALL_ORDERS_PAGE',
            'SEGMENTED_ORDERS_PAGE',
            'MY_ORDERS_PAGE',
            'WAREHOUSE_PAGE',
          ],
        },
        {
          name: 'Warehouse Manager',
          permissions: ['WAREHOUSE_PAGE'],
        },
        {
          name: 'Agent',
          permissions: ['AGENT_PAGE'],
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'User',
      [
        {
          isActive: true,
          name: 'Anas Badawi',
          email: 'anas@tektik.org',
          password: await bcrypt.hashSync('Anas1234', 10),
          roleId: 1,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Role');
    await queryInterface.bulkDelete('User');
  },
};
