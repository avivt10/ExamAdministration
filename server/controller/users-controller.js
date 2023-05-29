const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const Exam = require("../models/exam");
const generateArray = require("../utils/generateArray");
const getScore = require("../utils/getScore");
const CapitalizeTheFirstLetter = require("../utils/CapitalizeTheFirstLetter");
require("dotenv").config();

const signUp = async (req, res, next) => {
  const { firstName, lastName, role, listOfExams, userName, password,grade } =
    req.body;
  const firstNameFixed = capitalizeFirstLetter(firstName);
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
  
  let createdUser;
  if(role === "lecturer")
  {
     createdUser = new User({
      firstName,
      lastName,
      role,
      listOfExams,
      userName,
      password: hashedPassword,
    });
  }
  else
  { 
    console.log(listOfExams);
   createdUser = new User({
    firstName,
    lastName,
    role,
    listOfExams,
    grade,
    userName,
    password: hashedPassword,
  });
  }
  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Signing up failed, please try again", 500);
    res.status(500).json({
      message: "register failed!",
    });
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
    role: createdUser.role,
    token: token,
    firstName: createdUser.firstName,
    message: "Sign up successful",
  });
};
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
      } else {
        return res.status(500).json({
          message: "Login Failed! try again",
        });
      }
    } else {
      return res.status(401).json({
        message: "Login Failed! try again",
      });
    }
  } catch (err) {
    const error = new HttpError("Login Failed! try again", 500);
    return next(error);
  }
  res.status(200).json({
    id: existUser._id,
    token: token,
    role: existUser.role,
    fullName: existUser.firstName + " " + existUser.lastName,
    message: "login successful",
  });
};

const getExams = async (req, res, next) => {
  const { id, role } = req.query;
  let existUser;
  if (role === "lecturer") {
    try {
      existUser = await User.findOne({ _id: id });
    } catch (err) {
      const error = new HttpError("Could not get User", 500);
      return next(error);
    }
    if (existUser) {
      let obj = existUser.listOfExams;
      res.json(obj);
    }
  } else {
    const allUsers = await User.find({});
    let allExams = [];
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].role === "lecturer") {
        allUsers[i].listOfExams.forEach((element) => {
          const obj = {
            examName: element.examName,
            date: element.date,
            lecturerName: element.lecturerName,
            beginningTime: element.beginningTime,
            totalTime: element.totalTime,
            questionsRandom: element.questionsRandom,
            questions: {
              question: element.question,
              option1: element.option1,
              option2: element.option2,
              option3: element.option3,
              option4: element.option4,
            },
            indexOfCorrectAnswer: element.indexOfCorrectAnswer,
            correctAnswer: element.correctAnswer,
            indexQuestion: element.indexQuestion,
            indexOfSelectedAnswer: element.indexOfSelectedAnswer,
            selectedAnswerString: element.selectedAnswerString,
            _id:element._id
          };
          allExams.push(obj);
        });
      }
    }
    return res.status(200).json(allExams);
  }
};

const getFullExam = async (req, res, next) => {
  const { idForStudent, idForExam } = req.query;
  let existExam;
  try {
    existExam = await Exam.findOne({idForStudent:idForStudent,idForExam:idForExam});
    }
     catch (err) {
    console.log(err);
  }
  if(existExam)
  {
    return res.json(existExam)
  }
};

const addExam = async (req, res, next) => {
  let strDate = "";
  let {
    examName,
    date,
    lecturerName,
    beginningTime,
    totalTime,
    questionsRandom,
    questions,
    idForUser,
  } = req.body;
 
  const changeExamName = CapitalizeTheFirstLetter(examName)
  examName = changeExamName;
  const changeLecturerName = CapitalizeTheFirstLetter(lecturerName)
  lecturerName = changeLecturerName;

  strDate += date.slice(8);
  strDate += date.slice(7, 8);
  strDate += date.slice(5, 8);
  strDate += date.slice(0, 4);
  date = strDate;
  const examinees = [];
  let existUser;
  try {
    existUser = await User.findOne({ _id: idForUser });
  } catch (err) {
    console.log(err);
    const error = new HttpError("adding exam failed, please try again", 500);
    return next(error);
  }
  if (existUser) {
    for (let i = 0; i < existUser.listOfExams.length; i++) {
      if (
        existUser.listOfExams[i].examName === examName &&
        existUser.listOfExams[i].date === date &&
        existUser.listOfExams[i].beginningTime === beginningTime
      ) 
      {
        return res.json({message : "A exam already exists"})
      }
    }
      const createdExam = {
        examName,
        date,
        lecturerName,
        beginningTime,
        totalTime,
        questionsRandom,
        questions,
        examinees,
      };
      existUser.listOfExams.push(createdExam);
  }
  try {
    await existUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("save exam failed, please try again", 500);
    return next(error);
  }
    return res.status(200).json({
      message:"Added Exam!"
   })
};

