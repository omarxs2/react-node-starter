const { DataTypes } = require('sequelize');

const Application = sequelize.define(
  'Application',
  {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Full Name is required',
        },
      },
    },
    father: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Father is required',
          },
        },
      },
      mother: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Mother is required',
          },
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
      school_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'School Name is required',
          },
        },
      },
      gpa: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'GPA is required',
          },
        },
      },
      graduation_year: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Graduation year is required',
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          notEmpty: { msg: 'City is required' },
        },
      },
      country: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          notEmpty: { msg: 'Country is required' },
        },
      },
      nationality: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          notEmpty: { msg: 'Nationality is required' },
        },
      },
      passport: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          notEmpty: { msg: 'Passport is required' },
        },
      },
      department: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Years is required',
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
      university: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'University is required',
          },
        },
      },
      diploma: {
        type: DataTypes.STRING(2048),
        defaultValue: '',
        validate: {
          notEmpty: { msg: 'Diploma is required' },
        },
      },
      transcript: {
        type: DataTypes.STRING(2048),
        defaultValue: '',
        validate: {
          notEmpty: { msg: 'Transcript is required' },
        },
      },
      personal_image: {
        type: DataTypes.STRING(2048),
        defaultValue: '',
        validate: {
          notEmpty: { msg: 'Personal image is required' },
        },
      },
      other_image: {
        type: DataTypes.STRING(2048),
        defaultValue: '',
      },
  },
  {
    tableName: 'Application',
    timestamps: false,
  },
);

module.exports = Application;
