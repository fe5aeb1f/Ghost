const config = require('../../../server/config'),
      middleware = require('./lib/middleware'),
      registerHelpers = require('./lib/helpers');

module.exports = {
    activate: function activate(ghost) {
        registerHelpers(ghost);
    },
    setupMiddleware: function setupMiddleware(siteApp) {
        // Only install the middleware if 'csp' exists in the config.
        if (config.get('csp')) {
          siteApp.use(middleware);
        }
    }
};
