const { Schema, model } = require("mongoose");

const examSchema = new Schema(
  {
    examName: { type: String },
    date: { type: String },
    lecturerName:{ type:String },
    beginningTime: { type: String},
    totalTime: { type: String },
    questions:[
        new Schema({
          question:String,
          option1:String,
          option2:String,
          option3:String,
          option4:String,
          indexOfRightAnswer:String
        })
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("allExams", examSchema);
