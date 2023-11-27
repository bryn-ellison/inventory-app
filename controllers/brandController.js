const asyncHandler = require("express-async-handler");
const multer = require("multer");
const Brand = require("../models/brand");
const Item = require("../models/item");

const { body, validationResult } = require("express-validator");

// Setup multer storage for file upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// GET request for create Brand form
exports.createBrandForm = asyncHandler(async (req, res, next) => {
  res.render("brand_create_form", { title: "Create brand" });
});

// POST request for create Brand form
exports.sendCreateBrandForm = [
  upload.single("brand_image"),

  body("brand_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Brand name must be specified."),
  body("brand_desc")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Brand description must be specified"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const brand = new Brand({
      name: req.body.brand_name,
      desc: req.body.brand_desc,
      image: req.file ? req.file.filename : null,
    });

    if (!errors.isEmpty()) {
      res.render("brand_create_form", {
        title: "Create brand",
        brand: brand,
      });
      return;
    } else {
      await brand.save();
      res.redirect(brand.url);
    }
  }),
];

// GET request for delete Brand form
exports.deleteBrandForm = asyncHandler(async (req, res, next) => {
  const [brand, allItemsByBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Item.find({ brand: req.params.id }, "name"),
  ]);
  if (brand === null) {
    res.redirect("/inventory/brands");
  }

  res.render("brand_delete", {
    title: "Delete Brand",
    brand: brand,
    brand_items: allItemsByBrand,
  });
});

// POST request for delete Brand form
exports.sendDeleteBrandForm = asyncHandler(async (req, res, next) => {
  const [brand, allItemsByBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Item.find({ brand: req.params.id }, "name"),
  ]);

  if (allItemsByBrand.length > 0) {
    res.render("brand_delete", {
      title: "Delete Brand",
      brand: brand,
      brand_items: allItemsByBrand,
    });
    return;
  } else {
    await Brand.findByIdAndRemove(req.body.brandid);
    res.redirect("/inventory/brands");
  }
});

// GET request for update Brand form
exports.updateBrandForm = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id).exec();
  res.render("brand_create_form", { title: "Update brand", brand: brand });
});

// POST request for update Brand form
exports.sendUpdateBrandForm = [
  upload.single("brand_image"),

  body("brand_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Brand name must be specified."),
  body("brand_desc")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Brand description must be specified"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const brand = new Brand({
      name: req.body.brand_name,
      desc: req.body.brand_desc,
      _id: req.params.id,
      image: req.file ? req.file.filename : null,
    });

    if (!errors.isEmpty()) {
      res.render("brand_create_form", {
        title: "Update brand",
        brand: brand,
      });
      return;
    } else {
      const updatedBrand = await Brand.findByIdAndUpdate(
        req.params.id,
        brand,
        {}
      );
      res.redirect(updatedBrand.url);
    }
  }),
];

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
  console.log(brandData.brandImage);
  res.render("brand_detail", {
    title: brandData.name,
    brand: brandData,
    tent_list: itemsByBrand,
  });
});

// Display list of all categories
exports.brandList = asyncHandler(async (req, res, next) => {
  const allBrands = await Brand.find({}, "name").sort({ name: 1 }).exec();
  res.render("brand_list", { title: "Brands", brand_list: allBrands });
});
