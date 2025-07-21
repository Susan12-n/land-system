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

// ✅ Serve uploaded images (only works if you're storing images locally — not Cloudinary)
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/lands", landRoutes);

// ✅ MongoDB connection and dynamic port binding
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
