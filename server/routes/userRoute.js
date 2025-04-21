const express = require('express');
const routes = express.Router();
const multer = require('../middleware/Multer');
const { updateProfile, viewBlogCategory, addBlog, viewBlog, deleteBlog, updateBlog, addBlogComment, editBlogComment, deleteBlogComment, commentedBlog, likedBlog } = require('../controllers/UserController');

// profile 
routes.put('/updateprofile', updateProfile);
// blog category 
routes.get('/viewblogcategory', viewBlogCategory);
// blog 
routes.post('/addblog', multer.single('thumbnail'), addBlog);
routes.get('/viewblog', viewBlog);
routes.delete('/deleteblog', deleteBlog);
routes.put('/updateblog', multer.single('thumbnail'), updateBlog);
// comment 
routes.put('/addblogcomment', addBlogComment);
routes.put('/editblogcomment', editBlogComment);
routes.delete('/deleteblogcomment', deleteBlogComment);
// commented blog 
routes.get('/commented_blog', commentedBlog);
// liked blog 
routes.get('/liked_blog', likedBlog);

module.exports = routes;