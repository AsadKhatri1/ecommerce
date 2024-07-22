import { userModel } from "../Models/userModel.js";
import bcrypt from "bcryptjs";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.json({ message: "User already exists", success: false });
    }
    const salt = 10;

    const hashedPass = await bcrypt.hash(password, 10);
    let user = await userModel.create({ name, email, password: hashedPass });
    return res.json({ message: "User registered", success: true, user });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let userExists = await userModel.findOne({ email });
    if (!userExists) {
      return res.json({ message: "User does not exist", success: false });
    }
    const validPass = await bcrypt.compare(password, userExists.password);
    if (!validPass) {
      return res.json({ message: "Invalid credential", success: false });
    }
    res.json({ message: "Loggedin success", userExists, success: true });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
};

export const users = async (req, res) => {
  try {
    let users = await userModel.find().sort({ createdAt: -1 });
    return res.json({ users });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
};
