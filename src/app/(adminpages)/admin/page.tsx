"use client";
import React, { useEffect } from "react";
import { Tabs } from "antd";
import CategoriesList from "./_components/CategoriesList";
import OrdersList from "./_components/OrdersList";
import ProductsList from "./_components/ProductsList";
import UsersList from "./_components/users/UsersList";
import BlogList from "./_components/blogs/BlogList";
import HotelList from "./_components/hotels/HotelList";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function AdminProfile() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [activeTab, setActiveTab] = React.useState(tab || "1");
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
        <Tabs.TabPane tab="vehicles" key="1">
          <ProductsList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Categories" key="2">
          <CategoriesList />
        </Tabs.TabPane>
        {/* <Tabs.TabPane tab="Orders" key="3">
          <OrdersList />
        </Tabs.TabPane> */}
        <Tabs.TabPane tab="blogs" key="4">
          <BlogList />
        </Tabs.TabPane>

        <Tabs.TabPane tab="hotels" key="5">
          <HotelList />
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
