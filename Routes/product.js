import express from "express";
import {
  addproduct,
  allProducts,
  deleteProduct,
  singleProduct,
  updateProduct,
} from "../Controllers/productController.js";

const router = express.Router();

// creating a product
router.post("/add", addproduct);
// getting all prods
router.get("/products", allProducts);
// getting single product
router.get("/:id", singleProduct);
// updating single product
router.put("/:id", updateProduct);
// deleting single product
router.delete("/:id", deleteProduct);

export default router;
