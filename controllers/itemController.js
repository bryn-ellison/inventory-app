const asyncHandler = require("express-async-handler");

const Item = require("../models/item");
const Brand = require("../models/brand");
const Category = require("../models/category");

const { body, validationResult } = require("express-validator");

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
  const [allBrands, allCategories] = await Promise.all([
    Brand.find().exec(),
    Category.find().exec(),
  ]);

  res.render("item_create_form", {
    title: "Create Item",
    brands: allBrands,
    categories: allCategories,
  });
});

// POST request for create item form
exports.sendCreateForm = [
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === "undefined") req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },

  body("item_name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("item_desc", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("stock", "Stock must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Stock must be number")
    .isNumeric(),
  body("category", "There must be at least one category selected.")
    .isArray({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.item_name,
      desc: req.body.item_desc,
      stock: req.body.stock,
      brand: req.body.brand,
      category: req.body.category,
    });

    if (!errors.isEmpty()) {
      const [allBrands, allCategories] = await Promise.all([
        Brand.find().exec(),
        Category.find().exec(),
      ]);

      for (const category of allCategories) {
        if (item.category.includes(category._id)) {
          category.checked = "true";
        }
      }

      res.render("item_create_form", {
        title: "Create Item",
        brands: allBrands,
        categories: allCategories,
        item: item,
        errors: errors.array(),
      });
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];

// GET request for delete item form
exports.deleteForm = asyncHandler(async (req, res, next) => {
  const itemData = await Item.findById(req.params.id);
  res.render("item_delete", {
    title: "Delete Item",
    item: itemData,
  });
});

// POST request for delete item form
exports.sendDeleteForm = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndRemove(req.body.itemid);
  res.redirect("/inventory/items");
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
    item_url: itemData.url,
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
