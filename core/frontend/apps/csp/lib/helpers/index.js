const cspNonce = require('./csp_nonce');

module.exports = function registerHelpers(ghost) {
    ghost.helpers.register('csp_nonce', cspNonce);
};
