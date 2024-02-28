"use client";
import React, { useState, useEffect, useMemo } from "react";
import { SetLoading } from "@/redux/LoadersSlice";
import { useDispatch } from "react-redux";
import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";
import { Button, Table, message } from "antd";
import axios from "axios";

import Breadcrumb from "@/components/myComponents/layout/BreadCrumb";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import HotelCard from "../_components/HotelCard";
import { Swiper, SwiperSlide } from "swiper/react";
import DiscountSlider from '../_components/DiscountSlider'
import {CountriesAr} from '@/uitils/locations'
import LocationFilterCards from '../_components/LocationFilterCards'


export default function HotelsServices() {
  const dispatch = useDispatch();
  const [hotels, setHotels] = useState([]);

  const searchParams = useSearchParams();


  const all = searchParams.get("all");
  const location = searchParams.get("location");

  const title = searchParams.get("title");
  const roomType = searchParams.get("roomType");
  const getHotels = async () => {
    try {
      dispatch(SetLoading(true));

      if (!location && !title && !roomType && !all) {
        const response = await axios.get(`/api/admin/hotels?discount=true&&offers=true`);

        setHotels(response.data.data);
        console.log("REsponse-->", response.data.data);
      }
      
      else {
        // location=${location && location}&&title=${title && title}
        const response = await axios.get(
          `/api/admin/hotels?${location && "location"}=${location}&&${
            title && "title"
          }=${title}&&${roomType && "roomType"}=${roomType}`
        );

        setHotels(response.data.data);
        console.log("REsponse-->", response.data.data);
      }
    } catch (error) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };
  useEffect(() => {
    getHotels();
  }, [location ,all ,roomType ,title]);



  const locations = ["istanbul", "bursa", "trabzon", "izmir", "izmit"];

  return (
    <div>
      <Breadcrumb
        img="https://triprex-nextjs-rtl.vercel.app/assets/img/innerpage/inner-banner-bg.png"
        pagename="Hotels"
        pagetitle="Hotels"
      />

      <div className="room-suits-page pt-120 mb-120">
        <div className="container">


       
<LocationFilterCards link = {'hotels'} searckey={'location'} />


{(location || roomType || title || all) ?  


          <div className="row g-lg-4 gy-5">
            <div className="col-xl-10 mx-auto order-lg-2 order-1">
              {/* map */}

              {hotels?.length > 0 &&
                hotels?.map((hotel, index) => {
                  return <HotelCard index={index} hotel={hotel} />;
                })}

              {hotels?.length === 0 && (
                <div className=" ar text-3xl my-5 ">لا يوجد اي عناصر</div>
              )}
            </div>
          </div>

          :

          <div>
            <DiscountSlider title="عروض الفنادق"  data={hotels} link={'hotels'}/>
          </div>

              }


        </div>
      </div>
    </div>
  );
}
