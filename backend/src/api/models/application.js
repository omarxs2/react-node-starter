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
    address: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Address is required' },
      },
    },
    nationality: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Nationality is required' },
      },
    },
    passport_number: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Passport is required' },
      },
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Department is required',
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
    degree: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Degree is required',
        },
      },
    },
    university: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'University is required',
        },
      },
    },
    agent_id: {
      type: DataTypes.INTEGER,
      defaultValue: -1
    },
    agent_name: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Agent is required' },
      },
    },
    company: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Company is required' },
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: ''
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
    passport: {
      type: DataTypes.STRING(2048),
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Passport is required' },
      },
    },
    personal_image: {
      type: DataTypes.STRING(2048),
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Personal image is required' },
      },
    },
    other_files: {
      type: DataTypes.STRING(2048),
      defaultValue: '',
    },
    payment_receipt: {
      type: DataTypes.STRING(2048),
      defaultValue: '',
    },
    conditional_acceptance: {
      type: DataTypes.STRING(2048),
      defaultValue: '',
    },
    final_acceptance: {
      type: DataTypes.STRING(2048),
      defaultValue: '',
    },
    notes: {
      type: DataTypes.STRING(),
      defaultValue: '',
    },
    reference_code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Reference code is required',
        },
      },
    },
  },
  {
    tableName: 'Application',
    timestamps: false,
  },
);

module.exports = Application;
