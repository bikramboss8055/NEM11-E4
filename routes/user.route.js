const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const UserModel = require("../model/user.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  if (name && email && gender && password) {
    const validator = await UserModel.findOne({ email });
    if (validator) {
      res.send({ message: "user already registered" });
    } else {
      try {
        bcrypt.hash(password, 5, async (err, secure_password) => {
          if (err) {
            console.log(err);
          } else {
            const user = await UserModel.create({
              email,
              password: secure_password,
              gender,
              name,
            });
            res.send("Registration successful");
          }
        });
      } catch (error) {
        console.log("error: ", error.message);
      }
    }
  } else {
    res.send("fill all the fields");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        bcrypt.compare(password, user.password, (err, data) => {
          if (data) {
            const token = jwt.sign({ userID: user._id }, process.env.key);
            res.send({ message: "login success", token: token });
          } else {
            res.send("enter the correct password");
          }
        });
      } else {
        res.send("email not found");
      }
    } catch (error) {
      console.log("message: " + error.message);
    }
  } else {
    res.send("fill all fields"); 
  }
});

module.exports = userRouter;
