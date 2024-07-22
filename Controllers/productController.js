import { productModel } from "../Models/productModel.js";

// creating product
export const addproduct = async (req, res) => {
  try {
    const { title, description, price, category, qty, imgSrc } = req.body;
    let product = await productModel.create({
      title,
      description,
      price,
      category,
      qty,
      imgSrc,
    });
    return res.json({ message: "Product added succesfully", product });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// getting all products

export const allProducts = async (req, res) => {
  try {
    const products = await productModel.find().sort({ createdAt: -1 });
    return res.json({ message: "All products", products });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// getting single product

export const singleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    return res.json({ message: "product", product });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// updating a product

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.json({ message: "product updated", product });
  } catch (err) {
    res.json({ message: err.message });
  }
};
// deleting a product

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findByIdAndDelete(id);
    return res.json({ message: "product deleted", product });
  } catch (err) {
    res.json({ message: err.message });
  }
};
