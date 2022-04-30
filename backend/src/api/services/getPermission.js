const Role = require('../models/role');
const IRepo = require('../repositories/iRepo');

module.exports = {
  hasPermission: async (roleId, permission) => {
    const roleRepo = new IRepo(Role);

    const role = await roleRepo.findOneByField(roleId, 'id');
    return role.permissions.includes(permission);
  },
};
