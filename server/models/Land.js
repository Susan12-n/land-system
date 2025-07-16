const mongoose =require("mongoose");

const landSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  images: [String], // image URLs
  createdAt: { type: Date, default: Date.now }
});

module.exports= mongoose.model("Land", landSchema);
