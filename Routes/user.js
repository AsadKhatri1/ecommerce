import express from "express";
import {
  login,
  register,
  users,
  profile,
} from "../Controllers/userController.js";

import { isAuthenticated } from "../Middlewears/auth.js";
const router = express.Router();

// register a user
router.post("/register", register);
// login a user
router.post("/login", login);
// all users
router.get("/users", users);
//user profile
router.get("/profile", isAuthenticated, profile);

export default router;
