const express = require('express');
const routes = express.Router();
const { fetchData } = require('../controllers/CategoryWiseBlogController');

routes.get('/fetchdata', fetchData);

module.exports = routes;