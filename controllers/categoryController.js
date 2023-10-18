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
  const [category, allItemsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name category"),
  ]);
  const itemsWithOnecategory = [];
  if (category === null) {
    res.redirect("/inventory/categories");
  }
  // create list of items in category that only have one category
  for (checkedCategory of allItemsByCategory) {
    console.log(checkedCategory.category.length);
    if (checkedCategory.category.length === 1) {
      itemsWithOnecategory.push(checkedCategory);
    }
  }

  res.render("category_delete", {
    title: "Delete category:",
    category: category,
    category_items: itemsWithOnecategory,
  });
});

// POST request for delete category form
exports.sendDeleteCategoryForm = asyncHandler(async (req, res, next) => {
  const [category, allItemsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name"),
  ]);

  // create list of items in category that only have one category
  const itemsWithOnecategory = [];
  for (checkedCategory of allItemsByCategory) {
    console.log(checkedCategory.category.length);
    if (checkedCategory.category.length === 1) {
      itemsWithOnecategory.push(checkedCategory);
    }
  }

  if (itemsWithOnecategory.length > 0) {
    res.render("category_delete", {
      title: "Delete category:",
      category: category,
      category_items: itemsWithOnecategory,
    });
    return;
  } else {
    await Category.findByIdAndRemove(req.body.categoryid);
    res.redirect("/inventory/categories");
  }
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
    category_url: categoryData.url,
    tent_list: itemsBycategory,
  });
});

// Display list of all categories
exports.categoryList = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, "name")
    .sort({ name: 1 })
    .exec();
  res.render("category_list", {
    title: "Categories",
    category_list: allCategories,
  });
});
