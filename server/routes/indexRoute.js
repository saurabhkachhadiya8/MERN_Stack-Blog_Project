const express = require('express');
const routes = express();

routes.use('/',require('./authRoute'));

module.exports = routes;