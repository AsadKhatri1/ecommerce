import { cartModel } from "../Models/cartModel.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, title, qty, price, imgSrc } = req.body;
    const userId = "669e311db038ed4eb28e41f6";
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
