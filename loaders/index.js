const expressLoader = require('./express');
const routeLoader = require('../routes');

module.exports = async (app) => {
  // Load express middlewares
  await expressLoader(app);

  // Load route handlers
  await routeLoader(app);

  // Return message when non-existent resource requested
  app.get('*', (req, res) => {
    res.send('404: Resource does not exist');
  });

  // Error handler
  app.use((err, req, res, next) => {
    const message = err.message;
    const status = err.status || 500;

    return res.status(status).send({ message });
  });
};
