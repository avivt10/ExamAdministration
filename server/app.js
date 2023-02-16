const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const usersRoutes = require("./routes/users-routes")
const examsRoutes = require("./routes/exams-routes")
const HttpError = require("./models/http-error");
const app = express();
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "PUT,GET, POST, PATCH, DELETE");
    next();
  });


  app.use(express.static('public'))

  app.use('/api/users',usersRoutes);

  app.use("/api/exams",examsRoutes)

  app.use((req,res,next) =>{
    const error = new HttpError('Could not find this route.',404)
    throw error
})

  mongoose.connect(`mongodb+srv://aviv:1234@cluster0.mrnkary.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
    app.listen(2022)
}).catch(err=>{
    console.log(err)
})

