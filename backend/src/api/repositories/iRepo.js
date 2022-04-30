module.exports = class IRepo {
  constructor(model) {
    this.model = model;
  }

  findOneByField(value, field) {
    return this.model.findOne({ where: { [field]: value } });
  }

  findOneByMultipleFields(where) {
    return this.model.findOne({ where });
  }

  findOneByFieldAttr(value, field, attributes) {
    return this.model.findOne({ where: { [field]: value }, attributes });
  }

  findCountByField(value, field) {
    return this.model.count({ where: { [field]: value } });
  }

  findCountByMultipleFields(where) {
    return this.model.count({ where });
  }

  findAll() {
    return this.model.findAll({});
  }

  findAllWithPagination(limit, offset, where) {
    return this.model.findAll({
      raw: true,
      limit,
      offset,
      where
    });
  }

  findAllByField(value, field) {
    return this.model.findAll({ raw: true, where: { [field]: value } });
  }

  findAllByMultipleFields(where) {
    return this.model.findAll({ raw: true, where });
  }

  findAllByFieldAttr(value, field, attributes) {
    return this.model.findAll({
      raw: true,
      where: { [field]: value },
      attributes: { exclude: attributes },
    });
  }

  updateOneByField(id, body) {
    return this.model.update({ ...body.dataValues }, { where: { id } });
  }

  updateColByField(id, col, val) {
    return this.model.update({ [col]: val }, { where: { id } });
  }

  // eslint-disable-next-line class-methods-use-this
  deleteObj(obj) {
    obj.destroy();
    return obj
      .set('isDeleted', true)
      .save()
      .finally(() => { });
  }
};