const deleteExam = async (req, res, next) => {
  const { idForExam, idForUser} = req.body;
  let existUser;
  try {
    existUser = await User.findOne({ _id: idForUser });
  } catch (err) {
    console.log(err);
    const error = new HttpError("not exist user", 500);
    return next(error);
  }
  if (existUser) {
    let index;
    for (let i = 0; i < existUser.listOfExams.length; i++) {
      if (existUser.listOfExams[i].id === idForExam) {
        index = i;
        break;
      }
    }
    existUser.listOfExams.splice(index, 1);
    await existUser.save();
  }
  res.status(200).json({
    message: "exam deleted successfully",
  });
};

const createQuestion = async (req, res, next) => {
  const data = req.body.data;
  let existUser;
  try {
    existUser = await User.findOne({ _id: data.idForUser });
  } catch (err) {
    console.log(err);
  }
  if (existUser) {
    for (let i = 0; i < existUser.listOfExams.length; i++) {
      if (String(existUser.listOfExams[i]._id) === data.idForExam) {
        const newQuestion = {
          question : data.question,
          option1 : data.option1,
          option2 : data.option2,
          option3 : data.option3,
          option4 : data.option4,
          indexOfCorrectAnswer : data.indexOfCorrectAnswer,
          correctAnswer : data.correctAnswer,
        };
        existUser.listOfExams[i].questions.push(newQuestion);
        break;
      }
    }
  }
  try{
    existUser.listOfExams.forEach(ele => {
      console.log(ele._id , data.idForExam)
      if (String(ele._id) === data.idForExam)
      {
          console.log(ele.questions)        
      }
    })
    await existUser.save();
    return res.status(200).json({
      message: "Added Question!",
    });
  }
  catch(err)
  {
    console.log(err)
  }

};

const deleteQuestion = async (req, res, next) => {
  const { idForExam, idQuestion, idForUser } = req.query;
  let existUser;
  try {
    existUser = await User.findById(idForUser);
  } catch (err) {
    console.log(err);
  }
  if (existUser) {
    let indexCurrentExam;    
    for (let i = 0; i < existUser.listOfExams.length; i++) {
      if(existUser.listOfExams[i].id === idForExam)
      {
            existUser.listOfExams[i].questions.forEach((element,index) => {
             if(String(element._id) === idQuestion)
             {
              indexCurrentExam = i;
             }
           }); 
      }   
    }
    const filteredQuestions = existUser.listOfExams[indexCurrentExam].questions.filter(
      (item) => item._id.toString() !== idQuestion
    );
    existUser.listOfExams[indexCurrentExam].questions = filteredQuestions;
    await existUser.save();
    res.status(200).json({
      message: "question deleted successfully",
    });
  }
};

const getQuestions = async (req,res,next)=> {
  const {idForExam,idForUser} = req.query;
 let existUser;
 try{
  existUser = await User.findOne({_id:idForUser})
 }
 catch(err)
 {
  console.log(err)
 }
 if(existUser)
 {
  for (let i = 0; i < existUser.listOfExams.length; i++) {
      if(String(existUser.listOfExams[i]._id) === idForExam)
      {
        if(existUser.listOfExams[i].questionsRandom)
        {
          const arrRandom = generateArray(existUser.listOfExams[i].questions);
          res.status(200).json({
          data : arrRandom,
          isRandom : existUser.listOfExams[i].questionsRandom,
      })
        }
        else
        {
          res.status(200).json({
            data : existUser.listOfExams[i].questions,
            isRandom : existUser.listOfExams[i].questionsRandom,
        })
        }
      }
  }
 }
}

