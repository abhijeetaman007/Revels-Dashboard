const mongoose = require("mongoose");
const RoleSchema = new mongoose.Schema(
  {
    //0 - Misc/Individual Admin ; 1 - Category Admins
    type: {
      default: 0,
      enum: [0, 1],
      type: Number,
    },
    // 0 - User Roles;
    // 1 - Category Read Only; 2 - Category Read/Write; 3 - Category SuperAdmin;
    // 4 - SuperAdmin
    // For Judges Role - 3
    accessLevel: {
      type: Number,
      default: 0,
    },
    // AccessLevel-0: - null
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = Role = mongoose.model("Role", RoleSchema);
