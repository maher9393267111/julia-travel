"use client";

import Newslatter from "@/components/common/Newslatter";

import SelectComponent from "@/uitils/SelectComponent";

import React, { useState, useEffect, Children } from "react";
import { SetLoading } from "@/redux/LoadersSlice";
import { useDispatch } from "react-redux";
import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";

import axios from "axios";

import { useParams } from "next/navigation";
import ModalVideo from "react-modal-video";
import Breadcrumb from "@/components/myComponents/layout/BreadCrumb";
import ReactDatePicker from "react-datepicker";

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import parse from "html-react-parser";
import dayjs from "dayjs";

import { Button, message } from "antd";
import {
  LeftOutlined,
  LoadingOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { hanldeScore } from "@/uitils/StarsHandle";

// export const metadata = {
//   title: "TripRex - Tour & Travel Agency  NextJs Template",
//   description:
//     "TripRex is a NextJs Template for Tour and Travel Agency purpose",
//   icons: {
//     icon: "/assets/img/sm-logo.svg",
//   },
// };
const page = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [isOpenModalVideo, setOpenModalVideo] = useState(false);
  const [isOpenimg, setOpenimg] = useState({
    openingState: false,
    openingIndex: 0,
  });

  // -----------

  const dispatch = useDispatch();

  const [visa, setVisa] = useState({});

  const params = useParams();

  const getVisa = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/admin/visa/${params?.visa_id}`);
      setVisa(response.data.data);
      console.log("REsponseeeeee-->", response.data.data);
    } catch (error) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };
  useEffect(() => {
    getVisa();
  }, []);

  const [state, setstate] = useState({
    name: "",
    phone: "",
    hotelname: "",
    roomType: "",
    adultsNum: 1,
    ChildrensNum: 0,
    daysNum: 1,
    email: "",
    message: "",

    error: false,
  });

  const formSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    // if (state.name && state.email && state.message && state.phone   ) {
    //   sendMessage();

    // }
  };

  const inputChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  const handleUpdateBooking = (field) => (value) => {
    const $booking = { ...state };
    $booking[field] = value;
    setstate($booking);
  };

  const sendMessage = async () => {
    try {
      //  setIsLoading(true);

      const start = dayjs(startDate, "YYYY-MM-DD").format("D MMMM");
      const end = dayjs(endDate, "YYYY-MM-DD").format("D MMMM");

      let data = {
        ...state,
        startDate: start,
        endDate: end,
        service: "visa",
        details: visa,
      };

      if (state.phone === "" && state.email === "" &&   state.name === "") {
        setstate({ ...state, error: true });
        message.info("يرجا تعبئة كافة الحقول");
       
        console.log("all fields is required")
      } else {
        console.log("form sended" , state.email)
        const res = await fetch("/api/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        setstate({ ...state, error: false });
       
        message.success("تم ارسال معلوماتك بنجاح");
       
      }


      //   setPhone("")
    } catch (error) {
  ;
      message.error("حدث خطأ ما");
      console.log(error);
    }
  };

  return (
    <>
      <Breadcrumb pagename="تفاصيل الفيزا" pagetitle="تفاصيل الفيزا" />

      {visa && (
        <div className="visa-details-pages pt-120 mb-120">
          <div className="container">
            <div className="row g-lg-4 gy-5">
              <div className="col-lg-8">
                <div className="visa-thumb">
                  {/* 1216 602 */}

                  {/* <img 
                src="/assets/img/innerpage/visa-bt-img.jpg"
                
                 alt="" /> */}

                  {visa?.images?.length > 0 && (
                    <img
                      src={visa?.images[0]}
                      //  src="/assets/img/innerpage/room-01.jpg"

                      alt=""
                    />
                  )}
                </div>
                <div className="visa-title ar">
                  <h3 className=" ar">{visa?.title}</h3>
                </div>
                <ul className="visa-meta ar">
                  <li>
                    <span>البلد :</span> {visa?.country}
                  </li>
                  <li>
                    <span>نوع الفيزا :</span>
                    {visa?.type}
                  </li>

                  <li>
                    <span>مدة الاصدار :</span> {visa?.maketime}  ايام
                  </li>
                </ul>
                <div className="visa-required-document mb-50">
                  <div className="document-list ar">
                    <h3 className=" ar">عرض المستندات المطلوبة</h3>
                    <h6 className=" ar">
                      <span className="ar">*</span>
                      المستندات المطلوبة للحصول على التأشيرة الإلكترونية
                    </h6>

                    <ul className=" ar">

{visa?.requirements && visa?.requirements?.length > 0 && visa?.requirements?.map((item,index)=>{
return (

  <li className="" key={index}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={16}
    viewBox="0 0 18 16"
  >
    <path d="M8.21008 15.9998C8.15563 15.9998 8.10177 15.9885 8.05188 15.9664C8.002 15.9444 7.95717 15.9122 7.92022 15.8719L0.104874 7.34121C0.0527746 7.28433 0.0182361 7.21337 0.00548549 7.137C-0.00726514 7.06063 0.00232503 6.98216 0.0330824 6.9112C0.0638398 6.84025 0.11443 6.77988 0.178662 6.73748C0.242893 6.69509 0.31798 6.67251 0.394731 6.6725H4.15661C4.21309 6.67251 4.26891 6.68474 4.32031 6.70837C4.37171 6.73201 4.41749 6.76648 4.45456 6.80949L7.06647 9.84167C7.34875 9.2328 7.89519 8.21899 8.85409 6.98363C10.2717 5.15733 12.9085 2.47141 17.4197 0.0467428C17.5069 -0.000110955 17.6084 -0.0122714 17.704 0.0126629C17.7996 0.0375972 17.8825 0.0978135 17.9363 0.181422C17.9901 0.26503 18.0109 0.365952 17.9946 0.46426C17.9782 0.562568 17.9259 0.651115 17.848 0.712418C17.8308 0.726001 16.0914 2.10818 14.0896 4.63987C12.2473 6.96965 9.79823 10.7792 8.59313 15.6973C8.57196 15.7837 8.52272 15.8604 8.45327 15.9153C8.38382 15.9702 8.29816 16 8.20996 16L8.21008 15.9998Z" />
  </svg>{" "}
 {item}
</li>


)



})}


                  
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="visa-sidebar mb-30">
                  <div className="sidebar-top text-center">
                    <h4 className=" ar">ملخص التكلفة</h4>
                    <h6>
                      {visa?.price}$/ <span> للشخص الواحد</span>
                    </h6>
                    {/* <p>Arrange your trip in advance - book this room now!</p> */}
                  </div>
                  <div className="inquery-form">
                    <div className="form-title ar">
                      <h4 className=" ar">نموذج الاستفسار</h4>
                      <p className=" ar">
                        النموذج الكامل للشكاوى أو الاستفسارات المتعلقة بالخدمة؛
                        توقع الاستجابة السريعة عبر الهاتف/البريد الإلكتروني.
                      </p>
                    </div>
                    <form>
                      <div className="form-inner mb-20">
                        <label className=" !font-kufi">
                          <span>*</span>
                          الاسم الكامل
                        </label>
                        <input
                          name="name"
                          onChange={inputChange}
                          value={state.name}
                          type="text"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="form-inner mb-20">
                        <label className=" !font-kufi">
                          <span>*</span>
                          الايميل
                        </label>
                        <input
                          name="email"
                          onChange={inputChange}
                          value={state.email}
                          type="email"
                          placeholder="Enter your email address"
                        />
                      </div>
                      <div className="form-inner mb-20">
                        <label className=" !font-kufi">
                          <span>*</span>
                          رقم الهاتف
                        </label>
                        <input
                          name="phone"
                          onChange={inputChange}
                          value={state.phone}
                          type="text"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div className="form-inner mb-30">
                        <label className=" !font-kufi">
                          <span>*</span>
                          الرسالة
                        </label>
                        <textarea
                          name="message"
                          onChange={inputChange}
                          value={state.message}
                          placeholder="Write your msg"
                          defaultValue={""}
                        />
                      </div>

                      {/* total price-- */}
                      <div className="total-price">
                        <span>Total Price:</span> ${visa?.price}
                      </div>

                      <div className="form-inner">
                        <button
                          onClick={(e) => formSubmit(e)}
                          type="submit"
                          className="primary-btn1 !font-kufi two"
                        >
                          احجز الان
                        </button>

                        {state.error && (
                          <div className=" text-red-500 font-semibold text-sm  ar  my-2 ">
                            {" "}
                            ادخل كافة البيانات المطلوبة
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;

const Amount = ({ value = 1, min = 0, onChange }) => {
  return (
    <div className="flex amount">
      <Button
        onClick={() => {
          if (value > min) onChange(value - 1);
        }}
        type="ghost"
        size="large"
        disabled={value <= min}
        icon={<MinusSquareOutlined />}
      ></Button>
      <div className="value mt-[6px]">{value}</div>
      <Button
        onClick={() => {
          onChange(value + 1);
        }}
        type="ghost"
        size="large"
        icon={<PlusSquareOutlined />}
      ></Button>
    </div>
  );
};
