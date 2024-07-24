import express from "express";
import {
  addToCart,
  clearCart,
  decreaseProudctQty,
  removeProduct,
  userCart,
} from "../Controllers/cartController.js";
import { isAuthenticated } from "../Middlewears/auth.js";
const router = express.Router();

// add to cart
router.post("/add", isAuthenticated, addToCart);

// get specific user route

router.get("/usercart", isAuthenticated, userCart);

// remove specific product from cart

router.delete("/remove/:productId", isAuthenticated, removeProduct);
// clear cart

router.delete("/clear", isAuthenticated, clearCart);
// decrease item qty

router.post("/decreaseQty", isAuthenticated, decreaseProudctQty);
export default router;
