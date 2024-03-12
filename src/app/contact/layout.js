import Breadcrumb from "@/components/myComponents/layout/BreadCrumb";
import Footer from "@/components/footer/Footer";
// import Header from "@/components/header/Header";
import Topbar from "@/components/topbar/Topbar";
import React from "react";
import Header from "@/components/myComponents/layout/Header";

const layout = ({ children }) => {
  return (
    <>
      <Topbar />
      <Header />
     
      <Breadcrumb pagename="التواصل" pagetitle="التواصل" />
      {children}
      <Footer />
    </>
  );
};

export default layout;
