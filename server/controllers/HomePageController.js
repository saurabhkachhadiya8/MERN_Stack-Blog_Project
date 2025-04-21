const blogModel = require('../models/BlogModel');
const blogCategoryModel = require('../models/BlogCategoryModel');

const fetchData = async (req, res) => {
  try {
    let blogCategory = await blogCategoryModel.find({}).populate('createdBy');
    let allBlogs = await blogModel.find({}).populate('author category views likes comments.user');
    let blogs = await blogModel.find({}).populate('author category views likes comments.user').skip(allBlogs.length - 20);
    return res.status(200).send({
      success: true,
      message: 'Data Fetched',
      blogCategory,
      blogs,
      allBlogs
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
module.exports = {
  fetchData
}