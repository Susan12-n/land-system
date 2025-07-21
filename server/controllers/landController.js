const Land =require("../models/Land.js");

 const getLands = async (req, res) => {
  try {
    const { area, page = 1, limit = 6 } = req.query;

    // Search in the 'area' field 
    const query = area ? { area: { $regex: area, $options: "i" } } : {};

    const lands = await Land.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Land.countDocuments(query);

    res.json({ lands, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createLand = async (req, res) => {
  try {
    const { name, size, description, price, area, status } = req.body;

    // 1️⃣ Basic field validation
    if (!name || !size || !description || !price || !area || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check if images are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    // 3️⃣ Extract Cloudinary URLs from uploaded images
    const images = req.files.map((file) => file.path); // Cloudinary returns full URL in `file.path`

    // 4️⃣ Create and save new Land
    const land = new Land({
      name,
      size,
      description,
      price,
      area,
      status,
      images, // array of Cloudinary image URLs
    });

    await land.save();

    res.status(201).json({
      message: "Land posted successfully",
      land,
    });

  } catch (err) {
    console.error("Error posting land:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const updateLand = async (req, res) => {
  try {
    const land = await Land.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(land);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteLand = async (req, res) => {
  try {
    await Land.findByIdAndDelete(req.params.id);
    res.json({ message: "Land deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getLandById = async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    if (!land) return res.status(404).json({ message: "Land not found" });
    res.json(land);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getLands,deleteLand,getLandById,
  createLand,updateLand
};
