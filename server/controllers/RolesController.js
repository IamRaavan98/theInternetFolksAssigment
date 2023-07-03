const RoleService = require("../services/role.service");
const AppError = require("../utils/AppError");

class RolesController {
  roleServiceInstance = new RoleService();
  createRole = async (req, res) => {
    const {data} = req.body;
        
    if (!data || !(data?.name)) throw new AppError(false, "name not found please provide name", 404);
    else {
      const resp = await this.roleServiceInstance.createNewRole(data?.name);

      return res.status(resp?.errorCode).json(resp);
    }
  };

  getRole = async (req, res)=>{

    const data = await this.roleServiceInstance.getAllRole()
    
    return res.status(data?.errorCode).json(data)
  }
}

module.exports = RolesController;
