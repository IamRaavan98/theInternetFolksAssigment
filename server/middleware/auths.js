const jwt = require("jsonwebtoken");
const ResponseTemp = require("../utils/ResponseTemp");
const AppError = require("../utils/AppError");
const userModel = require("../models/userModel");



exports.auths = async (req, res, next) => {
try {
  const token =  req.cookies.access_token ||
  req.header("Authorization")?.replace("Bearer ", "") || req.body.token


  if (!token) {
    return res.status(404).json("token is missing, Please login");
  }
else{
  const decode = jwt.verify(token, process.env.SECRET_KEY);
  if (!decode){
    return new ResponseTemp(false,"invalid token",400)
  }
  
  const userDetails = await userModel.findById(decode?.id);
 
  if (userDetails) {
     req.user = userDetails
  }
  else{
    throw new AppError(false,"user not found",404)
  }
  return next();

}
} catch (error) {
  return res.send(error)
}
};
