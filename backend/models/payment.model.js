const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const paymentSchema = new mongoose.Schema({
    paymentID: {
        type: String,
        default: uuidv4, // Use uuidv4 to generate a unique ID
        unique: true,   // Ensure uniqueness of the generated ID
    },
    userID: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        require: true
    },
    date: {
        type: String,
        required: true
    }
});

const paymentModel = mongoose.model("payment", paymentSchema);

module.exports = paymentModel;
