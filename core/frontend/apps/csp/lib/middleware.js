// # Content Security Policy Middleware
const config = require('../../../../server/config'),
      crypto = require('crypto');

const noncePlaceholder = 'nonce-?',
      nonceEncoding = 'base64',
      nonceLength = 12;

function contentSecurityPolicy(req, res, next) {
    var policy = config.get('csp:policy');
    if (policy) {
      if (policy.includes(noncePlaceholder)) {
        // Generate a random nonce and replace *all* instances of the placeholder with it.
        const nonce = crypto.randomBytes(nonceLength).toString(nonceEncoding);
        while (policy.includes(noncePlaceholder)) {
          policy = policy.replace(noncePlaceholder, 'nonce-' + nonce);
        }
        // Attach the nonce to the response object so it is available for the {{csp_nonce}} helper.
        res.locals.csp_nonce = nonce;
      }
      res.set({'Content-Security-Policy': policy});
    }
    next();
}

module.exports = contentSecurityPolicy;
