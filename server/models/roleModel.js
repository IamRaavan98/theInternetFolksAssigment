const mongoose = require("mongoose");

const roleModel = mongoose.Schema({
  name:{
    type:String,
    maxLength:64,
    minLength:0,
    unique:true
  },
  scopes:[],


}, { timestamps: true })
module.exports = mongoose.model("rolemodel", roleModel);
