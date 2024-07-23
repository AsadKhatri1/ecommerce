import express from "express";
import {
  addToCart,
  clearCart,
  decreaseProudctQty,
  removeProduct,
  userCart,
} from "../Controllers/cartController.js";

const router = express.Router();

// add to cart
router.post("/add", addToCart);

// get specific user route

router.get("/usercart", userCart);

// remove specific product from cart

router.delete("/remove/:productId", removeProduct);
// clear cart

router.delete("/clear", clearCart);
// decrease item qty

router.post("/decreaseQty", decreaseProudctQty);
export default router;
