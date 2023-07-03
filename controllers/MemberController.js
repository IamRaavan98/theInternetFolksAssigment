const roleModel = require("../models/roleModel");
const MemberService = require("../services/member.service");
const RoleService = require("../services/role.service");
const AppError = require("../utils/AppError");

class MemberController {

    memberServiceInstance = new MemberService;
   roleServiceInstance = new RoleService
   createMember = async(req,res)=>{
     const {community , user, role} = req.body
      
     if(!community || !user || !role){
        throw new AppError(false,"please give community, user and role",404)
     }
     else{
      // to check given role should not be admin
       if(await this.roleServiceInstance.checkIsAdminByid(role)){
        throw new AppError(false,"admin role cant be assign to this user",500)
       }   
    
        
        
      const newMember = await this.memberServiceInstance.createMemberService(community,user,role)
     
       return res.status(newMember.errorCode).json(newMember)

     }


   }

   removeMember = async(req,res)=>{

    const {id} = req.query;
      

    if(!id){
       throw new AppError(false,"please provide id",404)
    }
    const resp = await this.memberServiceInstance.removeMemberService(id)

    return res.status(resp.errorCode).json(resp)
   }
    


  
}

module.exports = MemberController;
