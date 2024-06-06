import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "diliverd",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      console.log(data);
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders List"}>
      <div className="row m-2">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
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
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}>
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      {/* <td scope="col">{o?.status}</td> */}
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
    </Layout>
  );
};

export default AdminOrder;
