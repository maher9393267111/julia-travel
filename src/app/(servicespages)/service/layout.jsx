// import Breadcrumb from "@/components/common/Breadcrumb";
import Footer from "@/components/footer/Footer";
import Header from "@/components/myComponents/layout/Header.jsx";
import Topbar from "@/components/topbar/Topbar";
import React from "react";

const layout = ({ children }) => {
  return (
    <>
      <Topbar />
      <Header />
    
      {children}
      <Footer />
    </>
  );
};

export default layout;
