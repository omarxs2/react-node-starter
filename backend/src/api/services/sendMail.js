const sgMail = require('@sendgrid/mail');
const path = require('path');
const ehbs = require('express-handlebars');

const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);
const rootViewPath = path.join(__dirname, '..', 'views');

const viewEngine = ehbs.create({
  layoutDir: path.join(rootViewPath, 'layouts'),
  partialsDir: path.join(rootViewPath, 'partials'),
  defaultLayout: path.join(rootViewPath, 'layouts', 'main-layout'),
});
const renderMail = (viewName, context) => new Promise((res, rej) => {
  viewEngine.renderView(
    path.join(rootViewPath, 'templates', `${viewName}.handlebars`),
    context,
    (err, content = '') => {
      if (err) return rej(err);
      return res(content);
    },
  );
});

module.exports = async (to, subject, viewName, context) => {
  const result = await renderMail(viewName, context);
  const msg = {
    from: SENDGRID_EMAIL, // Use the email address or domain you verified above
    to,
    subject,
    html: result,
  };
  // ES6
  sgMail.send(msg).then(
    () => {
      console.log('EMAIL SENT');
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    },
  );
};
