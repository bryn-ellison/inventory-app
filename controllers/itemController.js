const asyncHandler = require("express-async-handler");

const Item = require("../models/item");
const Brand = require("../models/brand");
const Category = require("../models/category");

// Display homepage index of number of items and categories
exports.index = asyncHandler(async (req, res, next) => {
  const [numItems, numCategories, numBrands] = await Promise.all([
    Item.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
    Brand.countDocuments({}).exec(),
  ]);
  res.render("index", {
    title: "Lakeview Tents Inventory",
    tent_count: numItems,
    category_count: numCategories,
    brand_count: numBrands,
  });
});

// GET request for create item form
exports.createForm = asyncHandler(async (req, res, next) => {
  res.send("CREATE ITEM FORM GET REQ");
});

// POST request for create item form
exports.sendCreateForm = asyncHandler(async (req, res, next) => {
  res.send("CREATE ITEM FORM POST REQ");
});

// GET request for delete item form
exports.deleteForm = asyncHandler(async (req, res, next) => {
  res.send("DELETE ITEM FORM GET REQ");
});

// POST request for delete item form
exports.sendDeleteForm = asyncHandler(async (req, res, next) => {
  res.send("DELETE ITEM FORM POST REQ");
});

// GET request for update item form
exports.updateForm = asyncHandler(async (req, res, next) => {
  res.send("UPDATE ITEM FORM GET REQ");
});

// POST request for update item form
exports.sendUpdateForm = asyncHandler(async (req, res, next) => {
  res.send("UPDATE ITEM FORM POST REQ");
});

// Display item detail
exports.itemDetail = asyncHandler(async (req, res, next) => {
  const itemData = await Item.findById(req.params.id)
    .populate("category")
    .populate("brand")
    .exec();

  if (itemData === null) {
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }
  console.log(itemData.category);
  res.render("item_detail", {
    title: itemData.name,
    description: itemData.desc,
    categories: itemData.category,
    stock: itemData.stock,
    brand: itemData.brand,
  });
});

// Display list of all items
exports.itemList = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "name stock brand")
    .sort({ name: 1 })
    .populate("brand")
    .exec();
  res.render("item_list", { title: "All tents", tent_list: allItems });
});
