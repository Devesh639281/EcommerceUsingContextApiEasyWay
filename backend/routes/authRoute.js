const express = require("express");
const {
  registerController,
  loginController,
  testController,
  isAdmin,
  forgotpasswordController,
  updateProfileController,
  getOrderController,
  getAllOrdersController,
  orderStatusController,
} = require("../Controller/authController");

const { requireSignIn } = require("../middlewares/authMiddlewares");

const router = express.Router();

//Register
router.post("/register", registerController);
//Login
router.post("/login", loginController);

//test Routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth user-route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//Forgot Password
router.post("/forgot-password", forgotpasswordController);

// protected Admin Route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update Profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrderController);

//All orders List
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//order status Update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

module.exports = router;
