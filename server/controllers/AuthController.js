const AuthService = require("../services/auth.service");
const UserService = require("../services/user.service");
const AppError = require("../utils/AppError");
const ResponseTemp = require("../utils/ResponseTemp");

class AuthController {
  authserviceInstance = new AuthService();
  userserviveInstance = new UserService();

  signup = async (req, res) => {
    const { email, password, name } = req.body;

    if (await this.authserviceInstance.checkdetailsOfSignup(email, password, name )) {
      //creating new User
      let response = await this.authserviceInstance.createNewUser({ email, password, name });

      //  generate token
      const resp = await this.authserviceInstance.createToken(
        response?.content
      );

      const options = {
        // i am currently removing domain as in postman it is not creating token in cookies
        // domain: process.env.REACT_APP_URL,
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      const access_token = resp.content.data;
      response.content.meta = {
        access_token,
      };
      res
        .status(response?.errorCode)
        .cookie("access_token", access_token, options)
        .json(response);
    }
  };

  signin = async (req, res) => {
   
    const { email,password } = req.body;

    if (!email || !password) {
      throw new AppError(false, "please provide email and password", 404);
    }

    //creating new User
    let response = await this.authserviceInstance.login({email,password});

    //  generate token
    const resp = await this.authserviceInstance.createToken(response?.content);

    const options = {
      // i am currently removing domain as in postman it is not creating token in cookies
      // domain: process.env.REACT_APP_URL,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    const access_token = resp.content.data;
    response.content.meta = {
      access_token,
    };
    res
      .status(response?.errorCode)
      .cookie("access_token", access_token, options)
      .json(response);
  };


  me = async (req, res) => {
    const resp = await this.userserviveInstance.findUserByEmail(
      req?.user?.email
    );
let details;
    if (resp) {
      resp.password = undefined;
      details =  new ResponseTemp(true, "found user details", 200, resp);
    } else {
      details =  new ResponseTemp(false, "user details not found", 404);
    }
    return res.status(details?.errorCode).json(details)
  };
}

module.exports = AuthController;
