// seedDatabase.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Restaurant from "./models/restaurant.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const seedRestaurants = [
  {
    name: "Burger Palace",
    cuisine: "American",
    address: "123 Main St",
    menu: [
      {
        name: "Classic Burger",
        description: "Juicy beef patty with lettuce and tomato",
        price: 9.99,
      },
      {
        name: "Cheeseburger",
        description: "Classic burger with melted cheese",
        price: 10.99,
      },
      { name: "Fries", description: "Crispy golden fries", price: 3.99 },
    ],
  },
  {
    name: "Pizza Heaven",
    cuisine: "Italian",
    address: "456 Elm St",
    menu: [
      {
        name: "Margherita Pizza",
        description: "Classic tomato and mozzarella",
        price: 12.99,
      },
      {
        name: "Pepperoni Pizza",
        description: "Margherita with pepperoni",
        price: 14.99,
      },
      {
        name: "Garlic Bread",
        description: "Toasted bread with garlic butter",
        price: 4.99,
      },
    ],
  },
  {
    name: "Sushi Express",
    cuisine: "Japanese",
    address: "789 Oak St",
    menu: [
      {
        name: "California Roll",
        description: "Crab, avocado, and cucumber",
        price: 8.99,
      },
      {
        name: "Salmon Nigiri",
        description: "Fresh salmon on rice",
        price: 6.99,
      },
      {
        name: "Miso Soup",
        description: "Traditional Japanese soup",
        price: 2.99,
      },
    ],
  },
];

async function seedDatabase() {
  try {
    await Restaurant.deleteMany({});
    await Restaurant.insertMany(seedRestaurants);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
