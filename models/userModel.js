const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Passoword is required"],
    unique: [true, "Email is already taken"],
  },
  password: {
    type: String,
    required: [true, "Passoword is required"],
  },
},
{
    timestamps: true
});
module.exports = mongoose.model("users",userSchema)
