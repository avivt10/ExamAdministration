const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    role:{ type:String },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6, select: false },
  },
  {
    timestamps: true,
  }
);

module.exports = model("allUsers", userSchema);
