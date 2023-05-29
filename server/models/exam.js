const { Schema, model } = require("mongoose");

const examSchema = new Schema(
  {
    examName: { type: String },
    idForExam: { type: String },
    idForStudent: { type: String },
    date: { type: String },
    lecturerName: { type: String },
    beginningTime: { type: String },
    totalTime: { type: String },
    questionRandom: { type : String},
    nameOfTheExaminee: String,
    grade: String,
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
    listOfErrors: [
      new Schema({
        question: String,
        wrongAnswer: String,
        correctAnswer: String,
      }),
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("allExams", examSchema);

// const { Schema, model } = require("mongoose");

// const examSchema = new Schema(
//   {
//     IdForExam : { type: String},
//     examName: { type: String },
//     date: { type: String },
//     lecturerName:{ type:String },
//     beginningTime: { type: String},
//     totalTime: { type: String },
//     questionsRandom : {type : Boolean},
//     questions:[
//         new Schema({
//           question:String,
//           option1:String,
//           option2:String,
//           option3:String,
//           option4:String,
//           indexOfCorrectAnswer:String,
//           correctAnswer:String,
//         })
//     ],
//     examinees:[
//       new Schema({
//         userId:String,
//         userName:String,
//         grade:String,
//         listOfErrors:[
//           new Schema({
//             question:String,
//             wrongAnswer:String,
//             correctAnswer:String
//           })
//         ]
//       })
//     ]
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = model("allExams", examSchema);
