// # CSP Nonce Helper
// Usage: `{{csp_nonce}}`
//
// Example: <script {{csp_nonce}}>..</script> -> <script nonce="znhn6hDo986wEpB7K9EfTg==">..</script>
//
// If no nonce has been set, will return an empty string.
//
const proxy = require('../../../../helpers/proxy'),
      SafeString = proxy.SafeString;

module.exports = function csp_nonce(options) { // eslint-disable-line camelcase
    const nonce = options.data.root._locals.csp_nonce;
    if (nonce) {
      // Return SafeString so we don't have to use {{{csp_nonce}}}.
      return new SafeString('nonce="' + nonce + '"');
    }
    return '';
};
