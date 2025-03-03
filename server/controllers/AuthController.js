let userModel = require('../models/UserModel');
let JWT = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email: email, password: password });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password"
      })
    }
    let userToken = await JWT.sign({ payload: user }, process.env.JWT_SECRET_KEY, { expiresIn: '3hr' });
    return res.status(200).send({
      success: true,
      message: "User logged in successfully",
      token: userToken,
      user
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const registerUser = async (req, res) => {
  try {
    const { name, email, password, gender, city, contact } = req.body;
    if (!name || !email || !password || !gender || !city || !contact || !req.file) {
      return res.status(400).send({
        success: false,
        message: "All Fields Are Required"
      });
    }
    const dupUser = await userModel.findOne({ email: email });
    if (dupUser) {
      return res.status(400).send({
        success: false,
        message: "Email already exists"
      });
    }
    let imageRecord = await cloudinary.uploader.upload(req.file.path);
    let user = await new userModel({
      name: name,
      email: email,
      password: password,
      gender: gender,
      city: city,
      contact: contact,
      image: imageRecord?.secure_url,
      public_id: imageRecord?.public_id
    });
    user.save();
    return res.status(200).send({
      success: true,
      message: 'User created successfully',
      user
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const dummyApi = async (req, res) => {
  try {
    return res.send(req.user);
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const allUser = async (req, res) => {
  try {
    const allAdmins = await userModel.find({ role: 'admin' });
    const allUsers = await userModel.find({ role: 'user' });
    return res.status(200).send({
      success: true,
      message: 'All Data',
      allAdmins: {
        length: allAdmins.length,
        admins: allAdmins
      },
      allUsers: {
        length: allUsers.length,
        users: allUsers
      }
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
module.exports = {
  loginUser, registerUser, dummyApi, allUser
}