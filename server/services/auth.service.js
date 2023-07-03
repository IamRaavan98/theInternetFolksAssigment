const userModel = require("../models/userModel");
const AppError = require("../utils/AppError");
const ResponseTemp = require("../utils/ResponseTemp");
const UserService = require("./user.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
class AuthService {
  userServiceInstance = new UserService();
  // checking details of signup
  async checkdetailsOfSignup(data) {
    if (!data) {
   
      throw new AppError(false, "please provide some data", true, 404);
    }
    const { email, password, name } = data;

    if (!email) {
      throw new AppError(false, "email not found", true, 404);
    } else if (!password || password?.length < 6) {
      throw new AppError(
        false,
        "password not found or password less than 6 characters",
        true,
        404
      );
    } else if (!name) {
      throw new AppError(
        false,
        "password not found or password less than 6 characters",
        true,
        404
      );
    }
    return true;
  }

  //   register new user
  async createNewUser(data) {
    const resp = await this.userServiceInstance.findUserByEmail(data?.email);

    if (resp) {
      throw new AppError(false, "user already exist", 400);
    } else {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(data.password, salt);

      data.password = hashedPassword;

      const newUser = await userModel.create(data);
      await newUser.save();
      newUser.password = undefined;
      if (newUser) {
        return new ResponseTemp(true, "new user created", 200, newUser);
      } else {
        throw new AppError(false, "new user Not created", 500);
      }
    }
  }

  async login(data) {
    const resp = await this.userServiceInstance.findUserByEmail(data?.email);
    
    if (resp) {
       if(await this.passwordMatch(resp?.password,data?.password)){
        resp.password = undefined;

         return new ResponseTemp(true, "login Succesfully", 200, resp);
       }
       else{
      throw new AppError(false, "password not match", 401);
       }
    } else {
      throw new AppError(false, "email not found", 400);
    }
  }

  async passwordMatch(savedPassword, userGivenPassword) {
    if (await bcrypt.compare(userGivenPassword,savedPassword)) {
      return true;
    } else {
      return false;
    }
  }
  //   create token
  async createToken(content) {
    const access_token = jwt.sign(
      { id: content?.data?._id },
      process.env.SECRET_KEY,
      { expiresIn: "10h" }
    );

    return new ResponseTemp(true, "", 200, access_token);
  }
}

module.exports = AuthService;
