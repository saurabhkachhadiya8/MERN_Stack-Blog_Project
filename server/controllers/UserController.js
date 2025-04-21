const blogModel = require('../models/BlogModel');
const blogCategoryModel = require('../models/BlogCategoryModel');
const cloudinary = require('cloudinary').v2;

// profile 
const updateProfile = async (req, res) => {
  try {
    const { userid, name, email, password, gender, city, contact } = req.body;
    if (!name || !email || !password || !gender || !city || !contact) {
      return res.status(400).send({
        success: false,
        message: "All Fields Are Required"
      });
    }
    let user = await userModel.findById(userid);
    if (user?.email != email) {
      const dupUser = await userModel.findOne({ email: email });
      if (dupUser) {
        return res.status(400).send({
          success: false,
          message: "Email already exists"
        });
      }
    }
    if (!req.file) {
      let data = await userModel.findByIdAndUpdate(user?._id, {
        name: name,
        email: email,
        password: password,
        gender: gender,
        city: city,
        contact: contact,
        image: user?.image
      }, { new: true });
      return res.status(200).send({
        success: true,
        message: "User Updated Successfully",
        data
      });
    } else {
      await cloudinary.uploader.destroy(user?.public_id);
      let imageRecord = await cloudinary.uploader.upload(req.file?.path);
      let data = await userModel.findOneAndUpdate({ email: email, password: password }, {
        name: name,
        email: email,
        password: password,
        gender: gender,
        city: city,
        contact: contact,
        image: imageRecord?.secure_url,
        public_id: imageRecord?.public_id
      }, { new: true });
      return res.status(200).send({
        success: true,
        message: "User Updated Successfully",
        data
      });
    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
// blog category 
const viewBlogCategory = async (req, res) => {
  try {
    let active_BlogCategory = await blogCategoryModel.find({ status: 'active' }).populate('createdBy');
    return res.status(200).send({
      success: true,
      message: 'Categories fetched successfully',
      active_BlogCategory
    })
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
// blog crud
const addBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category || !req.file) {
      return res.status(400).send({
        success: false,
        message: "Please fill all fields"
      });
    }
    const thumbnail = await cloudinary.uploader.upload(req.file?.path);
    const blog = await new blogModel({
      author: req?.user?._id,
      title: title,
      content: content,
      category: category,
      thumbnail: {
        image: thumbnail.secure_url,
        public_id: thumbnail.public_id
      },
      status: 'published'
    });
    const savedBlog = await blog.save();
    return res.status(200).send({
      success: true,
      message: 'Blog added successfully',
      savedBlog
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const viewBlog = async (req, res) => {
  try {
    let userBlogs = await blogModel.find({ author: req?.user?._id }).populate('author category views likes comments.user');
    if (!userBlogs.length) {
      return res.status(200).send({
        success: false,
        message: "No blogs available"
      });
    }
    return res.status(200).send({
      success: true,
      message: "Blogs found",
      userBlogs
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const deleteBlog = async (req, res) => {
  try {
    let id = req.query?.id;
    let blog = await blogModel.findOne({ _id: id, author: req?.user?._id });
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found"
      });
    }
    await cloudinary.uploader.destroy(blog?.thumbnail?.public_id);
    await blogModel.deleteOne({ _id: blog?._id, author: req?.user?._id });
    return res.status(200).send({
      success: true,
      message: "Blog deleted successfully"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const updateBlog = async (req, res) => {
  try {
    const { id, title, content, category } = req.body;
    let blog = await blogModel.findOne({ _id: id, author: req?.user?._id });
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found"
      })
    }
    if (req.file) {
      await cloudinary.uploader.destroy(blog?.thumbnail?.public_id);
      let thumbnail = await cloudinary.uploader.upload(req.file?.path);
      await blogModel.findByIdAndUpdate(blog?._id, {
        title: title,
        content: content,
        category: category,
        thumbnail: {
          image: thumbnail?.secure_url,
          public_id: thumbnail?.public_id
        }
      });
    } else {
      await blogModel.findByIdAndUpdate(blog?._id, {
        title: title,
        content: content,
        category: category,
        thumbnail: {
          image: blog?.thumbnail?.image,
          public_id: blog?.thumbnail?.public_id
        }
      });
    }
    return res.status(200).send({
      success: true,
      message: "Blog updated successfully"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
// comment 
const addBlogComment = async (req, res) => {
  try {
    const { id, text } = req.body;
    let blog = await blogModel.findById(id);
    if (!text) {
      return res.status(404).send({
        success: false,
        message: "Please enter a comment"
      })
    }
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found"
      });
    }
    blog.comments.push({
      user: req?.user?._id,
      text: text
    });
    let updateBlog = await blog.save();
    let updatedBlog = await blogModel.findById(updateBlog?._id).populate('author category views likes comments.user');
    return res.status(200).send({
      success: true,
      message: "Comment added successfully",
      updatedBlog
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const editBlogComment = async (req, res) => {
  try {
    const { id, text } = req.body;
    let blog = await blogModel.findOne({ "comments._id": id }).populate('author category views likes comments.user');
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found"
      });
    }
    let comment = blog.comments.find((val) => {
      return (val?._id == id && val?.user?._id == req.user?._id) && (val.text = text);
    });
    if (!comment) {
      return res.status(404).send({
        success: false,
        message: "You Are Not Authorized"
      });
    }
    let updateBlog = await blog.save();
    let updatedBlog = await blogModel.findById(updateBlog?._id).populate('author category views likes comments.user');
    return res.status(200).send({
      success: true,
      message: "Comment updated successfully",
      updatedBlog
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const deleteBlogComment = async (req, res) => {
  try {
    const id = req.query?.id;
    let blog = await blogModel.findOne({ "comments._id": id }).populate('author category views likes comments.user');
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found"
      });
    }
    let comment = blog.comments.find((val) => (val?._id == id && val?.user?._id == req.user?._id));
    if (!comment) {
      return res.status(404).send({
        success: false,
        message: "You Are Not Authorized"
      });
    }
    blog.comments = blog.comments.filter((val) => val?._id != comment?._id);
    let updateBlog = await blog.save();
    let updatedBlog = await blogModel.findById(updateBlog?._id).populate('author category views likes comments.user');
    return res.status(200).send({
      success: true,
      message: "Comment deleted successfully",
      updatedBlog
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
// commented blog 
const commentedBlog = async (req, res) => {
  try {
    let allBlogs = await blogModel.find({ 'comments.user': req?.user?._id }).populate('author category views likes comments.user');
    let otherBlogs = allBlogs.filter((blog) => blog?.author?._id != req?.user?._id);
    let myBlogs = await blogModel.find({ 'comments.user': req?.user?._id, author: req?.user?._id }).populate('author category views likes comments.user');
    return res.status(200).send({
      success: true,
      message: "Blog found",
      allBlogs,
      otherBlogs,
      myBlogs
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    })
  }
}
// liked blog 
const likedBlog = async (req, res) => {
  try {
    let allBlogs = await blogModel.find({ likes: req?.user?._id }).populate('author category views likes comments.user');
    let otherBlogs = allBlogs.filter((blog) => blog?.author?._id != req?.user?._id);
    let myBlogs = await blogModel.find({ likes: req?.user?._id, author: req?.user?._id }).populate('author category views likes comments.user');
    return res.status(200).send({
      success: true,
      message: "Blog found",
      allBlogs,
      otherBlogs,
      myBlogs
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    })
  }
}
module.exports = {
  updateProfile, viewBlogCategory, addBlog, viewBlog, deleteBlog, updateBlog, addBlogComment, editBlogComment, deleteBlogComment, commentedBlog, likedBlog
}