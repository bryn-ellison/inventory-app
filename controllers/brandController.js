const asyncHandler = require("express-async-handler");

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
  res.send("Brand DETAIL PAGE");
});

// Display list of all categories
exports.brandList = asyncHandler(async (req, res, next) => {
  res.send("LIST OF ALL BRANDS");
});
