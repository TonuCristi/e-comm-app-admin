import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// static signup method
userSchema.statics.signup = async function (newUser) {
  const { username, email, password, role } = newUser;

  // username validation
  if (!username) throw new Error("Please enter a name!");
  if (username.length < 6)
    throw new Error("Minimum name length is 6 characters!");

  // email validation
  const exists = await this.findOne({ email });
  if (!email) throw new Error("Please enter an email!");
  if (!validator.isEmail(email)) throw new Error("Please enter a valid email!");
  if (exists) throw new Error("This email is already taken!");

  // password validation
  if (!password) throw new Error("Please enter a password!");
  if (!validator.isStrongPassword(password))
    throw new Error("Password not strong enough!");

  // role validation
  if (!role) throw new Error("Please enter a role!");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash, role });

  return user;
};

// static login method
userSchema.statics.login = async function (loggedUser) {
  const { email, password } = loggedUser;

  // email validation
  if (!email) throw new Error("Please enter an email!");

  // password validation
  if (!password) throw new Error("Please enter a password!");

  const user = await this.findOne({ email });

  if (!user) throw new Error("Incorrect email!");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new Error("Incorrect password!");

  return user;
};

// static change password method
userSchema.statics.changePassword = async function (id, password) {
  if (!password) throw new Error("Please enter a password!");

  if (!validator.isStrongPassword(password))
    throw new Error("Password not strong enough!");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.findByIdAndUpdate(id, { password: hash });

  return hash;
};

export const User = mongoose.model("User", userSchema);
