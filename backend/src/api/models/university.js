const { DataTypes } = require('sequelize');

const University = sequelize.define(
  'University',
  {
    university_name_en: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'University name en is required',
        },
      },
    },
    university_name_ar: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'University name ar is required',
          },
        },
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Color is required',
          },
        },
      },
  },
  {
    tableName: 'University',
    timestamps: false,
  },
);

module.exports = University;
