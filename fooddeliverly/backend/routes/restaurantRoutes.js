import express from "express";
import Restaurant from "../models/restaurant.js";

const router = express.Router();

// GET Fetch all restaurants in our db
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}, "name cuisine address");
    res.json(restaurants);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching restaurants", error: error.message });
  }
});

// GET Single Restaurant using id
router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching restaurant", error: error.message });
  }
});

// GET This route gets single Restaurant Menu (e.g Hot Restaurant menu)
router.get("/:id/menu", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id, "menu");
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant.menu);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching menu", error: error.message });
  }
});

export default router;
