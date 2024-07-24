import express from "express";
import { addAddress, getAddress } from "../Controllers/addressController.js";
import { isAuthenticated } from "../Middlewears/auth.js";
const router = express.Router();

// address add
router.post("/add", isAuthenticated, addAddress);

// get single address
router.get("/get", isAuthenticated, getAddress);

export default router;
