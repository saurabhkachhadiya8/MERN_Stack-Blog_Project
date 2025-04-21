const userModel = require('../models/UserModel');
const blogModel = require('../models/BlogModel');
const blogCategoryModel = require('../models/BlogCategoryModel');
const cloudinary = require('cloudinary').v2;

const allUser = async (req, res) => {
  try {
    let admins = await userModel.find({ role: 'admin' });
    let managers = await userModel.find({ role: 'manager' });
    let users = await userModel.find({ role: 'user' });
    return res.status(200).send({
      success: true,
      message: "Users fatched successfully",
      admins,
      managers,
      users
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const updateUser = async (req, res) => {
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
const deleteUser = async (req, res) => {
  try {
    let userid = req.query?.userid;
    let user = await userModel.findById(userid);
    if (!user) {
      return res.status(404), send({
        success: false,
        message: "User Not Found"
      });
    }
    if (user?.public_id) {
      await cloudinary.uploader.destroy(user?.public_id);
    }
    await userModel.findByIdAndDelete(user?._id);
    return res.status(200).send({
      success: true,
      message: "Users Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
// blog category 
const addBlogCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !req.file) {
      return res.status(400).send({
        success: false,
        message: "Please provide name and image"
      });
    }
    let image = await cloudinary.uploader.upload(req.file?.path);
    const category = await new blogCategoryModel({
      createdBy: req.user?._id,
      name: name,
      description: description,
      image: {
        image: image.secure_url,
        public_id: image.public_id
      },
      status: 'active'
    }).save();
    return res.status(200).send({
      success: true,
      message: "Blog Category Added Successfully",
      category
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const viewBlogCategory = async (req, res) => {
  try {
    let all_BlogCategory = await blogCategoryModel.find({}).populate('createdBy');
    let other_BlogCategory = all_BlogCategory.filter((cat) => cat?.createdBy?._id != req.user?._id);
    let my_BlogCategory = await blogCategoryModel.find({ createdBy: req.user?._id }).populate('createdBy');
    let active_BlogCategory = await blogCategoryModel.find({ status: 'active' }).populate('createdBy');
    return res.status(200).send({
      success: true,
      message: 'Categories fetched successfully',
      all_BlogCategory,
      other_BlogCategory,
      my_BlogCategory,
      active_BlogCategory
    })
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const updateBlogCategory = async (req, res) => {
  try {
    const { id, name, description } = req.body;
    let blogCategory = await blogCategoryModel.findById(id);
    if (blogCategory?.createdBy != req.user?._id) {
      return res.status(400).send({
        success: false,
        message: 'You Are Not Authorized'
      });
    }
    if (!req.file) {
      let updatedBlogCategory = await blogCategoryModel.findByIdAndUpdate(blogCategory?._id, {
        name: name,
        description: description,
        image: {
          image: blogCategory?.image?.image,
          public_id: blogCategory?.image?.public_id
        }
      });
    } else {
      await cloudinary.uploader.destroy(blogCategory?.image?.public_id);
      let image = await cloudinary.uploader.upload(req.file?.path);
      let updatedBlogCategory = await blogCategoryModel.findByIdAndUpdate(blogCategory?._id, {
        name: name,
        description: description,
        image: {
          image: image?.secure_url,
          public_id: image?.public_id
        }
      });
    }
    return res.status(200).send({
      success: true,
      message: "BlogCategory Updated Successfully"
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const deleteBlogCategory = async (req, res) => {
  try {
    let id = req.query?.blogcatid;
    let blogCategory = await blogCategoryModel.findById(id);
    if (blogCategory?.createdBy != req.user?._id) {
      return res.status(400).send({
        success: false,
        message: 'You Are Not Authorized'
      });
    }
    await blogCategoryModel.findByIdAndDelete(blogCategory?._id);
    return res.status(200).send({
      success: true,
      message: 'BlogCategory Deleted Successfully'
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const changeBlogCategoryStatus = async (req, res) => {
  try {
    let { blogcatid, status } = req.body;
    let blogCategory = await blogCategoryModel.findById(blogcatid);
    if (blogCategory?.createdBy != req.user?._id) {
      return res.status(400).send({
        success: false,
        message: 'You Are Not Authorized'
      });
    }
    await blogCategoryModel.findByIdAndUpdate(blogCategory?._id, {
      status: status == 'active' ? 'deactive' : 'active'
    });
    return res.status(200).send({
      success: true,
      message: 'BlogCategory Updated Successfully'
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
// blog 
const viewBlog = async (req, res) => {
  try {
    const allBlog = await blogModel.find({}).populate('author category views likes comments.user');
    const adminBlog = allBlog.filter((blog) => blog?.author?.role == 'admin');
    const managerBlog = allBlog.filter((blog) => blog?.author?.role == 'manager');
    const userBlog = allBlog.filter((blog) => blog?.author?.role == 'user');
    const myBlog = await blogModel.find({ author: req?.user?._id }).populate('author category views likes comments.user');
    return res.status(200).send({
      success: true,
      message: "Blog Viewed Successfully",
      allBlog,
      adminBlog,
      managerBlog,
      userBlog,
      myBlog
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
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
const deleteBlog = async (req, res) => {
  try {
    let id = req.query?.id;
    let blog = await blogModel.findById(id).populate('author category views likes comments.user');
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found"
      });
    }
    if (blog?.author?.role == 'admin' && blog?.author?._id != req.user?._id) {
      return res.status(400).send({
        success: false,
        message: 'You Are Not Authorized'
      });
    }
    await cloudinary.uploader.destroy(blog?.thumbnail?.public_id);
    await blogModel.findByIdAndDelete(blog?._id);
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
    let blog = await blogModel.findById(id).populate('author category views likes comments.user');
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found"
      })
    }
    if (blog?.author?.role == 'admin' && blog?.author?._id != req.user?._id) {
      return res.status(400).send({
        success: false,
        message: 'You Are Not Authorized'
      });
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
      return (val?._id == id && (val?.user?.role != 'admin' || val?.user?._id == req.user?._id)) && (val.text = text);
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
    let comment = blog.comments.find((val) => val?._id == id);
    if (comment?.user?.role == 'admin' && comment?.user?._id != req.user?._id) {
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
    let allBlog = await blogModel.find({ 'comments.user': req?.user?._id }).populate('author category views likes comments.user');
    let adminBlog = allBlog.filter((blog) => blog?.author?.role == 'admin');
    let managerBlog = allBlog.filter((blog) => blog?.author?.role == 'manager');
    let userBlog = allBlog.filter((blog) => blog?.author?.role == 'user');
    let myBlog = await blogModel.find({ 'comments.user': req?.user?._id, author: req?.user?._id }).populate('author category views likes comments.user');
    return res.status(200).send({
      success: true,
      message: "Blog found",
      allBlog,
      adminBlog,
      managerBlog,
      userBlog,
      myBlog
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
    let allBlog = await blogModel.find({ likes: req?.user?._id }).populate('author category views likes comments.user');
    let adminBlog = allBlog.filter((blog) => blog?.author?.role == 'admin');
    let managerBlog = allBlog.filter((blog) => blog?.author?.role == 'manager');
    let userBlog = allBlog.filter((blog) => blog?.author?.role == 'user');
    let myBlog = await blogModel.find({ likes: req?.user?._id, author: req?.user?._id }).populate('author category views likes comments.user');
    return res.status(200).send({
      success: true,
      message: "Blog found",
      allBlog,
      adminBlog,
      managerBlog,
      userBlog,
      myBlog
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    })
  }
}
module.exports = {
  allUser, updateUser, deleteUser, addBlogCategory, viewBlogCategory, updateBlogCategory, deleteBlogCategory, changeBlogCategoryStatus, viewBlog, addBlog, deleteBlog, updateBlog, commentedBlog, likedBlog, addBlogComment, editBlogComment, deleteBlogComment
}