const userModel = require('../models/UserModel');

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
module.exports = {
  allUser
}