const asyncHandler = require("express-async-handler");

const Brand = require("../models/brand");
const Item = require("../models/item");

// GET request for create Brand form
exports.createBrandForm = asyncHandler(async (req, res, next) => {
  res.send("CREATE Brand FORM GET REQ");
});

// POST request for create Brand form
exports.sendCreateBrandForm = asyncHandler(async (req, res, next) => {
  es.send("CREATE Brand FORM POST REQ");
});

// GET request for delete Brand form
exports.deleteBrandForm = asyncHandler(async (req, res, next) => {
  res.send("DELETE Brand FORM GET REQ");
});

// POST request for delete Brand form
exports.sendDeleteBrandForm = asyncHandler(async (req, res, next) => {
  res.send("DELETE Brand FORM POST REQ");
});

// GET request for update Brand form
exports.updateBrandForm = asyncHandler(async (req, res, next) => {
  res.send("UPDATE Brand FORM GET REQ");
});

// POST request for update Brand form
exports.sendUpdateBrandForm = asyncHandler(async (req, res, next) => {
  res.send("UPDATE Brand FORM POST REQ");
});

// Display Brand detail
exports.brandDetail = asyncHandler(async (req, res, next) => {
  const [brandData, itemsByBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Item.find({ brand: req.params.id }, "name").exec(),
  ]);

  if (brandData === null) {
    const err = new Error("Brand not found");
    err.status = 404;
    return next(err);
  }

  res.render("brand_detail", {
    title: brandData.name,
    description: brandData.desc,
    tent_list: itemsByBrand,
  });
});

// Display list of all categories
exports.brandList = asyncHandler(async (req, res, next) => {
  const allBrands = await Brand.find({}, "name").sort({ name: 1 }).exec();
  res.render("brand_list", { title: "Brands", brand_list: allBrands });
});
