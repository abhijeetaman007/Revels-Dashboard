const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["CULTURAL", "SPORTS", "SUPPORTING", "MISC"],
    },
  },
  { timestamps: true }
);

module.exports = Category = mongoose.model("Category", CategorySchema);
