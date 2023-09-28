const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const Item = require("../models/item");

// GET request for create category form
exports.createCategoryForm = asyncHandler(async (req, res, next) => {
  res.send("CREATE category FORM GET REQ");
});

// POST request for create category form
exports.sendCreateCategoryForm = asyncHandler(async (req, res, next) => {
  es.send("CREATE category FORM POST REQ");
});

// GET request for delete category form
exports.deleteCategoryForm = asyncHandler(async (req, res, next) => {
  res.send("DELETE category FORM GET REQ");
});

// POST request for delete category form
exports.sendDeleteCategoryForm = asyncHandler(async (req, res, next) => {
  res.send("DELETE category FORM POST REQ");
});

// GET request for update category form
exports.updateCategoryForm = asyncHandler(async (req, res, next) => {
  res.send("UPDATE category FORM GET REQ");
});

// POST request for update category form
exports.sendUpdateCategoryForm = asyncHandler(async (req, res, next) => {
  res.send("UPDATE category FORM POST REQ");
});

// Display category detail
exports.categoryDetail = asyncHandler(async (req, res, next) => {
  const [categoryData, itemsBycategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name").exec(),
  ]);

  if (categoryData === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    title: categoryData.name,
    description: categoryData.desc,
    tent_list: itemsBycategory,
  });
});

// Display list of all categories
exports.categoryList = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, "name").exec();
  res.render("category_list", {
    title: "Categories",
    category_list: allCategories,
  });
});
