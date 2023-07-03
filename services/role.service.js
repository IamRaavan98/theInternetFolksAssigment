const roleModel = require("../models/roleModel");
const AppError = require("../utils/AppError");
const ResponseTemp = require("../utils/ResponseTemp");


class RoleService {
 
async createNewRole(name){
    const alReadyExistOrNot = await roleModel.findOne({name})
    if(alReadyExistOrNot){
        throw new AppError(false,"role already exist",402)
    }
    else{
        
        const newRole = await roleModel.create({name})
        await newRole.save();
        return new ResponseTemp(true,"new Role created",200,newRole)
     }
}

async getAllRole(){
    const data = await roleModel.find()
    if(data){
     return new ResponseTemp(true,"successful",200,data)
    }
    else{
      throw new AppError(false,"unsuccessful",404)
    }

}

async getTypeOfRole(name){
    const newRole = await roleModel.findOne({name})
    if(newRole){
        return new ResponseTemp(true,"successful",200,newRole)
    } 
    else{
        throw new AppError(false,"Role Not found",404)
    }
}

async checkIsAdminByid(_id){
    const data = await roleModel.findOne({_id})
     
    if(data){
        if(data?.name === "Community Admin")return true
        else return false 
    }
    throw new AppError(false, "no role found",404)
}

}
module.exports = RoleService;