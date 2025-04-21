const express = require('express');
const routes = express.Router();
const multer = require('../middleware/Multer');

const { allUser, updateUser, deleteUser, addBlogCategory, viewBlogCategory, updateBlogCategory, deleteBlogCategory, changeBlogCategoryStatus, viewBlog, addBlog, deleteBlog, updateBlog, commentedBlog, likedBlog, addBlogComment, editBlogComment, deleteBlogComment } = require('../controllers/AdminController');

// user control 
routes.get('/alluser', allUser);
routes.put('/updateuser', multer.single('userimage'), updateUser);
routes.delete('/deleteuser', deleteUser);
// blog category 
routes.post('/addblogcategory', multer.single('image'), addBlogCategory);
routes.get('/viewblogcategory', viewBlogCategory);
routes.put('/updateblogcategory', multer.single('image'), updateBlogCategory);
routes.delete('/deleteblogcategory', deleteBlogCategory);
routes.put('/changeblogcategorystatus', changeBlogCategoryStatus);
// blog 
routes.get('/viewblog', viewBlog);
routes.post('/addblog', multer.single('thumbnail'), addBlog);
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