const asyncHandler = require("express-async-handler");

const Category = require("../models/category");
const Item = require("../models/item");

const { body, validationResult } = require("express-validator");

// GET request for create category form
exports.createCategoryForm = asyncHandler(async (req, res, next) => {
  res.render("category_create_form", { title: "Create category" });
});

// POST request for create category form
exports.sendCreateCategoryForm = [
  body("category_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Category name must be specified."),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.category_name,
    });

    if (!errors.isEmpty()) {
      res.render("category_create_form", {
        title: "Create category",
        category: category,
      });
      return;
    } else {
      await category.save();
      res.redirect(category.url);
    }
  }),
];

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
