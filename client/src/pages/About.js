import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About-Ecommerce App"}>
      <div className="row about">
        <div className="col-md-6 p-5">
          <img
            src="https://i1.wp.com/billionaire365.com/wp-content/uploads/2019/02/Ecommerce-Website.jpg?fit=2048%2C1452&ssl=1"
            alt="client-customer"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6 p-5">
          <h1 className="bg-dark p-2 text-white text-center">About</h1>
          <p className="text-justify mt-5">
            one of the leading providers of online stores says ecommerce refers
            to the buying and selling of goods or services using the internet.
            This includes the transfer of money and data to execute these
            transactions. The term is often used to refer to the sale of
            physical products online. But it can also describe any kind of
            commercial transaction facilitated through the internet.
            Technically, an ecommerce site is an amalgam of website code, an
            associated database and appurtenant third-party applications. These
            usually include payment processing or payment gateways. Ecommerce
            websites also rely upon SSL certificates to secure data transferred
            between the consumer and the site, as well as the site and the
            owner’s financial institution of choice. The best ecommerce sites
            avoid storing important data—such as credit card numbers—unless they
            have the proper PCI compliance. Visitors come to these sites either
            directly, from search activities or by referral from other sites.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
