const express = require("express");
const router = express.Router();
const promptModel = require("../models/prompt.model"); // Import your prompt model

// Add a new prompt
router.post("/add", async (req, res) => {
  try {
    const { userID, content } = req.body;
    // Create a new prompt document in the database
    const newPrompt = new promptModel({ userID, content });
    await newPrompt.save();
    res.status(201).json({ message: "Prompt added successfully", prompt: newPrompt });
  } catch (error) {
    res.status(500).json({ error: "Failed to add prompt" });
  }
});

// Get all prompts
router.get("/get", async (req, res) => {
  try {
    const prompts = await promptModel.find();
    res.status(200).json({ prompts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
});

// Get a specific prompt by ID
router.get("/get/:promptID", async (req, res) => {
  const { promptID } = req.params;
  try {
    const prompt = await promptModel.findById(promptID);
    if (!prompt) {
      return res.status(404).json({ error: "Prompt not found" });
    }
    res.status(200).json({ prompt });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prompt" });
  }
});

// Update a specific prompt by ID
router.patch("/update/:promptID", async (req, res) => {
  const { promptID } = req.params;
  try {
    const updatedPrompt = await promptModel.findByIdAndUpdate(promptID, req.body, {
      new: true, // Return the updated prompt
    });
    if (!updatedPrompt) {
      return res.status(404).json({ error: "Prompt not found" });
    }
    res.status(200).json({ message: "Prompt updated successfully", prompt: updatedPrompt });
  } catch (error) {
    res.status(500).json({ error: "Failed to update prompt" });
  }
});

// Delete a specific prompt by ID
router.delete("/delete/:promptID", async (req, res) => {
  const { promptID } = req.params;
  try {
    const deletedPrompt = await promptModel.findByIdAndRemove(promptID);
    if (!deletedPrompt) {
      return res.status(404).json({ error: "Prompt not found" });
    }
    res.status(200).json({ message: "Prompt deleted successfully", prompt: deletedPrompt });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete prompt" });
  }
});

module.exports = router;
