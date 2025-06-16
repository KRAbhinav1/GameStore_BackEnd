import express from "express";
import {
  checkAuth,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import { protectRoute } from "../middleWares/authMiddleWare.js";
import { multerConfig } from "../middleWares/multerMiddleware.js";
import {
  addGame,
  getGames,
  getPublisherGames,
} from "../controllers/gameController.js";

export const router = new express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/add/product", protectRoute, multerConfig.single("img"), addGame);

router.get("/check", protectRoute, checkAuth);

router.get("/get/games", getGames);
router.get("/get/publisher/games",protectRoute, getPublisherGames);
