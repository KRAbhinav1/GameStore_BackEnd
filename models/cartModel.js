import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  games: [
    {
      gameId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "games",
      },
    },
  ],
});
const cart = mongoose.model("cart", cartSchema);
export default cart;
