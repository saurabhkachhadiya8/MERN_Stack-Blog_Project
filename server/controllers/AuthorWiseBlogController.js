const blogModel = require('../models/BlogModel');

const fetchData = async (req, res) => {
  try {
    let authorId = req.query?.id;
    let authorWiseBlogs = await blogModel.find({ author: authorId }).populate('author category views likes dislikes comments.user');
    return res.status(200).send({
      success: true,
      message: 'Data Fetched',
      authorWiseBlogs
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