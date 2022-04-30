const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const httpStatus = require('http-status');
const routes = require('../api/routes');
const { logs } = require('./vars');
const errorHandler = require('../api/middlewares/errorHandler');

/**
 * Express instance
 * @public
 */
const app = express();

app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(express.json());
// request logging. dev: console | production: file
app.use(morgan(logs));

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api routes
app.use(routes);

// mount errors handlers
app.use(errorHandler);

//  handle 404 page
app.use((req, res) => res.status(httpStatus.NOT_FOUND).send('Not found'));

module.exports = app;
