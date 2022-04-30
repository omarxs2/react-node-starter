/* eslint no-console: ["error", { allow: ["warn"] }] */
const { PORT, NODE_ENV } = require('./config/vars');
const sequelize = require('./database/db-build');
const app = require('./config/express');

sequelize.sync().then(() => {
  app.listen(PORT, () => console.warn(`Server started on port ${PORT} (${NODE_ENV})`));
});

/**
 * Exports express
 * @public
 */
module.exports = app;
