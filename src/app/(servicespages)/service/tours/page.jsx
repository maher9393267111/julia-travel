"use client";
import Breadcrumb from "@/components/myComponents/layout/BreadCrumb";

import React, { useState, useEffect, useMemo } from "react";
import { SetLoading } from "@/redux/LoadersSlice";
import { useDispatch } from "react-redux";
import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";
import { Checkbox, message } from "antd";
import axios from "axios";

import { useSearchParams, useRouter } from "next/navigation";

import Link from "next/link";
import TourCard from "../_components/TourCard";

import {
  CountriesAr,
  jorgiaCities,
  emiratesCities,
  turkeyCities,
  azerbicanCities,
  busnaCities,
  gorgiaCities,
} from "@/uitils/locations";

import DiscountSlider from "../_components/DiscountSliderTour";
import LocationFilterCards from "../_components/LocationFilterCards";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [tours, setTours] = useState([]);
  const [searchtitle, setSearchTitle] = useState("");
  const [checkedBrands, setCheckedBrands] = useState([]);

  const searchParams = useSearchParams();
  const all = searchParams.get("all");
  const city = searchParams.get("city");
  const country = searchParams.get("country");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const type = searchParams.get("type");
  const getTours = async () => {
    try {
      dispatch(SetLoading(true));

      if (!country && !city && !type && !all) {
        const response = await axios.get(`/api/admin/tours?discount=true`);

        setTours(response.data.data);
        console.log("REsponse-->", response.data.data);
      } else {
        const response = await axios.get(
          `/api/admin/tours?${country && "country"}=${country}&&${
            checkedBrands?.length > 0 && "cities"
          }=${checkedBrands}&&${type && "type"}=${type}
       `
        );

        setTours(response.data.data);
        console.log("REsponse-->", response.data.data);
      }
    } catch (error) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };
  useEffect(() => {
    getTours();
  }, [country, city, type, all, checkedBrands]);

  const currentCities =
    country && country === "تركيا"
      ? turkeyCities
      : country === "جورجيا"
      ? gorgiaCities
      : country === "الامارات"
      ? emiratesCities
      : country === "أذربيجان"
      ? azerbicanCities
      : location === "البوسنة والهرسك"
      ? busnaCities
      : [];

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

  const ResetSearch = () => {
    router.push("/service/tours");
  };

  return (
    <>
      <Breadcrumb pagename="الرحلات" pagetitle="الرحلات" />

      <LocationFilterCards link={"tours"} searckey={"country"} />

      <div className=" container my-6">
        {city || country || type || all ? (
          <div className="package-grid-with-sidebar-section pt-120 mb-120">
            <div className="container">
              <div className="row g-lg-4 gy-5">
                <div className="col-xl-8 mx-auto order-lg-2 order-2">
                  <div className="list-grid-product-wrap mb-70">
                    <div className="row gy-4">
                      {/* map tours here */}

                      {tours?.length > 0 &&
                        tours?.map((tour, index) => {
                          return <TourCard index={index} tour={tour} />;
                        })}
                    </div>
                  </div>

                  {/* ----pagination--- */}
                </div>

                <div className=" col-xl-4 order-lg-1 order-1">
                  <div className="sidebar-area">
                    <div className="single-widget mb-30">
                      <div className=" flex justify-between mb-3  gap-4">
                        <h5 className=" ar cursor-pointer">ابحث هنا</h5>
                        <h5
                          onClick={ResetSearch}
                          className=" ar cursor-pointer "
                        >
                          {" "}
                          اعادة تعيين
                        </h5>
                      </div>

                      {/* <form> */}
                      <div className="search-box">
                        <input
                          onChange={(e) => setSearchTitle(e.target.value)}
                          type="text"
                          placeholder="Search Here"
                        />
                        <button onClick={getTours} type="submit">
                          <i className="bx bx-search" />
                        </button>
                      </div>

                      <div className="ar  my-4">
                        {currentCities?.length > 0 && <p>المدن في {country}</p>}

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
            <DiscountSlider title="عروض الرحلات" data={tours} link={"tours"} />
          </div>
        )}
      </div>
    </>
  );
};

export default page;