const getExam = async (req,res,next) => {
  const {idForExam} = req.query;
  let existUser;
  try{
    existUser = await User.find({})
  }
  catch(err)
  {
    console.log(err)
  }
  if(existUser)
  {
    //update in the current user that this specific exam has been started...


    for (let i = 0; i < existUser.length; i++) {
     if(existUser[i].role === "lecturer")
     {
        existUser[i].listOfExams.forEach(item=> {
          if(String(item._id) === idForExam)
          {
            if(item.questionsRandom)
            {
             generateArray(item.questions);
              return res.json({examDetails:item})
            }
            return res.json({examDetails:item})
          }
        })
     }
    }
  }
  return res.status(401);
}

const sendAnswers = async(req,res,next)=> {
  const {answers,idForExam,idForUser,fullName,allQuestions} = req.body;
  let listOfErrors =[]
  let existUser;
  let grade;
  let newExam;
  try{
    existUser = await User.find({});
  }
  catch(err)
  {
      console.log(err)
      const error = new HttpError("No exam found", 500)
      return next(error);
  }
  if(existUser)
  {
      for (let i = 0; i < existUser.length; i++) {
          if(existUser[i].role === "lecturer")
          {
            existUser[i].listOfExams.forEach(element => {
              if(String(element.id) === idForExam)
              {
                newExam = {
                  examName : element.examName,
                  idForExam : element._id,
                  idForStudent : idForUser,
                  date : element.date,
                  lecturerName : element.lecturerName,
                  beginningTime : element.beginningTime,
                  totalTime : element.totalTime,
                  questionRandom:element.questionsRandom,
                  nameOfTheExaminee : fullName, 
                  grade : null,
                  questions : null,
              };
              }
            })
          }    
      }
      let arrQuestions = [];
      for (let i = 0; i < allQuestions.length; i++) {          
         let obj = {
              question : allQuestions[i].question,
              option1 : allQuestions[i].option1,
              option2 : allQuestions[i].option2,
              option3 : allQuestions[i].option3,
              option4 : allQuestions[i].option4,
              indexOfCorrectAnswer : allQuestions[i].indexOfCorrectAnswer,
              correctAnswer : allQuestions[i].correctAnswer,
              indexQuestion : answers[i]?.indexQuestion ? answers[i].indexQuestion : i,
              indexOfSelectedAnswer : answers[i]?.indexAnswer ? answers[i].indexAnswer : "no selected answer",
              selectedAnswerString : answers[i]?.selectedAnswerInString ? answers[i].selectedAnswerInString : "no selected answer",
          }
          arrQuestions.push(obj)
      }
      grade = getScore(allQuestions,answers,listOfErrors)
      newExam.grade = grade;
      newExam.questions = arrQuestions; 
      newExam.listOfErrors = listOfErrors;
      let createdExam = new Exam(newExam)
      try{
        await createdExam.save();
        return (res.status(200).json({message:"The Exam was successfully added"}));
      }
      catch(err){
        console.log(err)
      }

  }
//   if(existExam)
//   {
//   if(existExam.questionsRandom)
//   { 
//       try{
//           grade = getScore(allQuestions,answers,listOfErrors)
//           const newExaminee = {userId,userName,idForExam,grade,listOfErrors}
//           existExam.examinees.push(newExaminee);
//           await existExam.save();
//       }
//       catch(err)
//       {
//           console.log(err)
//       }
//   }
//   else
//   {
//       try{
//           grade = getScore(existExam.questions,answers,listOfErrors)
//           const newExaminee = {userId,userName,idForExam,grade,listOfErrors}
//           existExam.examinees.push(newExaminee);
//           await existExam.save();
//       }
//       catch(err)
//       {
//           console.log(err)
//       }
//   }
//   res.status(200).json({
//       message:listOfErrors,
//       grade:grade
//   })
//  }
}

const studentTookTest =  async(req,res,next)=> {
  const {idForStudent,idForExam} = req.query;
  let existUser
  try{
    existUser = await Exam.findOne({idForStudent:idForStudent,idForExam:idForExam})
    if(existUser)
    {
      return res.json({message:"true",grade:existUser.grade})
    }
  }
  catch(err)
  {
    console.log(err)
  }
  return res.json({message:"false"})
}
    

exports.signUp = signUp;
exports.signIn = signIn;
exports.getFullExam = getFullExam;
exports.getExams = getExams;
exports.addExam = addExam;
exports.deleteExam = deleteExam;
exports.createQuestion = createQuestion;
exports.deleteQuestion = deleteQuestion;
exports.getQuestions = getQuestions;
exports.getExam = getExam;
exports.sendAnswers = sendAnswers;
exports.studentTookTest = studentTookTest;