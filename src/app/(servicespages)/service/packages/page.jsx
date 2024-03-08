"use client";

import Breadcrumb from "@/components/myComponents/layout/BreadCrumb";

import React, { useState, useEffect, useMemo } from "react";
import { SetLoading } from "@/redux/LoadersSlice";
import { useDispatch } from "react-redux";
import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";
import { message ,Checkbox } from "antd";
import axios from "axios";

import { useSearchParams , useRouter} from "next/navigation";
import Link from "next/link";
import PackageCard from "../_components/packageCard";
import DiscountSlider from "../_components/DiscountSliderPackage";
import LocationFilterCards from "../_components/LocationFilterCards";
import {
  CountriesAr,
  CitiesAr,
  emiratesCities,
  turkeyCities,
  azerbicanCities,
  busnaCities,
  gorgiaCities,
} from "@/uitils/locations";


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
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [searchtitle, setSearchTitle] = useState("");
  const router = useRouter();

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
      } else {
        // location=${location && location}&&title=${title && title}
        const response = await axios.get(
          `/api/admin/packages?${person && "adult"}=${person}&&${
            location && "location"
          }=${location}
           &&${from && "from"}=${from}&&&&${
            checkedBrands?.length > 0 && "cities"
          }=${checkedBrands}&&${to && "to"}=${to}&&${
            child && "child"
          }=${child}&&${type && "type"}=${type}&&${
             (searchtitle && "title")
          }=${searchtitle}&&`
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
  }, [all, from, type, person, child, location ,checkedBrands]);


  const handleCheckedFilterBrand = (e) => {
    const { checked, value } = e.target;
    let checkedList = [...checkedBrands];
    if (checked) {
      checkedList = [...checkedBrands, value];
    } else {
      checkedList.splice(checkedBrands.indexOf(value), 1);
    }
    setCheckedBrands(checkedList);


  };

  const currentCities =
  location && location === "تركيا"
    ? turkeyCities
    : location === "جورجيا"
    ? gorgiaCities
    : location === "الامارات"
    ? emiratesCities
    : location === "أذربيجان"
    ? azerbicanCities
    : location === "البوسنة والهرسك"
    ? busnaCities
    : [];


    
  const ResetSearch = () => {
    router.push("/service/packages");
  };




  return (
    <>
      <Breadcrumb pagename="العروض" pagetitle="العروض" />

      <LocationFilterCards link={"packages"} searckey={"location"} />

      {to || from || type || person || child || location || all ? (
        <div className="transport-page pt-120 mb-120">
          <div className="container">
            <div className="row g-lg-4 gy-5">
              <div className="col-xl-8 mx-auto order-lg-2 order-2">
                <div className="row g-4 mb-70">
                  {packagess?.length > 0 &&
                    packagess?.map((trans, index) => {
                      return <PackageCard index={index} trans={trans} />;
                    })}
                </div>
              </div>


              <div className=" col-xl-4 order-lg-1 order-1">
                <div className="sidebar-area">
                  <div className="single-widget mb-30">
                    <div className=" flex justify-between mb-3  gap-4">
                      <h5 className=" ar cursor-pointer">ابحث هنا</h5>
                      <h5 onClick={ResetSearch} className=" ar cursor-pointer ">
                        {" "}
                        اعادة تعيين
                      </h5>
                    </div>

                    <div className="search-box">
                      <input
                        onChange={(e) => setSearchTitle(e.target.value)}
                        type="text"
                        placeholder="Search Here"
                      />
                      <button onClick={getPackages} type="submit">
                        <i className="bx bx-search" />
                      </button>
                    </div>

                    <div className="ar  my-4">
                      {currentCities?.length > 0 && <p>المدن في {location}</p>}

                      {currentCities?.length > 0 &&
                        currentCities?.map((city, index) => {
                          return (
                            <Checkbox
                              className="ar"
                              name="luxurycar"
                              key={index}
                              value={city}
                              onChange={handleCheckedFilterBrand}
                            >
                              {city}
                            </Checkbox>
                          );
                        })}
                    </div>

                    {/* </form> */}
                  </div>
                </div>
              </div>




            </div>
          </div>
        </div>
      ) : (
        <div>
          <DiscountSlider
            title="العروض المميزة"
            data={packagess}
            link={"packages"}
          />
        </div>
      )}
    </>
  );
};

export default page;
