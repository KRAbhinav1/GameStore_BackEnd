import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    items: [
      {
        gameId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "games",
        },
      },
    ],
    amount: Number,
    OrderId: String,
    PaymentId: String,
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const orders = mongoose.model("orders", orderSchema);

export default orders;
