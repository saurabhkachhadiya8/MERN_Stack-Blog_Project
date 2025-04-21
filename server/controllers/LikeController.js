const blogModel = require('../models/BlogModel');

const handleLike = async (req, res) => {
  try {
    let id = req.body?.id;
    let blog = await blogModel.findById(id);
    let likedOrNot = blog?.likes.includes(req?.user?._id);
    let dislikedOrNot = blog?.dislikes.includes(req?.user?._id);
    if (!likedOrNot) {
      if (!dislikedOrNot) {
        blog?.likes.push(req?.user?._id);
        let updateBlog = await blog.save()
        let updatedBlog = await blogModel.findById(updateBlog?._id).populate('author views likes dislikes comments.user');
        return res.status(200).send({
          success: true,
          message: "Blog liked successfully",
          updatedBlog
        });
      } else {
        let updatedBlog = await blogModel.findById(blog?._id).populate('author views likes dislikes comments.user');
        return res.status(200).send({
          success: true,
          message: "Blog already disliked",
          updatedBlog
        });
      }
    } else {
      blog?.likes.pull(req?.user?._id);
      let updateBlog = await blog.save();
      let updatedBlog = await blogModel.findById(updateBlog?._id).populate('author views likes dislikes comments.user');
      return res.status(200).send({
        success: true,
        message: "Remove like successfully",
        updatedBlog
      });
    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const handleDislike = async (req, res) => {
  try {
    let id = req.body?.id;
    let blog = await blogModel.findById(id);
    let dislikedOrNot = blog?.dislikes.includes(req?.user?._id);
    let likedOrNot = blog?.likes.includes(req?.user?._id);
    if (!dislikedOrNot) {
      if (!likedOrNot) {
        blog?.dislikes.push(req?.user?._id);
        let updateBlog = await blog.save()
        let updatedBlog = await blogModel.findById(updateBlog?._id).populate('author views likes dislikes comments.user');
        return res.status(200).send({
          success: true,
          message: "Blog disliked successfully",
          updatedBlog
        });
      } else {
        let updatedBlog = await blogModel.findById(blog?._id).populate('author views likes dislikes comments.user');
        return res.status(200).send({
          success: true,
          message: "Blog already liked",
          updatedBlog
        });
      }
    } else {
      blog?.dislikes.pull(req?.user?._id);
      let updateBlog = await blog.save();
      let updatedBlog = await blogModel.findById(updateBlog?._id).populate('author views likes dislikes comments.user');
      return res.status(200).send({
        success: true,
        message: "Remove dislike successfully",
        updatedBlog
      });
    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
module.exports = {
  handleLike, handleDislike
}