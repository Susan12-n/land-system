const mongoose = require("mongoose");

const landSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  area: String,
   size: {
      type: String,
      required: true,
    },
  status: {
    type: String,
    enum: ["Available", "Sold"],
    default: "Available",
  },
  images: [String], // image URLs
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Land", landSchema);
