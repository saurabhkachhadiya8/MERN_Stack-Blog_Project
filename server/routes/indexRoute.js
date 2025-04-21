const express = require('express');
const routes = express();
const { authorizeRole, verifyToken } = require('../middleware/Auth');

routes.use('/', require('./authRoute'));
routes.use('/admin', verifyToken, authorizeRole(['admin']), require('./adminRoute'));
routes.use('/user', verifyToken, authorizeRole(['admin', 'user']), require('./userRoute'));
routes.use('/like', verifyToken, require('./likeRoute'));

routes.use('/home', require('./homePageRoute'));
routes.use('/category_wise_blog', require('./categoryWiseBlogRoute'));
routes.use('/author_wise_blog', require('./authorWiseBlogRoute'));

module.exports = routes;