import { addressModel } from "../Models/addressModel.js";

export const addAddress = async (req, res) => {
  try {
    const userId = req.user;
    const { fullname, address, city, country, pincode, phoneNumber, state } =
      req.body;
    let userAddress = await addressModel.create({
      userId,
      fullname,
      address,
      city,
      country,
      pincode,
      phoneNumber,
      state,
    });
    res.json({ message: "Address added", userAddress, success: true });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// getting single address

export const getAddress = async (req, res) => {
  let address = await addressModel
    .find({ userId: req.user })
    .sort({ createdAt: -1 });

  res.json({ message: "Address of specified user", address: address[0] });
};
