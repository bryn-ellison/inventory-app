const express = require("express");
const router = express.Router();

const item_controller = require("../controllers/itemController");
const category_controller = require("../controllers/categoryController");
const brand_controller = require("../controllers/brandController");

// ITEM ROUTES

// GET inventory homepage index.
router.get("/", item_controller.index);

// GET create item form.
router.get("/item/create", item_controller.createForm);

// POST create item form.
router.post("/item/create", item_controller.sendCreateForm);

// GET delete item form.
router.get("/item/:id/delete", item_controller.deleteForm);

// POST delete item form.
router.post("/item/:id/delete", item_controller.sendDeleteForm);

// GET update item form.
router.get("/item/:id/update", item_controller.updateForm);

// POST update item form.
router.post("/item/:id/update", item_controller.sendUpdateForm);

// GET individual item.
router.get("/item/:id", item_controller.itemDetail);

// GET list of all items.
router.get("/items", item_controller.itemList);

// CATEGORY ROUTES

// GET create category form.
router.get("/category/create", category_controller.createCategoryForm);

// POST create category form.
router.post("/category/create", category_controller.sendCreateCategoryForm);

// GET delete catgegory form.
router.get("/category/:id/delete", category_controller.deleteCategoryForm);

// POST delete category form.
router.post("/category/:id/delete", category_controller.sendDeleteCategoryForm);

// GET update category form.
router.get("/category/:id/update", category_controller.updateCategoryForm);

// POST update category form.
router.post("/category/:id/update", category_controller.sendUpdateCategoryForm);

// GET individual category.
router.get("/category/:id", category_controller.categoryDetail);

// GET list of all categories.
router.get("/categories", category_controller.categoryList);

// BRAND ROUTES

// GET create brand form.
router.get("/brand/create", brand_controller.createBrandForm);

// POST create brand form.
router.post("/brand/create", brand_controller.sendCreateBrandForm);

// GET delete brand form.
router.get("/brand/:id/delete", brand_controller.deleteBrandForm);

// POST delete brand form.
router.post("/brand/:id/delete", brand_controller.sendDeleteBrandForm);

// GET update brand form.
router.get("/brand/:id/update", brand_controller.updateBrandForm);

// POST update brand form.
router.post("/brand/:id/update", brand_controller.sendUpdateBrandForm);

// GET individual brand.
router.get("/brand/:id", brand_controller.brandDetail);

// GET list of all brands.
router.get("/brands", brand_controller.brandList);

module.exports = router;
