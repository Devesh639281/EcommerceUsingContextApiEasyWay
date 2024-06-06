import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoutes from "./components/Routes/AdminRoutes";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Products from "./pages/Admin/Products";
// import Users from "./pages/Admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import Cart from "./pages/Cart";
import AdminOrder from "./pages/Admin/AdminOrder";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/categories" element={<Categories />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/category/:slug" element={<CategoryProduct />} />
        <Route exact path="/product/:slug" element={<ProductDetails />} />
        <Route exact path="/dashboard" element={<PrivateRoute />}>
          <Route exact path="user" element={<Dashboard />} />
          <Route exact path="user/profile" element={<Profile />} />
          <Route exact path="user/orders" element={<Orders />} />
        </Route>
        <Route exact path="/dashboard" element={<AdminRoutes />}>
          <Route exact path="admin" element={<AdminDashboard />} />
          <Route
            exact
            path="admin/create-category"
            element={<CreateCategory />}
          />
          <Route exact path="admin/orders" element={<AdminOrder />} />

          <Route
            exact
            path="admin/create-product"
            element={<CreateProduct />}
          />
          <Route exact path="admin/products" element={<Products />} />
          <Route
            exact
            path="admin/products/:slug"
            element={<UpdateProduct />}
          />
          {/* <Route exact path="admin/users" element={<Users />} /> */}
        </Route>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/policy" element={<Policy />} />
        <Route exact path="/*" element={<Pagenotfound />} />
      </Routes>
    </div>
  );
}

export default App;
