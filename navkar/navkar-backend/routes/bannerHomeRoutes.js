const express = require("express");
const mongoose = require("mongoose");
const bannerHome = require("../models/BannerHome.js");
const router = express.Router();
// create or update
router.post("/banner", async (req, res) => {
  try {
    const { id, images } = req.body;
    if (!id || !images || !Array.isArray(images)) {
      return res.status(400).json({ message: "id and images are required" });
    }
    const updatedBanner = await bannerHome.findOneAndUpdate(
      { id },
      { images, createdAt: new Date() },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedBanner);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
// get
router.get("/banners", async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Banner id is required" });
    }

    const banner = await bannerHome.findOne({ id });

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json(banner);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


module.exports = router;
