const express = require("express");
const { tryCatch } = require("../utils/tryCatch");
const errorHandler = require("../middleware/errorhandler");
const { auths } = require("../middleware/auths");
const CommunityController = require("../controllers/CommunityController");



const communityRoutes = express.Router();

// welcome routes
communityRoutes.get("/welcome",function(req ,res){
    res.send("its a welcome route")
})


const community  = new CommunityController;

// Create
communityRoutes.post("/",auths,tryCatch(community.createCommunity),errorHandler)

// get
communityRoutes.get("/",auths,tryCatch(community.getCommunity),errorHandler)

communityRoutes.get("/:id/members",auths,tryCatch(community.getAllMember),errorHandler)

communityRoutes.get("/me/owner",auths,tryCatch(community.getUserAllCommunity),errorHandler)

communityRoutes.get("/me/member",auths,tryCatch(community.getMyJoinedCommunity),errorHandler)





module.exports = communityRoutes;
