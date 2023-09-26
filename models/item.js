const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 1000 },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  stock: { type: Number, required: true },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
});

// Virtual for items's URL
ItemSchema.virtual("url").get(function () {
  return `/inventory/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);
