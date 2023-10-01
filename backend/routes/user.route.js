const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model"); // Import your user model


// Define routes here

// Register a new user
router.post("/register", async (req, res) => {
    try {
      const { name, email, password, category } = req.body;
      // Create a new user document in the database
      const newUser = new userModel({ name, email, password, category });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: "Registration failed" });
      console.log(error);
    }
  });
  
  // User login
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.query; // Access data from query parameters
      // Check if the user exists in the database
      const user = await userModel.find({ email });
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      // Validate the password
      if (user.password !== password) {
        return res.status(401).json({ error: "Invalid password" });
      }
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });
  

module.exports = router;