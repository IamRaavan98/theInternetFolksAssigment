const userModel = require("../models/userModel");
const ResponseTemp = require("../utils/ResponseTemp");

class UserService {

// find user by email
  async findUserByEmail(email){
     
       const data = await userModel.findOne({email})
     
     if(data){
        return data
     }
     else{
        return false
     }

  }

}

module.exports = UserService;