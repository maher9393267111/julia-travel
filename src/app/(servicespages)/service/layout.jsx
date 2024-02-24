// import Breadcrumb from "@/components/common/Breadcrumb";
import Footer from "@/components/footer/Footer";
import Header from "@/components/myComponents/layout/Header.jsx";
import Topbar from "@/components/topbar/Topbar";
import React from "react";

export const metadata = {
  title: " juliaTours - Tour & Travel Agency",
  description:
    "juliaTours - Tour & Travel Agency ",
  icons: {
    icon:"/assets/img/julia-png.png",
  },
};



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
