import jwt from "jsonwebtoken";
import { userModel } from "../Models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.header("Auth");
  if (!token) {
    return res.json({ message: "Login first" });
  }
  //   ?token verification
  const decoded = jwt.verify(token, "@$%^&^9320940349");

  const id = decoded.userId;
  let user = await userModel.findById(id);
  if (!user) return res.json({ message: "User doesnot exist" });
  req.user = user;
  next();
};
