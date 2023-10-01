const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4, // Use uuidv4 to generate a unique ID
        unique: true,   // Ensure uniqueness of the generated ID
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
