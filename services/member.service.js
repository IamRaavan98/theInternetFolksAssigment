const memberModel = require("../models/memberModel");
const roleModel = require("../models/roleModel");
const AppError = require("../utils/AppError");
const ResponseTemp = require("../utils/ResponseTemp");

class MemberService{

async createMemberService(community,user,role){
    const memberExists = await memberModel.findOne({community,user,role})
    if(memberExists){
        return new ResponseTemp(false,"alreadyExist",409)
    }
    else{
        const resp = await memberModel.create({community,user,role})
        if(resp){
            return new ResponseTemp(true,"member created",200,resp)
        }
        else{
            throw new AppError(true,"new member not created",400)
        }
    }
}

async removeMemberService(_id){
    const resp  = await memberModel.findOneAndDelete({_id})
    if(resp){
        return new ResponseTemp(true,"successful",200)
    } 
    else{
        throw new AppError(false,"cant delete",500)
    }

}
}

module.exports = MemberService