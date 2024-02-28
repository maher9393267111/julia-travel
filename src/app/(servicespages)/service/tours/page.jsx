"use client";
import Breadcrumb from "@/components/myComponents/layout/BreadCrumb";

import React, { useState, useEffect, useMemo } from "react";
import { SetLoading } from "@/redux/LoadersSlice";
import { useDispatch } from "react-redux";
import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";
import { Button, Table, message } from "antd";
import axios from "axios";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import TourCard from "../_components/TourCard";

import { CountriesAr } from "@/uitils/locations";

import DiscountSlider from "../_components/DiscountSliderTour";
import LocationFilterCards from '../_components/LocationFilterCards'
const page = () => {
  const dispatch = useDispatch();
  const [tours, setTours] = useState([]);

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
      }

      // location=${location && location}&&title=${title && title}
      // &&${from && "from"}=${from}&&${to && "to"}=${to}
      else {
        const response = await axios.get(
          `/api/admin/tours?${country && "country"}=${country}&&${
            city && "city"
          }=${city}&&${type && "type"}=${type}
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
  }, [country ,city ,type ,all]);

  return (
    <>
      <Breadcrumb pagename="الرحلات" pagetitle="الرحلات" />



<LocationFilterCards link = {'tours'} searckey={'country'} />


<div className=" container my-6">

      {city || country || type || all ? (
        <div className="package-grid-with-sidebar-section pt-120 mb-120">
          <div className="container">
            <div className="row g-lg-4 gy-5">
              <div className="col-lg-10 mx-auto">
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
