import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/single-product/${params.slug}`
      );
      console.log(data);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
      //   toast.error("Something Went wrong getting Product");
    }
  };
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get Similar Product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            className="card-img-top"
            src={`/api/v1/products/photo-product/${product._id}`}
            alt={product.name}
            height={300}
            width={150}
          />
        </div>
        <div className="col-md-6">
          <h1 className=" text-center">Product Details</h1>
          <h6>Name:{product.name}</h6>
          <h6>Description:{product.description}</h6>
          <h6>Price:{product.price}</h6>
          <h6>Category:{product?.category?.name}</h6>
          <button className="btn btn-secondary ms-1">Add to cart</button>
        </div>
        <hr />
        <div className="row container">
          <h5>Similar Products</h5>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Product Found</p>
          )}
          {/* {JSON.stringify(relatedProducts, null, 4)} */}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  className="card-img-top "
                  src={`/api/v1/products/photo-product/${p?._id}`}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 7)}...
                  </p>
                  <p className="card-text">{p.price}</p>
                  <button className="btn btn-secondary ms-1">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
