const express = require("express");
const { tryCatch } = require("../utils/tryCatch");
const errorHandler = require("../middleware/errorhandler");
const { auths } = require("../middleware/auths");
const MemberController = require("../controllers/MemberController");
const verifyRoles = require("../middleware/verifyRoles");



const memberRoutes = express.Router();

// welcome routes
memberRoutes.get("/welcome",function(req ,res){
    res.send("its a welcome route")
})


const member  = new MemberController;

// Create
memberRoutes.post("/",auths,verifyRoles("Community Admin"),tryCatch(member.createMember),errorHandler)

// delete
memberRoutes.delete("/",auths,verifyRoles("Community Admin","Community Member"),tryCatch(member.removeMember),errorHandler)






module.exports = memberRoutes;
