require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const DBconnection = require("./config/DB");
const roleRoutes = require("./routes/role");
const communityRoutes = require("./routes/community");
const memberRoutes = require("./routes/member");

// DB start
DBconnection();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.status(400).send("Welcome to Backend");
});

//Routes
app.use("/v1/auth", authRoutes);
app.use("/v1/role", roleRoutes);
app.use("/v1/community", communityRoutes);
app.use("/v1/member", memberRoutes);


app.listen(process.env.PORT, () => {
    console.log("Server is running", process.env.PORT);
  });
  