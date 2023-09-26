const asyncHandler = require("express-async-handler");

// Display homepage index of number of items and categories
exports.index = asyncHandler(async (req, res, next) => {
  res.send("INDEX PAGE WITH INVENTORY LIST");
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
  res.send("ITEM DETAIL PAGE");
});

// Display list of all items
exports.itemList = asyncHandler(async (req, res, next) => {
  res.send("LIST OF ALL ITEMS");
});
