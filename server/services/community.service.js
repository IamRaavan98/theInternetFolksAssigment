const communityModel = require("../models/communityModel");
const memberModel = require("../models/memberModel");
const AppError = require("../utils/AppError");
const ResponseTemp = require("../utils/ResponseTemp");
const GlobalService = require("./global.service");

class CommunityService {
  // find user by email
  globalServiceInstance = new GlobalService 
 
  async createCommunityService(name, owner) {
    const communityExists = await communityModel.findOne({ name, owner });
    if (communityExists) {
      throw new AppError(
        false,
        "community with this name already exists, please give some another name",
        402
      );
    } else {
      const newCommunity = await communityModel.create({name, owner});
    
      await newCommunity.save();
      return new ResponseTemp(true, "new Community created", 200, newCommunity);
    }
  }

  async getCommunityService(pageNumber){
    const defaultPageSize = 3; 

    const skip = (pageNumber - 1) * defaultPageSize;

    const communitydata = 
    await communityModel
    .find()
    .populate('owner', 'name _id')
    .limit(defaultPageSize)
    .skip(skip);
  
  
   if(communitydata.length){
      const meta = await this.globalServiceInstance.pagination(communityModel
        .find(),defaultPageSize,pageNumber)
   
     return new ResponseTemp(true,"successfull",200,communitydata,meta)

   }
   else{
    throw new AppError(false,"no community found", 404)
   }

  }

  async getAllMemberService(community,pageNumber){
    const defaultPageSize = 3; 
    const skip = (pageNumber - 1) * defaultPageSize;

    const resp = await memberModel.find({community}) 
    .populate('community', 'name id')
    .populate('user', 'name id')
    .populate('role', 'name id')
    .limit(defaultPageSize)
    .skip(skip);


    if(resp.length){
      const meta = await this.globalServiceInstance.pagination(memberModel.find({community}) ,defaultPageSize,pageNumber)

      return new ResponseTemp(true,"successfull",200,resp,meta)
    }
    else{
      throw new AppError(false,"no data found", 404)
    }
  }

  async getUserAllCommunityService(owner,pageNumber){
    const defaultPageSize = 3; 

    const skip = (pageNumber - 1) * defaultPageSize; 
    
    const resp = await communityModel.find({owner})
    .limit(defaultPageSize)
    .skip(skip);

    if(resp.length){
      const meta = await this.globalServiceInstance.pagination(communityModel.find({owner}),defaultPageSize,pageNumber)
      return new ResponseTemp(true,"successfull",200,resp,meta)
    }
    else{
      throw new AppError(false,"no data found", 404)
    }
  }

  async getUserAllJoinedCommunity(user,pageNumber){
    const defaultPageSize = 3; 

    const skip = (pageNumber - 1) * defaultPageSize;

    const resp = await memberModel.find({user})
    .populate('community', 'name id')
    .populate('user', 'name id')
    .populate('role', 'name id')
    .limit(defaultPageSize)
    .skip(skip);

   

    if(resp.length){

      const meta = await this.globalServiceInstance.pagination(memberModel.find({user}),defaultPageSize,pageNumber)

      return new ResponseTemp(true,"successfull",200,resp,meta)
    }
    else{
      throw new AppError(false,"no data found", 404)
    }
  }
}

module.exports = CommunityService;
