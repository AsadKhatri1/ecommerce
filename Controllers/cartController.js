import { cartModel } from "../Models/cartModel.js";

// add to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, title, qty, price, imgSrc } = req.body;
    const userId = req.user;
    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      cart = new cartModel({ userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty;
      cart.items[itemIndex].price += price * qty;
    } else {
      cart.items.push({ productId, title, qty, price, imgSrc });
    }

    await cart.save();
    res.json({ message: "Item added to cart", cart });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// user specific cart
export const userCart = async (req, res) => {
  try {
    const userId = req.user;
    let cart = await cartModel.findOne({ userId });
    if (!cart) return res.json({ message: "Cart not found with this user id" });
    return res.json({ message: "user cart", cart });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// delete specific product from cart
export const removeProduct = async (req, res) => {
  try {
    const userId = req.user;
    const productId = req.params.productId;
    let cart = await cartModel.findOne({ userId });
    if (!cart) return res.json({ message: "Cart not found with this user id" });

    // removing using filters
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();
    return res.json({ message: "Product removed from cart", cart: cart.items });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// cart clearing

export const clearCart = async (req, res) => {
  try {
    const userId = req.user;

    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      cart = new cart({ userId, items: [] });
    } else {
      cart.items = [];
    }

    await cart.save();
    return res.json({ message: "cart is now cleared", cart });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// decrease qty from Cart
export const decreaseProudctQty = async (req, res) => {
  const { productId, qty } = req.body;

  const userId = req.user;

  let cart = await cartModel.findOne({ userId });

  if (!cart) {
    cart = new cartModel({ userId, items: [] });
    // return res.json({messge:'Cart not find'})
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    const item = cart.items[itemIndex];

    if (item.qty > qty) {
      const pricePerUnit = item.price / item.qty;

      item.qty -= qty;
      item.price -= pricePerUnit * qty;
    } else {
      cart.items.splice(itemIndex, 1);
    }
  } else {
    return res.json({ messge: "invalid product Id" });
  }

  await cart.save();
  res.json({ message: "Items qty decreased", cart });
};
