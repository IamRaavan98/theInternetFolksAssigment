const express = require("express");
const { tryCatch } = require("../utils/tryCatch");
const errorHandler = require("../middleware/errorhandler");
const { auths } = require("../middleware/auths");
const RoleController = require("../controllers/roleController");


const roleRoutes = express.Router();

// welcome routes
roleRoutes.get("/welcome",function(req ,res){
    res.send("its a welcome route")
})


const role  = new RoleController;

roleRoutes.post("/",auths,tryCatch(role.createRole),errorHandler)
roleRoutes.get("/",auths,tryCatch(role.getRole),errorHandler)

module.exports = roleRoutes;
