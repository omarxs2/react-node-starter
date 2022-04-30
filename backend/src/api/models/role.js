const { DataTypes } = require('sequelize');

const Role = sequelize.define(
  'Role',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name is required',
        },
      },
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'permissions list is required',
        },
      },
    },
  },
  {
    tableName: 'Role',
    timestamps: false,
  },
);

module.exports = Role;
