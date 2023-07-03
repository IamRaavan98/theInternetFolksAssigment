const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  name:{
    type:String,
    maxLength:64,
    minLength:0,
    default:null
  },
  
  email:{
    type:String,
    maxLength:128,
    minLength:0,
    unique:true,
  },

  password:{
    type:String,
    maxLength:64,
    minLength:0,
  },

}, { timestamps: true })
module.exports = mongoose.model("usermodel", userModel);
