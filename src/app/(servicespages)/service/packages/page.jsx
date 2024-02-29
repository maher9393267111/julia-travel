"use client";

import Breadcrumb from "@/components/myComponents/layout/BreadCrumb";

import React, { useState, useEffect, useMemo } from "react";
import { SetLoading } from "@/redux/LoadersSlice";
import { useDispatch } from "react-redux";
import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";
import { message } from "antd";
import axios from "axios";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PackageCard from "../_components/packageCard";
import DiscountSlider from "../_components/DiscountSliderPackage";
import LocationFilterCards from "../_components/LocationFilterCards";

// export const metadata = {
//   title: "TripRex - Tour & Travel Agency  NextJs Template",
//   description:
//     "TripRex is a NextJs Template for Tour and Travel Agency purpose",
//   icons: {
//     icon: "/assets/img/sm-logo.svg",
//   },
// };

const page = () => {
  const dispatch = useDispatch();
  const [packagess, setPackages] = useState([]);

  const searchParams = useSearchParams();
  const all = searchParams.get("all");
  const person = searchParams.get("adults");
  const child = searchParams.get("childs");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const type = searchParams.get("type");
  const location = searchParams.get("location");

  const getPackages = async () => {
    try {
      dispatch(SetLoading(true));



      if (!all && !person && !child && !from && !type && !to && !location) {
        const response = await axios.get(`/api/admin/packages?discount=true`);

        setPackages(response.data.data);
      console.log("REsponse-->", response.data.data);
      }


      else {
      // location=${location && location}&&title=${title && title}
      const response = await axios.get(
        `/api/admin/packages?${person && "adult"}=${person}&&${location && "location"}=${location}
           &&${from && "from"}=${from}&&${to && "to"}=${to}&&${child && "child"}=${child}&&${type && "type"}=${type}`
      );
      setPackages(response.data.data);
      console.log("REsponse-->", response.data.data);

      }



    } catch (error) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };
  useEffect(() => {
    getPackages();
  }, [all ,from , type ,person ,child ,location]);

  return (
    <>
      <Breadcrumb pagename="العروض" pagetitle="العروض" />

   
      <LocationFilterCards link = {'packages'} searckey={'location'} />


      {(to || from || type || person  || child   || location ) ?  
      <div className="transport-page pt-120 mb-120">
        <div className="container">
          <div className="row g-lg-4 gy-5">
            <div className="col-xl-10  mx-auto  order-lg-2 order-1">
              <div className="row g-4 mb-70">
                {packagess?.length > 0 &&
                  packagess?.map((trans, index) => {
                    return <PackageCard index={index} trans={trans} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>


:

<div>

<DiscountSlider title="العروض المميزة"  data={packagess} link={'packages'}/>
</div>

                }



    </>
  );
};

export default page;
