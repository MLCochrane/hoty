const application = require('./dist');

module.exports = application;

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +process.env.PORT || 3000,
      host: process.env.HOST || 'localhost',
      openApiSpec: {
        // useful when used with OASGraph to locate your application
        setServersFromRequest: true,
      }
    },
    websocket: {
      port: 3002,
      cors: {
        origin: [
          'http://localhost:3001/*',
        ],
        credentials: true,
      }
    }
  };
  application.main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
