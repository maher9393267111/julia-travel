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

const page = () => {
  const dispatch = useDispatch();
  const [tours, setTours] = useState([]);

  const searchParams = useSearchParams();

  const location = searchParams.get("location");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const type = searchParams.get("type");
  const getTours = async () => {
    try {
      dispatch(SetLoading(true));
      // location=${location && location}&&title=${title && title}
      const response = await axios.get(
        `/api/admin/tours?${location && "location"}=${location}&&${
          type && "type"
        }=${type}&&${from && "from"}=${from}&&${to && "to"}=${to}`
      );
      setTours(response.data.data);
      console.log("REsponse-->", response.data.data);
    } catch (error) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };
  useEffect(() => {
    getTours();
  }, []);



  return (
    <>
      <Breadcrumb pagename="الرحلات" pagetitle="الرحلات" />
      <div className="package-grid-with-sidebar-section pt-120 mb-120">
        <div className="container">
          <div className="row g-lg-4 gy-5">
            <div className="col-lg-10 mx-auto">
              {tours?.length}

              <div className="list-grid-product-wrap mb-70">
                <div className="row gy-4">
                  {/* map tours here */}

                  {tours?.length > 0 &&
                    tours?.map((tour, index) => {
                      return (
                       <TourCard index={index} tour={tour}/>
                      );
                    })}
                </div>
              </div>

              {/* ----pagination--- */}
            </div>
          </div>
        </div>
      </div>
      {/* <Newslatter /> */}
    </>
  );
};

export default page;
