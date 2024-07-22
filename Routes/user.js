import express from "express";
import { login, register, users } from "../Controllers/userController.js";
const router = express.Router();

// register a user
router.post("/register", register);
// login a user
router.post("/login", login);
// all users
router.get("/users", users);

export default router;
