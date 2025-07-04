import cart from "../models/cartModel.js";
import games from "../models/gameModel.js";

//Add to cart
export const addToCart = async (req, res) => {
  const { gameId } = req.params;
  const userId = req.user._id;

  try {
    const existingCart = await cart.findOne({ userId });
    if (!existingCart) {
      const newCart = new cart({
        userId,
        games: [{ gameId }],
      });
      await newCart.save();
      res.status(201).send(newCart);
    } else {
      const existingGame = existingCart.games.find(
        (g) => g.gameId.toString() === gameId.toString()
      );
      console.log(existingGame);
      if (existingGame) {
        return res.status(400).send({ message: "Already added" });
      }
      existingCart.games.push({ gameId });
      await existingCart.save();
      res.status(201).send(existingCart);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
};

//Get from cart
export const getFromCart = async (req, res) => {
  try {
    const allCartGames = await cart.findOne({ userId: req.user._id }).populate({
      path: "games.gameId",
      select: "name img rate desc category",
    });
    res.status(200).send(allCartGames);
  } catch (error) {
    res.status(500).send("Internal server error");
    console.log(error);
  }
};
