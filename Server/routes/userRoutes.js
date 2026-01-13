import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getUserData,
  storeRecentSearchCities,
} from "../controllers/userController.js";

import User from "../models/User.js";

const router = express.Router();

router.post("/sync-user", async (req, res) => {
  try {
    const { clerkId, email, name, image } = req.body;

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = await User.create({
        clerkId,
        email,
        username: name,
        image,
      });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Sync failed" });
  }
});

router.get("/", protect, getUserData);
router.post("/store-recent-search", protect, storeRecentSearchCities);

export default router;
