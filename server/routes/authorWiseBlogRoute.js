const express = require('express');
const routes = express.Router();
const { fetchData } = require('../controllers/AuthorWiseBlogController');

routes.get('/fetchdata', fetchData);

module.exports = routes;