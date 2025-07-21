const express =require("express");
const multer =require( "multer");
const { createLand, getLands, updateLand,getLandById , deleteLand }=require( "../controllers/landController.js");
const { authenticate, isAdmin } =require( "../middleware/authMiddleware.js");
const upload = require("../middleware/upload");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = require("../middleware/upload");

router.get("/", getLands);
router.get("/:id", getLandById);
router.post("/", authenticate, isAdmin, upload.array("images"), createLand);
router.put("/:id", authenticate, isAdmin, updateLand);
router.delete("/:id", authenticate, isAdmin, deleteLand);

module.exports= router;
