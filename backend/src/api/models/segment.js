const { DataTypes } = require('sequelize');

const Segment = sequelize.define(
  'Segment',
  {
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Name is required' },
      },
    },
    ordersList: {
      type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
    },
    driverName: {
      type: DataTypes.STRING,
    },
    driverId: {
      type: DataTypes.INTEGER,
    },
    link: {
      type: DataTypes.STRING(2048),
    },
    deliveryDate: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'Segment',
  },
);
module.exports = Segment;
