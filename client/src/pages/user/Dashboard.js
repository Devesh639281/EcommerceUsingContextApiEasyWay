import React from "react";
import Layout from "../../components/Layout/Layout";
import UsersMenu from "../../components/Layout/UsersMenu";
import { useAuth } from "../../context/Auth";

const dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UsersMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1>Name:{auth?.user?.name}</h1>
              <h1>Email:{auth?.user?.email}</h1>
              <h1>Phone:{auth?.user?.phone}</h1>
              <h1>Address:{auth?.user?.address}</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default dashboard;
