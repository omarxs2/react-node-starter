const { DataTypes } = require('sequelize');

const Price = sequelize.define(
  'Price',
  {
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Department id is required',
          },
        },
      },
      university_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'University id is required',
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
      degree: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Degree is required',
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
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Currency is required',
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
