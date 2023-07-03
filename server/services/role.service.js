const roleModel = require("../models/roleModel");
const AppError = require("../utils/AppError");
const ResponseTemp = require("../utils/ResponseTemp");
const GlobalService = require("./global.service");


class RoleService {
 
 globalServiceInstance = new GlobalService;

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

async getAllRole(pageNumber){
    const defaultPageSize = 3; 

    const skip = (pageNumber - 1) * defaultPageSize;

    const data = await roleModel.find()
    .limit(defaultPageSize)
    .skip(skip);
   
    if(data.length){
        const meta = await this.globalServiceInstance.pagination(roleModel.find(),defaultPageSize,pageNumber)
         
     return new ResponseTemp(true,"successful",200,data,meta)
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