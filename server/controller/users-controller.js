const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const User = require("../models/user");
require("dotenv").config();

const signUp = async (req, res, next) => {
    const { firstName, lastName,role,listOfExams, userName, password } = req.body;
    let existUser;
    try {
        existUser = await User.findOne({ userName: userName });
      } catch (err) {
        console.log(err);
        const error = new HttpError("Signing up failed, please try again", 500);
        return next(error);
      }
      if (existUser) {
        const error = new HttpError("User exist! try again", 422);
        res.status(422).json({
          message: "User exist! try again",
        });
        return next(error);
      }
    
      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(password, 12);
      } catch (err) {
        const error = new HttpError("Could not create user", 500);
        return next(error);
      }

      const createdUser = new User({
        firstName,
        lastName,
        role,
        listOfExams,
        userName,
        password: hashedPassword,
      });
  
      try {
        await createdUser.save();
      } catch (err) {
        console.log(err);
        const error = new HttpError("Signing up failed, please try again", 500);
        res.status(500).json({
          message:"register failed!"
        })
        return next(error);
      }
      let token;
      try {
        token = jwt.sign(
          {
            userId: createdUser.id,
            userName: createdUser.userName,
          },
          process.env.JWT_KEY,
          { expiresIn: "5h" }
        );
      } catch (err) {
        console.log(err);
        const error = new HttpError("Signing up failed, please try again", 500);
        return next(error);
      }
      res.status(201).json({
        userId: createdUser.id,
        userName: createdUser.userName,
        role:createdUser.role,
        token: token,
        firstName: createdUser.firstName,
        message: "Sign up successful",
      });
}




const signIn = async (req, res, next) => {
  const { userName, password } = req.body;
  let isEqual = false;
  let existUser;
  let token;
  try {
    existUser = await User.findOne({ userName: userName.toLowerCase() }).select(
      "+password"
    );
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again", 500);
    return next(error);
  }
  try {
    if (existUser) {
      isEqual = await bcrypt.compare(password, existUser.password);
      if (isEqual) {
         token = await jwt.sign(
          {
            userName: existUser.userName,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "5h",
          }
        );
      }
      else{
        return(
          res.status(500).json({
            message:"Login Failed! try again"
          })
        )
      }
    }
   
    else{
      return(
        res.status(401).json({
          message:"Login Failed! try again"
        })
      )
    }
  } catch (err) {
    const error = new HttpError("Login Failed! try again", 500);
    return next(error);
  }
    res.status(200).json({
      id : existUser._id,
      token: token,
      role:existUser.role,
      fullName: existUser.firstName + " " + existUser.lastName,
      message: "login successful",
    });
    
};

const getFullExam = async (req, res, next) =>
{
  const {idForStudent,idForExam} = req.query;
  let existUser;
  let existExam;
  try{
    existUser = await User.findById(idForStudent)
    for (let i = 0; i < existUser.listOfExams.length; i++) {
      if(existUser.listOfExams[i].idForExam === idForExam)
      {
        return res.status(200).json(existUser.listOfExams[i])
      }
    }
  }
  catch(err)
  {
    console.log(err)
  }
}

exports.signUp = signUp;
exports.signIn = signIn;
exports.getFullExam = getFullExam;
