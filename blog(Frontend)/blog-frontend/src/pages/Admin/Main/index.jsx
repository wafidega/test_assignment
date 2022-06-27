import React from "react";
import "./index.css";
// Import Compennt
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

export default function Main() {
  return (
    <>
      <div className="wrapper">
        {/* Sidebar  */}
        <Sidebar />
        {/* Page Content  */}
        <div id="content">
          <Header />
          <h2>WELCOME ADMIN</h2>
          <p>Dont forget to post every 2 days, and keep make a good content</p>
        </div>
      </div>
    </>
  );
}
