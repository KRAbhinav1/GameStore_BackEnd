import express from "express";
import {
  checkAuth,
  googleSignin,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import { protectRoute } from "../middleWares/authMiddleWare.js";
import { multerConfig } from "../middleWares/multerMiddleware.js";
import {
  addGame,
  deleteGame,
  editGame,
  getGames,
  getPublisherGames,
} from "../controllers/gameController.js";
import { addToCart, getFromCart } from "../controllers/cartController.js";
import {
  adminGetOrder,
  getOrder,
  order,
  updateOrder,
} from "../controllers/orderController.js";

export const router = new express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/add/product", protectRoute, multerConfig.single("img"), addGame);
router.get("/get/games", getGames);
router.get("/get/publisher/games", protectRoute, getPublisherGames);
router.put(
  "/games/edit/:id",
  protectRoute,
  multerConfig.single("img"),
  editGame
);
router.delete("/games/delete/:id", protectRoute, deleteGame);

router.post("/add/cart/:gameId", protectRoute, addToCart);
router.get("/get/games/cart", protectRoute, getFromCart);

router.get("/check", protectRoute, checkAuth);

// router.put("/users/edit/:id", updateUser);

router.post("/order/create", protectRoute, order);
router.put("/order/update", protectRoute, updateOrder);
router.get("/order/get", protectRoute, getOrder);
router.get("/admin/order/get", protectRoute, adminGetOrder);

router.post("/google/signin", googleSignin);
