const { DataTypes } = require('sequelize');

const Price = sequelize.define(
  'Price',
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
      university: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'University is required',
          },
        },
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Language is required',
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
      price_before: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Price before is required',
          },
        },
      },
      price_after: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Price after is required',
          },
        },
      },
  },
  {
    tableName: 'Price',
    timestamps: false,
  },
);

module.exports = Price;
