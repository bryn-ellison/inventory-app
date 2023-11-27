const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  desc: { type: String, required: true, maxLength: 1000 },
  image: { type: String },
});

// Virtual for brand's URL
BrandSchema.virtual("url").get(function () {
  return `/inventory/brand/${this._id}`;
});

// Virtual for brand's image URL
BrandSchema.virtual("brandImage").get(function () {
  return `/images/${this.image}`;
});

// Export model
module.exports = mongoose.model("Brand", BrandSchema);
