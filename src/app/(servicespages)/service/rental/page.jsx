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
import RentalCard from "../_components/RentalCard";
import { Swiper, SwiperSlide } from "swiper/react";

import { CountriesAr } from "@/uitils/locations";
import CarFilter from "../_components/RentalCarFilter";



const INIT_CHECKBOXES_VALUES = {
  title:'',
  type: false,
  vites: false,
  fueltype: false,
  typevalue:"",
  vitesvalue:"",
  fuelvalue:"",
  capacity:0
  // size: false,
};


export default function HotelsServices() {
  const dispatch = useDispatch();
  const [rentals, setRentals] = useState([]);
  const [checkboxes, setCheckboxes] = useState(INIT_CHECKBOXES_VALUES);
  const searchParams = useSearchParams();

  const all = searchParams.get("all");

  const getHotels = async () => {
    try {
      dispatch(SetLoading(true));

      // location=${location && location}&&title=${title && title}
      // const response = await axios.get(
      //   `/api/admin/cars?${title && "title"}=${title}&&${
      //     type && "type"
      //   }=${type}&&${fueltype && "fueltype"}=${fueltype}&&${
      //     vites && "vitestype"
      //   }=${vites}`
      // );

      const response = await axios.get(
        `/api/admin/cars?${checkboxes.title && "title"}=${checkboxes.title}&&${
          checkboxes.type && "type"
        }=${checkboxes.typevalue}&&${checkboxes.fueltype && "fueltype"}=${checkboxes.fuelvalue}&&${
          checkboxes.vites && "vitestype"
        }=${checkboxes.vitesvalue}&&${checkboxes.capacity > 0  && "capacity"}=${checkboxes.capacity}`
      );

      setRentals(response.data.data);
      console.log("REsponse-->", response.data.data);
    } catch (error) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };
  useEffect(() => {
    getHotels();
  }, [checkboxes]);

  const locations = ["istanbul", "bursa", "trabzon", "izmir", "izmit"];


  
  const onChange = (e, fieldName) => {
    console.log("etarget" ,e.target.checked ,checkboxes.type)
    const newCheckboxes = checkboxes;
    newCheckboxes[fieldName] =  !fieldName;
    setCheckboxes(newCheckboxes);
  };





  return (
    <div>
      <Breadcrumb
        img="https://triprex-nextjs-rtl.vercel.app/assets/img/innerpage/inner-banner-bg.png"
        pagename="Hotels"
        pagetitle="Hotels"
      />


<div className="container my-6">
          <div className="row g-lg-4 gy-5">
         
            <div className="col-xl-8 order-lg-2 order-2">

            {rentals?.length > 0 &&
                  rentals?.map((rental, index) => {
                    return <RentalCard index={index} rental={rental} />;
                  })}


                </div>

                <div className="col-xl-4 order-lg-1 order-1">
              <CarFilter
              setCheckboxes={setCheckboxes}
                     onChange={onChange}
                     checkboxes={checkboxes}
              
              />
            </div>

                </div>

</div>


    </div>
  );
}
