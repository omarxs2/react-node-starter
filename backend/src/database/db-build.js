/* eslint no-console: ["error", { allow: ["warn"] }] */
const Sequelize = require('sequelize');
const path = require('path');
require('dotenv-safe').config({ path: path.resolve(__dirname, '../../.env') });

const {
  DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST,
} = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: 5432,
  dialect: 'postgres',
  logging: false,
});
sequelize
  .authenticate()
  .then(() => console.warn('Database connected...'))
  .catch((err) => console.warn('Error:', err));
module.exports = sequelize;
global.sequelize = sequelize;
