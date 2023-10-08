const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "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",
});

// Generate a prompt using GPT-4
router.post("/generate", async (req, res) => {
  try {
    const { userPrompt } = req.body;

    // Make the completion request to GPT-4 using the initialized openai client
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `create prompt for the ${userPrompt}`,
      max_tokens: 30,
    });

    // Extract the generated text from the response
    const generatedPrompt = response.choices[0].text;
    console.log(generatedPrompt);

    res.status(200).json({ generatedPrompt });
  } catch (error) {
    console.error("Error generating prompt:", error);
    res.status(500).json({ error: "Prompt generation failed" });
  }
});

module.exports = router;
