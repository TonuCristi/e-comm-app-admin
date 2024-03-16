import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a name"],
      minlength: [6, "Minimum name length is 6 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
    role: {
      type: String,
      required: [true, "Please enter a role"],
    },
  },
  { timestamps: true }
);

// fire function after doc saved to db
userSchema.post("save", function (doc, next) {
  console.log("New user was created and saved", doc);
  next();
});

// fire function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = mongoose.model("User", userSchema);
