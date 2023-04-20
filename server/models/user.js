const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    role:{ type:String },
    listOfExams:[
      new Schema({
        idForExam: { type: String},
        examName: { type: String },
        date: { type: String },
        lecturerName:{ type:String },
        questions:[
          new Schema({
            question:String,
            option1:String,
            option2:String,
            option3:String,
            option4:String,
            indexOfCorrectAnswer:String,
            correctAnswer:String,
            indexQuestion:String,
            indexOfSelectedAnswer:String,
            selectedAnswerString:String,
          })
      ],
      grade:{ type:String},
      })
    ],
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6, select: false },
  },
  {
    timestamps: true,
  }
);

module.exports = model("allUsers", userSchema);
