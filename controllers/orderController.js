import Razorpay from "razorpay";
import orders from "../models/orderModel.js";
import cart from "../models/cartModel.js";
import games from "../models/gameModel.js";

//Gateway initialization
export const order = async (req, res) => {
  try {
    const existingCart = await cart.findOne({ userId: req.user._id }).populate({
      path: "games.gameId",
      select: "name img rate desc category",
    });

    if (!existingCart) {
      return res.status(406).send({ message: "cart not found" });
    }

    const amount = existingCart?.games?.reduce(
      (total, item) => total + item.gameId.rate,
      0
    );

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    });

    const newOrder = new orders({
      userId: req.user._id,
      items: existingCart.games,
      amount,
      OrderId: razorpayOrder.id,
      isPaid: false,
      PaymentId: "",
    });

    await newOrder.save();

    res.status(200).send(razorpayOrder);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log(error);
  }
};

//After payment, user should be UPDATED about the order and CART should be emptied.
export const updateOrder = async (req, res) => {
  const { orderId, paymentId } = req.body;

  try {
    const updatedUser = await orders.findOneAndUpdate(
      { OrderId: orderId },
      { PaymentId: paymentId, isPaid: true },
      { new: true }
    );

    await cart.findOneAndUpdate({ userId: req.user._id }, { game: [] });

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log(error);
  }
};

//Get order
export const getOrder = async (req, res) => {
  try {
    const allOrders = await orders
      .find({ userId: req.user._id })
      .populate({ path: "items.gameId", select: "name desc img rate" });
    res.status(200).send(allOrders);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log(error);
  }
};

//Admin Get Order
export const adminGetOrder = async (req, res) => {
  try {
    const allOrders = await orders
      .find()
      .populate({ path: "items.gameId", select: "name desc img rate" })
      .populate({ path: "userId", select: "name email" });
    res.status(200).send(allOrders);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log(error);
  }
};

