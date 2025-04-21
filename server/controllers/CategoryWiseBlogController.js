const blogModel = require('../models/BlogModel');

const fetchData = async (req, res) => {
  try {
    let categoryId = req.query?.id;
    let categoryWiseBlogs = await blogModel.find({ category: categoryId }).populate('author category views likes dislikes comments.user');
    return res.status(200).send({
      success: true,
      message: 'Data Fetched',
      categoryWiseBlogs
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