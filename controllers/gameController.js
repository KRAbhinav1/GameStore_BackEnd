import games from "../models/gameModel.js";

export const addGame = async (req, res) => {
  //Add game
  const userId = req.user._id;
  const { name, desc, rate, category } = req.body;
  const img = req.file.filename;
  

  try {
    if (!name || !desc || !rate || !category || !img || !userId) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newgame = new games({
      name,
      desc,
      img,
      rate,
      category,
      userId,  
    });

    await newgame.save();
    res.status(201).send(newgame);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
};

//Get games from MongoDb and display all games to frontend
export const getGames = async (req, res) => {
  try {
    const allGames = await games.find();
    res.status(200).send(allGames);
  } catch (error) {
    res.status(200).send({ message: "Internal server error" });
    console.log(error);
  }
};

//Get publisher games from database and display publisher games on their dashboard
export const getPublisherGames = async (req, res) => {
  try {
    const publisherGames = await games.find({ userId: req.user._id });
    res.status(200).send(publisherGames);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log(error);
  }
};

