const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Name is required' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      unique: { msg: 'Email already exists' },
      validate: {
        notEmpty: { msg: 'Email is required' },
        isEmail: { msg: 'Email is not valid' },
      },
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Phone is required' },
      },
    },
    country: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Country is required' },
      },
    },
    company: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Company is required' },
      },
    },
    logo: {
      type: DataTypes.STRING(2048),
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Logo is required' },
      },
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Password is required' },
        len: {
          args: [4],
          msg: 'Password should be more then 4 chars',
        },
      },
    },
    auto_generated_password: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Role is required' },
      },
    },
    isActive: {
      defaultValue: true,
      type: DataTypes.BOOLEAN,
    },
    registeredAt: {
      type: DataTypes.DATE,
      default: new Date(),
    },
  },
  {
    tableName: 'User',
    timestamps: false,
  },
);

/** Models Hooks */
User.beforeSave(async (user) => {
  try {
    if (user.email) {
      user.email = user.email.toLowerCase();
    }

    if (user.password) {
      user.registeredAt = new Date();
      user.password = await bcrypt.hash(user.password, 10);
    }
    return user;
  } catch (error) {
    return sequelize.Promise.reject(error);
  }
});

User.prototype.toJSON = function () {
  const values = { ...this.get() };

  delete values.password;
  delete values.token;
  return values;
};

module.exports = User;
