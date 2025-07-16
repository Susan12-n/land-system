const express =require("express");
const multer =require( "multer");
const { createLand, getLands, updateLand, deleteLand }=require( "../controllers/landController.js");
const { authenticate, isAdmin } =require( "../middleware/authMiddleware.js");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", getLands);
router.post("/", authenticate, isAdmin, upload.array("images", 5), createLand);
router.put("/:id", authenticate, isAdmin, updateLand);
router.delete("/:id", authenticate, isAdmin, deleteLand);

module.exports= router;
