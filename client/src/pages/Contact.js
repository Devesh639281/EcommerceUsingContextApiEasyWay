import React from "react";
import Layout from "../components/Layout/Layout";
import {
  MdOutlineMarkEmailRead,
  MdOutlineCall,
  MdOutlineContactSupport,
} from "react-icons/md";

const Contact = () => {
  return (
    <Layout>
      <div className="row contactus">
        <div className="col-md-6 p-5">
          <img
            src="https://www.safecontractor.com/wp-content/uploads/2023/11/AdobeStock_637048605-1440x1080.jpeg"
            alt="client-customer"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6 p-5">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-4">
            Any Query and info about product feel free to call anytime we 24*7
            Avaliable
          </p>
          <p className="mt-3">
            <MdOutlineMarkEmailRead />
            :www.help@ecommerceapplication.com
          </p>
          <p className="mt-3">
            <MdOutlineCall />
            :+91 6392814739
          </p>
          <p className="mt-3">
            <MdOutlineContactSupport />
            :1800-9000-6703 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
