import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
// import { BraintreeDropIn } from "braintree-web-react";
import toast from "react-hot-toast";
const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  //get Payment Gateway Token
  //total Price
  const totalPrice = () => {
    try {
      let total = 0;
      cart.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      console.log(myCart);
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get Payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/braintree/token");
      // console.log(data);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handlePayments
  const handlePayments = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/products/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="banner">
        <h1 className="text-center">
          {" "}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHIZn5sR2s-BWDmoPs9PyOI-5AcNiVcJuDUg&usqp=CAU"
            alt="cart-design"
            className="setImage"
          />
          ECOMMERCE PROJECT
        </h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row card m-2 mb-2 p-3 flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/products/photo-product/${p._id}`}
                    className="cart-img-top"
                    alt={p.name}
                    width="80px"
                    height={"50px"}
                  />
                </div>
                <div className="col-md-8 p-3">
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 30)}...</p>
                  <h4>Price:${p.price}</h4>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total:{totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-2">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate(`/dashboard/user/profile`)}>
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-2">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate(`/dashboard/user/profile`)}>
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/login")}>
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayments}
                    disabled={
                      !clientToken || !instance || !auth?.user?.address
                    }>
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
