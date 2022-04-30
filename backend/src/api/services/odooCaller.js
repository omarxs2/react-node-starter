/* eslint-disable no-unused-expressions */
const xmlrpc = require('xmlrpc');
const {
  ODOO_URL,
  ODOO_DB,
  ODOO_USERNAME,
  ODOO_PASS,
} = require('../../config/vars');

module.exports = async (method, model, res, inParams) => {
  const client = xmlrpc.createSecureClient({
    host: ODOO_URL,
    path: '/xmlrpc/2/object',
  });

  let fparams = [ODOO_DB, parseInt(ODOO_USERNAME, 10), ODOO_PASS, model, method];
  fparams = fparams.concat(inParams);
  return new Promise((resolve, reject) => {
    client.methodCall('execute_kw', fparams, (error, value) => {
      if (error) {
        res && res.json(error);
        reject(error);
      }
      res && res.json(value);
      resolve(value);
    });
  });
};
