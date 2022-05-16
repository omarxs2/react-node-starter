const { DataTypes } = require('sequelize');
const { v4 } = require('uuid');

const File = sequelize.define('File', {
  id: {
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'name is required',
      },
    },
  },
  sizeKB: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'sizeKB is required',
      },
    },
  },
  uploadDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'uploadDate is required',
      },
    },
  },
  contentType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'contentType is required',
      },
    },
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'path is required',
      },
    },
  },
}, {
  tableName: 'File',
  timestamps: false,
});

File.beforeCreate((file) => {
  file.id = v4();
  return true;
});

module.exports = File;
