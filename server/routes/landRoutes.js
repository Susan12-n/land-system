const express = require("express");
const {
  createLand,
  getLands,
  updateLand,
  getLandById,
  deleteLand,
} = require("../controllers/landController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload"); // ✅ now using Cloudinary-based multer

const router = express.Router();

router.get("/", getLands);
router.get("/:id", getLandById);
router.post("/", authenticate, isAdmin, upload.array("images"), createLand);
router.put("/:id", authenticate, isAdmin, upload.array("images"), updateLand); // optional: allow updating images
router.delete("/:id", authenticate, isAdmin, deleteLand);

module.exports = router;
