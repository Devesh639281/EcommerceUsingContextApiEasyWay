import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UsersMenu from "../../components/Layout/UsersMenu";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../../context/Auth";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UsersMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders.map((o, i) => {
              return (
                <div className="border">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col"># </th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyers</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="col">{i + 1}</td>
                        <td scope="col">{o?.status}</td>
                        <td scope="col">{o?.buyer?.name}</td>
                        <td scope="col">{moment(o?.createdAt).fromNow()}</td>
                        <td scope="col">
                          {o?.payment.success ? "Success" : "Failed"}
                        </td>
                        <td scope="col">{o?.products.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    <div className="col-md-12">
                      {o?.products?.map((p, i) => (
                        <div className="row card pr-3 flex-row">
                          <div className="col-md-4">
                            <img
                              src={`/api/v1/products/photo-product/${p._id}`}
                              className="cart-img-top"
                              alt={p.name}
                              width="80px"
                              height={"50px"}
                            />
                          </div>
                          <div className="order col-md-8 p-3 ">
                            <h4>{p.name}</h4>
                            <p>{p.description}</p>
                            <h4>Price:${p.price}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
