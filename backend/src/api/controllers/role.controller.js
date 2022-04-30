const IRepo = require('../repositories/iRepo');
const Role = require('../models/role');

exports.get = async (req, res, next) => {
  try {
    const userRepo = new IRepo(Role);

    const roles = await userRepo.findAll();

    return res.json(roles);
  } catch (e) {
    next(e);
  }
  return true;
};
