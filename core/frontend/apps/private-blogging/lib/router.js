const path = require('path');
const express = require('express');
const middleware = require('./middleware');
const bodyParser = require('body-parser');
const routing = require('../../../services/routing');
const web = require('../../../../server/web');
const templateName = 'private';
const privateRouter = express.Router();

function _renderer(req, res) {
    res.routerOptions = {
        type: 'custom',
        templates: templateName,
        defaultTemplate: path.resolve(__dirname, 'views', `${templateName}.hbs`)
    };

    // Renderer begin
    // Format data
    let data = {};

    if (res.error) {
        data.error = res.error;
    }

    // Render Call
    return routing.helpers.renderer(req, res, data);
}

// password-protected frontend route
privateRouter
    .route('/')
    .get(
        middleware.isPrivateSessionAuth,
        _renderer
    )
    .post(
        bodyParser.urlencoded({extended: true}),
        middleware.isPrivateSessionAuth,
        web.shared.middlewares.brute.privateBlog,
        middleware.authenticateProtection,
        _renderer
    );

module.exports = privateRouter;
module.exports.renderer = _renderer;
