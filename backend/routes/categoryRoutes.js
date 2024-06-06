const express = require("express");
const { isAdmin } = require("../Controller/authController");
const {
  createCategoryController,
  updateCategoryController,
  getallCategoryController,
  singleCategoryController,
  deleteCategoryController,
} = require("../Controller/createCategoryController");
const { requireSignIn } = require("../middlewares/authMiddlewares");

const router = express.Router();

//routes
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
//update
router.put(
  "/update-category/:_id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
//getall category
router.get("/allcategory", getallCategoryController);

//single category
router.get("/singlecategory/:slug", singleCategoryController);

//delete category
router.put("/delete-category/:_id", deleteCategoryController);

module.exports = router;
