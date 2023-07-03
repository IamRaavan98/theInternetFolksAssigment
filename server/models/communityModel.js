const mongoose = require("mongoose");
const userModel = require("./userModel");

const communityModel = mongoose.Schema({
  name:{
    type:String,
    max:255,
    min:0,
  },
  slug:{
    type:String,
    slug:"name",
    maxLength:255,
    minLength:0,
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:userModel
  },
}, { timestamps: true })

communityModel.pre("save", function(next) {
  this.slug = this.name.replace(/[-\s]/g, "").toLowerCase();
  next();
})
module.exports = mongoose.model("communitymodel", communityModel);
