import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProduct] = useState([]);

  //getall Product
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/get-product");
      setProduct(data.product);
    } catch (error) {
      toast.error("Something Went wrong getting all Products");
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p.id}
                to={`/dashboard/admin/products/${p.slug}`}
                className="product-link">
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}>
                  <img
                    className="card-img-top "
                    src={`/api/v1/products/photo-product/${p._id}`}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
