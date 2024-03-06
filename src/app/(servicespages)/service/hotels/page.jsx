"use client";
import React, { useState, useEffect, useMemo } from "react";
import { SetLoading } from "@/redux/LoadersSlice";
import { useDispatch } from "react-redux";
import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";
import { Button, Checkbox, message } from "antd";
import axios from "axios";

import Breadcrumb from "@/components/myComponents/layout/BreadCrumb";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import HotelCard from "../_components/HotelCard";
import { Swiper, SwiperSlide } from "swiper/react";
import DiscountSlider from "../_components/DiscountSlider";
import {
  CountriesAr,
  CitiesAr,
  
  emiratesCities,
  turkeyCities,
  azerbicanCities,
  busnaCities,
  gorgiaCities,
} from "@/uitils/locations";
import LocationFilterCards from "../_components/LocationFilterCards";

export default function HotelsServices() {
  const dispatch = useDispatch();
  const [hotels, setHotels] = useState([]);
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [searchtitle, setSearchTitle] = useState("");

  const searchParams = useSearchParams();

  const all = searchParams.get("all");
  const location = searchParams.get("location");

  const title = searchParams.get("title");
  const roomType = searchParams.get("roomType");
  const getHotels = async () => {
    try {
      dispatch(SetLoading(true));

      if (!location && !title && !roomType && !all) {
        const response = await axios.get(
          `/api/admin/hotels?discount=true&&offers=true`
        );

        setHotels(response.data.data);
        console.log("REsponse-->", response.data.data);
      } else {
        // location=${location && location}&&title=${title && title}
        const response = await axios.get(
          `/api/admin/hotels?${location !== null && "location"}=${location}&&${
            title || (searchtitle && "title")
          }=${title || searchtitle}&&${
            roomType !== null && "roomType"
          }=${roomType}&&${
            checkedBrands?.length > 0 && "cities"
          }=${checkedBrands}`
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
  }, [location, all, roomType, title, checkedBrands]);

  // "تركيا",
  // "جورجيا",
  // "الامارات",
  // "أذربيجان",
  // "البوسنة والهرسك",

  const currentCities =
    location && location === "تركيا"
      ? turkeyCities
      : location === "جورجيا"
      ? gorgiaCities
      : location === "الامارات"
      ? emiratesCities
      : location === "أذربيجان"
      ? azerbicanCities
      : busnaCities;

  const handleCheckedFilterBrand = (e) => {
    const { checked, value } = e.target;
    let checkedList = [...checkedBrands];
    if (checked) {
      checkedList = [...checkedBrands, value];
    } else {
      checkedList.splice(checkedBrands.indexOf(value), 1);
    }
    setCheckedBrands(checkedList);

    const hotelsbycities = hotels?.map((hotel, index) => {
      checkedBrands.includes(hotel);
    });

    console.log("HOTELSSSS", hotelsbycities, checkedBrands);
  };

  return (
    <div>
      <Breadcrumb
        img="https://triprex-nextjs-rtl.vercel.app/assets/img/innerpage/inner-banner-bg.png"
        pagename="Hotels"
        pagetitle="Hotels"
      />

      <div className="room-suits-page pt-120 mb-120">
        <div className="container">
          <LocationFilterCards link={"hotels"} searckey={"location"} />

          {location || roomType || title || all ? (
            <div className="row g-lg-4 gy-5">
              <div className="col-xl-8 mx-auto order-lg-2 order-2">
                {/* map */}

                {hotels?.length > 0 &&
                  hotels?.map((hotel, index) => {
                    return <HotelCard index={index} hotel={hotel} />;
                  })}

                {hotels?.length === 0 && (
                  <div className=" ar text-3xl my-5 ">لا يوجد اي عناصر</div>
                )}
              </div>

              <div className=" col-xl-4 order-lg-1 order-1">
                <div className="sidebar-area">
                  <div className="single-widget mb-30">
                    <h5 className="widget-title ar">ابحث هنا</h5>
                    {/* <form> */}
                    <div className="search-box">
                      <input
                        onChange={(e) => setSearchTitle(e.target.value)}
                        type="text"
                        placeholder="Search Here"
                      />
                      <button onClick={getHotels} type="submit">
                        <i className="bx bx-search" />
                      </button>
                    </div>


<div className="ar  my-4">
<p>المدن في {location}</p>
  
{currentCities?.map((city, index) => {
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
          ) : (
            <div>
              <DiscountSlider
                title="عروض الفنادق"
                data={hotels}
                link={"hotels"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
