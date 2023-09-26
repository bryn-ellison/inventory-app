const asyncHandler = require("express-async-handler");

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
  res.send("CATEGORY DETAIL PAGE");
});

// Display list of all categories
exports.categoryList = asyncHandler(async (req, res, next) => {
  res.send("LIST OF ALL CATEGORIES");
});
