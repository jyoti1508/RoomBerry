import express from "express";
import protect from "../middleware/authMiddleware.js";
import { registerHotel } from "../controllers/hotelController.js";

const hotelRouter = express.Router();

hotelRouter.post("/register", protect, registerHotel);


hotelRouter.get("/test", (req, res) => {
  res.json({ msg: "route working" });
});

export default hotelRouter;
