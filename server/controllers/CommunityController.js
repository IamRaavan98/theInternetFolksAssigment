const communityModel = require("../models/communityModel");
const communityRoutes = require("../routes/community");
const CommunityService = require("../services/community.service");
const MemberService = require("../services/member.service");
const RoleService = require("../services/role.service");
const AppError = require("../utils/AppError");

class CommunityController {
  communityServiceInstance = new CommunityService();
  memberServiceInsatance = new MemberService();
  roleServiceInstance = new RoleService();

  createCommunity = async (req, res) => {
    const { name } = req.body;

    if (!name) {
      throw new AppError(false, "community name not found", 404);
    } else {
      const newCommunity =
        await this.communityServiceInstance.createCommunityService(
          name,
          req.user._id
        );

      // adding member
      if (newCommunity) {
        //  giving admin role to the creater of community
        const roleDetails = await this.roleServiceInstance.getTypeOfRole(
          "Community Admin"
        );

        await this.memberServiceInsatance.createMemberService(
          newCommunity?.content?.data?._id,
          req.user._id,
          roleDetails?.content?.data?._id
        );

        return res.send(newCommunity);
      }
    }
  };

  getCommunity = async (req, res) => {
    // we assumer if page number is not specified it will be 1
    const pageNumber = req.query?.page || 1;

    const data = await this.communityServiceInstance.getCommunityService(pageNumber);

    return res.status(data?.errorCode).json(data);
  };

  getAllMember = async (req, res) => {
  
    const {id} = req.params;
    if(!id || id.includes("id")){
        
      throw new AppError(false,"please provide id",404)
   }
   else{
    const pageNumber = req.query?.page || 1;
   
    const data = await this.communityServiceInstance.getAllMemberService(id,pageNumber)

    return res.status(data?.errorCode).json(data)
   }
  };

  getUserAllCommunity = async(req, res)=>{

    const pageNumber = req.query?.page || 1;

    const data = await this.communityServiceInstance.getUserAllCommunityService(req.user._id,pageNumber)
    return res.status(data?.errorCode).json(data)
  }

  getMyJoinedCommunity = async(req,res)=>{
    const pageNumber = req.query?.page || 1;

    const data = await this.communityServiceInstance.getUserAllJoinedCommunity(req.user._id,pageNumber)
    return res.status(data?.errorCode).json(data)
  }
}

module.exports = CommunityController;
