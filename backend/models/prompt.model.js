const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const promptSchema = new mongoose.Schema({
    promptID: {
        type: String,
        default: uuidv4, // Use uuidv4 to generate a unique ID
        unique: true,   // Ensure uniqueness of the generated ID
    },
    userID: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const promptModel = mongoose.model("prompt", promptSchema);

module.exports = promptModel;
