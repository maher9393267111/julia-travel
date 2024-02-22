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
import HotelCard from "../_components/HotelCard"
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);






export default function HotelsServices() {
  const dispatch = useDispatch();
  const [hotels, setHotels] = useState([]);

  const searchParams = useSearchParams();

  const location = searchParams.get("location");
  const title = searchParams.get("title");
  const roomType = searchParams.get("roomType");
  const getHotels = async () => {
    try {
      dispatch(SetLoading(true));
      // location=${location && location}&&title=${title && title}
      const response = await axios.get(
        `/api/admin/hotels?${location && "location"}=${location}&&${
          title && "title"
        }=${title}&&${roomType && "roomType"}=${roomType}`
      );
      setHotels(response.data.data);
      console.log("REsponse-->", response.data.data);
    } catch (error) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };
  useEffect(() => {
    getHotels();
  }, []);




  


  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 25,
      effect: "fade", // Use the fade effect
      loop: true,
      fadeEffect: {
        crossFade: true, // Enable cross-fade transition
      },
      autoplay: {
        delay: 2500, // Autoplay duration in milliseconds
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination5",
        clickable: true,
      },
    };
  }, []);

  return (
    <div>
      <Breadcrumb 
      img="https://triprex-nextjs-rtl.vercel.app/assets/img/innerpage/inner-banner-bg.png"
      pagename="Hotels" pagetitle="Hotels" />

      <div className="room-suits-page pt-120 mb-120">
        <div className="container">
          <div className="row g-lg-4 gy-5">
            <div className="col-xl-10 mx-auto order-lg-2 order-1">
              {/* map */}

              {hotels?.map((hotel, index) => {
                return (

<HotelCard index ={index} hotel ={hotel}/>

                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
