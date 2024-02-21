"use client";
import React, { useEffect } from "react";
import { Tabs } from "antd";
import CategoriesList from "./_components/CategoriesList";
import OrdersList from "./_components/OrdersList";
import ProductsList from "./_components/ProductsList";
import UsersList from "./_components/users/UsersList";
import BlogList from "./_components/blogs/BlogList";
import HotelList from "./_components/hotels/HotelList";
import TourList from "./_components/tours/TourList";
import CarList from "./_components/cars/CarList";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import FlightList from "./_components/flights/FlightList";
import PackageList from "./_components/packages/PackageList";
import OfferList from "./_components/offers/OfferList";
import TransList from "./_components/transes/TransList";
import VisaList from "./_components/visa/VisaList";

function AdminProfile() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab")  ;
  const [activeTab, setActiveTab] = React.useState(tab || "4");
  const router = useRouter();

  return (
    <div dir="ltr">
      <Tabs
        onTabClick={(key) => {
          router.push(`/admin?tab=${key}`);
          setActiveTab(key);
        }}
        activeKey={activeTab}
      >
        {/* <Tabs.TabPane tab="vehicles" key="1">
          <ProductsList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Categories" key="2">
          <CategoriesList />
        </Tabs.TabPane>
 
        <Tabs.TabPane tab="blogs" key="4">
          <BlogList />
        </Tabs.TabPane> */}


<Tabs.TabPane tab="visa" key="4">
          <VisaList />
        </Tabs.TabPane>

        <Tabs.TabPane tab="hotels" key="5">
          <HotelList />
        </Tabs.TabPane>

        <Tabs.TabPane tab="tours" key="6">
          <TourList />
        </Tabs.TabPane>

        <Tabs.TabPane tab="flights" key="7">
          <FlightList />
        </Tabs.TabPane>


        <Tabs.TabPane tab="cars" key="8">
          <CarList />
        </Tabs.TabPane>


        <Tabs.TabPane tab="packages" key="9">
          <PackageList />
        </Tabs.TabPane>



        <Tabs.TabPane tab="offers" key="10">
          <OfferList />
        </Tabs.TabPane>

        
        <Tabs.TabPane tab="transictions" key="11">
          <TransList />
        </Tabs.TabPane>






{/* 
        <Tabs.TabPane tab="blogs" key="4">
          <BlogList />
        </Tabs.TabPane>



        <Tabs.TabPane tab="blogs" key="4">
          <BlogList />
        </Tabs.TabPane>



        <Tabs.TabPane tab="blogs" key="4">
          <BlogList />
        </Tabs.TabPane>



        <Tabs.TabPane tab="blogs" key="4">
          <BlogList />
        </Tabs.TabPane>



        <Tabs.TabPane tab="blogs" key="4">
          <BlogList />
        </Tabs.TabPane>
 */}







      </Tabs>
    </div>
  );
}

export default AdminProfile;
