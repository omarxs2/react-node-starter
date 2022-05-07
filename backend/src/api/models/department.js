const { DataTypes } = require('sequelize');

const Department = sequelize.define(
  'Department',
  {
    department_name_en: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Department name en is required',
        },
      },
    },
    department_name_ar: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Department name ar is required',
          },
        },
      },
      years: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Years is required',
          },
        },
      },
  },
  {
    tableName: 'Department',
    timestamps: false,
  },
);

module.exports = Department;
