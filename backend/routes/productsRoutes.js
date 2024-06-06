const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const { requireSignIn } = require("../middlewares/authMiddlewares");
const { isAdmin } = require("../Controller/authController");
const {
  createProductController,
  getProductController,
  getsingleProductController,
  getPhotoProductController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountForPagination,
  productCountBasedOnPage,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController,
} = require("../Controller/createProductController");

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//updatae product
router.put(
  "/update-product/:_id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
//get all product
router.get("/get-product", getProductController);

//single product
router.get("/single-product/:slug", getsingleProductController);

//get product Photo
router.get("/photo-product/:_id", getPhotoProductController);

//delete Product
router.delete("/delete-product/:_id", deleteProductController);

//filter Product
router.post("/product-filters", productFiltersController);

//Product Count based on count
router.get("/product-count", productCountForPagination);

//Product Per Page
router.get("/product-list/:page", productCountBasedOnPage);

//search product
router.get("/search/:keyword", searchProductController);

//similar Products
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise Product
router.get("/product-category/:slug", productCategoryController);

//payment routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);
module.exports = router;
