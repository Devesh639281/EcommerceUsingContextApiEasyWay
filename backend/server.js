const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const colors = require("colors");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoute");
const CategoryRoutes = require("./routes/categoryRoutes");
const ProductRoutes = require("./routes/productsRoutes");

const app = express();
app.use(cors());
dotenv.config();
connectDB();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static * path.join(__dirname, "../client/build"));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/products", ProductRoutes);
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
app.listen(process.env.PORT, () => {
  console.log(`Server is Running on port ${process.env.PORT}`.bgGreen.blue);
});
