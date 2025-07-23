const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const landRoutes = require("./routes/landRoutes");

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "https://land-system.vercel.app", // ✅ Replace with your frontend domain
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images (only works if you're storing images locally — not Cloudinary)
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//  API routes
app.use("/api/auth", authRoutes);
app.use("/api/lands", landRoutes);

//  MongoDB connection and dynamic port binding
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected");

    const PORT = process.env.PORT || 10000; // Render sets PORT env variable
    app.listen(PORT, "0.0.0.0", () => { // Listen on all interfaces
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
  });
// ...existing code...
