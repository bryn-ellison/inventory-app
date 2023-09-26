const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 1000 },
});

// Virtual for author's URL
BrandSchema.virtual("url").get(function () {
  return `/inventory/brand/${this._id}`;
});

// Export model
module.exports = mongoose.model("Brand", BrandSchema);
