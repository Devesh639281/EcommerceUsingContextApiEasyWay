const Users = require("../Model/userModel");
const OrderModels = require("../Model/orderModel");
const { hashPassword, comparePassword } = require("../helpers/authHelpers");
const JWT = require("jsonwebtoken");
const orderModel = require("../Model/orderModel");

exports.registerController = async (req, res) => {
  try {
    const { name, email, password, role, phone, address, answer } = req.body;
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required" });
    }
    if (!role) {
      return res.send({ message: "Role is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }
    const users = await Users.findOne({ email });
    if (users) {
      return res.status(200).send({
        success: false,
        message: "Already Register User Go to Login",
      });
    }
    const hashedPassword = await hashPassword(password);

    const user = await new Users({
      name,
      email,
      role,
      phone,
      address,
      answer,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User register Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//Post Login

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//test Controller
exports.testController = async (req, res) => {
  try {
    res.send("Route Protected");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//Admin Access
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unathorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in isAdmin Middleware",
      error,
    });
  }
};

//forgotpasswordControl

exports.forgotpasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "newPassword is required" });
    }

    //now we check email and password if right then forget it
    const user = await Users.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await Users.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//update Profile Controller
exports.updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await Users.findById(req.user._id);
    if (!password && password.length < 6) {
      return res.json({ error: "Password is Required and 6 character Long " });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await Users.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
        email: email || user.email,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "password Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//orders
exports.getOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({
        buyer: req.user._id,
      })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While getting Orders",
      error,
    });
  }
};

//get all Orders
exports.getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createAt: -1 });

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While getting Orders",
      error,
    });
  }
};

//order status Update
exports.orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error While Updating Order",
      error,
    });
  }
};
