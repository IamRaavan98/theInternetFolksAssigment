const mongoose = require("mongoose");
const communityModel = require("./communityModel");
const userModel = require("./userModel");
const roleModel = require("./roleModel");

const memberModel = mongoose.Schema({
  community:{
    type: mongoose.Schema.Types.ObjectId,
    ref:communityModel
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:userModel
  },
  role:{
    type: mongoose.Schema.Types.ObjectId,
    ref:roleModel
  },

}, { timestamps: true })
module.exports = mongoose.model("membermodel", memberModel);


