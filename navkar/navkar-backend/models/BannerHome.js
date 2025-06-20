const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  id: { type: String, required: true,unique:true },

  images: [
    {
      url: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BannerHome", bannerSchema);
