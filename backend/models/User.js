const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (receivedPassword) {
  console.log("check receivedPassword ", receivedPassword);
  return await bcrypt.compare(receivedPassword, this.password);
};


module.exports = mongoose.model("User", userSchema);