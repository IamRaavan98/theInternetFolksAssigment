const express = require("express");
const AuthController = require("../controllers/AuthController");
const { tryCatch } = require("../utils/tryCatch");
const errorHandler = require("../middleware/errorhandler");
const { auths } = require("../middleware/auths");


const authRoutes = express.Router();

// welcome routes
authRoutes.get("/welcome",function(req ,res){
    res.send("its a welcome route")
})


const auth  = new AuthController;

authRoutes.post("/signup",tryCatch(auth.signup),errorHandler)

authRoutes.post("/login",tryCatch(auth.login),errorHandler)

authRoutes.get("/me",  auths,tryCatch(auth.me),errorHandler)



module.exports = authRoutes;
