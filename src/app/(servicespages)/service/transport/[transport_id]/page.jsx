"use client";

"use client";
import React, { useState, useEffect, Children, useMemo } from "react";
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
import { calculteDiscount } from "@/uitils/CalculateDiscount";

// -

import QuantityCounter from "@/uitils/QuantityCounter";

import { Swiper, SwiperSlide } from "swiper/react";
import { FaChampagneGlasses } from "react-icons/fa6";
import WhatsappForm from "../../_components/WhatsappForm";
// import SwiperCore, {
//   Autoplay,
//   EffectFade,
//   Navigation,
//   Pagination,
// } from "swiper";
// SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const Page = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [isOpenModalVideo, setOpenModalVideo] = useState(false);
  const [isOpenimg, setOpenimg] = useState({
    openingState: false,
    openingIndex: 0,
  });

  // -----------

  const dispatch = useDispatch();

  const [trans, setTrans] = useState({});

  const params = useParams();

  const getTrans = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(
        `/api/admin/trans/${params?.transport_id}`
      );
      setTrans(response.data.data);
      console.log("REsponseeeeee-->", response.data.data);
    } catch (error) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };
  useEffect(() => {
    getTrans();
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
    transportType: "car",
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

  const calcultePrice = (trans) => {
    console.log("type", state.transportType);
    const total =
      state.transportType === "car"
        ? trans.carprice
        : state.transportType === "vito"
        ? trans.vitoprice
        : state.transportType === "minibus"
        ? trans.minibusprice
        : state.transportType === "bus"
        ? trans.busprice
        : 0;

    return total;
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
        service: "transport",
        details: trans,
        totalprice:
          state.transportType === "car"
            ? trans.carprice
            : state.transportType === "vito"
            ? trans.vitoprice
            : state.transportType === "minibus"
            ? trans.minibusprice
            : trans.busprice,
      };

      if (
        // !state.phone &&
        // !state.email &&
        // !state.name &&
        !state.phone &&
        !state.email &&
        !state.name &&
        !startDate &&
        !endDate
      ) {
        console.log("ERROR CONDITION @@@@@@");
        setstate({ ...state, error: true });
        message.info("يرجا تعبئة كافة الحقول");
      } else {
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

      //console.log("response", res);

      //   setPhone("")
    } catch (error) {
      message.error("حدث خطأ ما");
      console.log(error);
    }
  };

  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 10,
      loop: true,
      autoplay: false,
      navigation: {
        nextEl: ".product-stand-next",
        prevEl: ".product-stand-prev",
      },
    };
  }, []);
  return (
    <>
      <Breadcrumb pagename="تفاصيل التنقل" pagetitle="تفاصيل التنقل" />

      {trans && (
        <div className="transport-details-section pt-120 mb-120">
          <div className="container">
            <div className="row g-lg-4 gy-5">
              <div className="col-lg-8">
                <div className="transport-image-area mb-50">
                  <div className="tab-content mb-30" id="myTab5Content">
                    <div
                      className="tab-pane fade show active"
                      id="exterior"
                      role="tabpanel"
                      aria-labelledby="exterior-tab"
                    >
                      <div className="transport-img">
                        <div className="slider-btn-group">
                          <div className="product-stand-next swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                            </svg>
                          </div>
                          <div className="product-stand-prev swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                            </svg>
                          </div>
                        </div>

                        {trans?.images && trans?.images?.length > 0 && (
                          <Swiper
                            {...settings}
                            className="swiper product-img-slider"
                          >
                            {/* <div className="swiper-wrapper"> */}
                            {trans?.images?.map((img, index) => {
                              // big 994 552
                              // small 309  206

                              return (
                                <SwiperSlide className="swiper-slide">
                                  <img
                                    src={
                                      img ?? "/assets/img/innerpage/car-img.jpg"
                                    }
                                    alt="image"
                                  />
                                </SwiperSlide>
                              );
                            })}

                            {/* </div> */}
                          </Swiper>
                        )}
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="interior"
                      role="tabpanel"
                      aria-labelledby="interior-tab"
                    >
                      <div className="transport-img">
                        <div className="slider-btn-group">
                          <div className="product-stand-next swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                            </svg>
                          </div>
                          <div className="product-stand-prev swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                            </svg>
                          </div>
                        </div>

                        {trans?.images && trans?.images?.length > 0 && (
                          <Swiper
                            {...settings}
                            className="swiper product-img-slider"
                          >
                            <div className="swiper-wrapper">
                              {trans?.images?.map((img, index) => {
                                // big 994 552
                                // small 309  206

                                return (
                                  <SwiperSlide className="swiper-slide">
                                    <img
                                      src={
                                        trans?.images[1] ??
                                        "/assets/img/innerpage/car-img.jpg"
                                      }
                                      alt="image"
                                    />
                                  </SwiperSlide>
                                );
                              })}
                            </div>
                          </Swiper>
                        )}
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="video-clip"
                      role="tabpanel"
                      aria-labelledby="video-clip-tab"
                    >
                      <div className="transport-img">
                        <div className="slider-btn-group">
                          <div className="product-stand-next swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                            </svg>
                          </div>
                          <div className="product-stand-prev swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                            </svg>
                          </div>
                        </div>

                        {trans?.images && trans?.images?.length > 0 && (
                          <Swiper
                            {...settings}
                            className="swiper product-img-slider"
                          >
                            {trans?.images?.map((img, index) => {
                              // big 994 552
                              // small 309  206

                              return (
                                <SwiperSlide className="swiper-slide">
                                  <img
                                    src={
                                      trans?.images[2] ??
                                      "/assets/img/innerpage/car-img.jpg"
                                    }
                                    alt="image"
                                  />
                                </SwiperSlide>
                              );
                            })}
                          </Swiper>
                        )}
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="color-clip"
                      role="tabpanel"
                      aria-labelledby="color-clip-tab"
                    >
                      <div className="transport-img">
                        <div className="slider-btn-group">
                          <div className="product-stand-next swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                            </svg>
                          </div>
                          <div className="product-stand-prev swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                            </svg>
                          </div>
                        </div>

                        {trans?.images && trans?.images?.length > 0 && (
                          <Swiper
                            {...settings}
                            className="swiper product-img-slider"
                          >
                            {trans?.images?.map((img, index) => {
                              // big 994 552
                              // small 309  206

                              return (
                                <SwiperSlide className="swiper-slide">
                                  <img
                                    src={
                                      trans?.images[3] ??
                                      "/assets/img/innerpage/car-img.jpg"
                                    }
                                    alt="image"
                                  />
                                </SwiperSlide>
                              );
                            })}
                          </Swiper>
                        )}
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="color-clip2"
                      role="tabpanel"
                      aria-labelledby="color-clip2-tab"
                    >
                      <div className="transport-img">
                        <div className="slider-btn-group">
                          <div className="product-stand-next swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                            </svg>
                          </div>
                          <div className="product-stand-prev swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                            </svg>
                          </div>
                        </div>
                        {trans?.images && trans?.images?.length > 0 && (
                          <Swiper
                            {...settings}
                            className="swiper product-img-slider"
                          >
                            {trans?.images?.map((img, index) => {
                              // big 994 552
                              // small 309  206

                              return (
                                <SwiperSlide className="swiper-slide">
                                  <img
                                    src={
                                      trans?.images[4] ??
                                      "/assets/img/innerpage/car-img.jpg"
                                    }
                                    alt="image"
                                  />
                                </SwiperSlide>
                              );
                            })}
                          </Swiper>
                        )}
                      </div>
                    </div>
                  </div>
                  <ul className="nav nav-tabs" id="myTab5" role="tablist">
                    {trans?.images?.length > 0 && trans?.images[0] && (
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="exterior-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#exterior"
                          type="button"
                          role="tab"
                          aria-controls="exterior"
                          aria-selected="true"
                        >
                          <img
                            src={trans.images[0]}
                            // src="/assets/img/innerpage/tab-sm-img02.jpg"
                            alt=""
                          />
                        </button>
                      </li>
                    )}

                    {trans?.images?.length > 0 && trans?.images[1] && (
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="interior-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#interior"
                          type="button"
                          role="tab"
                          aria-controls="interior"
                          aria-selected="false"
                        >
                          <img
                            src={trans?.images[1]}
                            // src="/assets/img/innerpage/tab-sm-img01.jpg"
                            alt=""
                          />
                        </button>
                      </li>
                    )}

                    {trans?.images?.length > 0 && trans?.images[2] && (
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="video-clip-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#video-clip"
                          type="button"
                          role="tab"
                          aria-controls="video-clip"
                          aria-selected="false"
                        >
                          <img
                            src={trans?.images[2]}
                            // src="/assets/img/innerpage/tab-sm-img03.jpg"
                            alt=""
                          />
                        </button>
                      </li>
                    )}

                    {trans?.images?.length > 0 && trans?.images[3] && (
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="color-clip-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#color-clip"
                          type="button"
                          role="tab"
                          aria-controls="color-clip"
                          aria-selected="false"
                        >
                          <img
                            src={trans?.images[3]}
                            // src="/assets/img/innerpage/tab-sm-img04.jpg"
                            alt=""
                          />
                        </button>
                      </li>
                    )}

                    {trans?.images?.length > 0 && trans?.images[4] && (
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="color-clip2-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#color-clip2"
                          type="button"
                          role="tab"
                          aria-controls="color-clip2"
                          aria-selected="false"
                        >
                          <img
                            src={trans?.images[4]}
                            // src="/assets/img/innerpage/tab-sm-img05.jpg"
                            alt=""
                          />
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
                <h3 className=" ar">
                  {/* Travel to Sajek from Dhaka (4 ways to travel) */}
                  {trans?.title}
                </h3>
                <ul className="fetures ar">
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                    >
                      <g>
                        <mask
                          id="mask0_2770_3"
                          style={{ maskType: "luminance" }}
                          maskUnits="userSpaceOnUse"
                          x={0}
                          y={0}
                          width={14}
                          height={14}
                        >
                          <path d="M14 0H0V14H14V0Z" fill="white" />
                        </mask>
                        <g>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.290345 0.305287C0.477874 0.117817 0.732181 0.0125018 0.997345 0.0125018C1.26251 0.0125018 1.51682 0.117817 1.70434 0.305287L6.99735 5.59828L12.2903 0.305287C12.3826 0.209778 12.4929 0.133596 12.6149 0.0811869C12.7369 0.0287779 12.8682 0.00119157 13.0009 3.77571e-05C13.1337 -0.00111606 13.2654 0.0241854 13.3883 0.0744663C13.5112 0.124747 13.6229 0.199 13.7167 0.292893C13.8106 0.386786 13.8849 0.498438 13.9352 0.621335C13.9855 0.744231 14.0108 0.875911 14.0096 1.00869C14.0085 1.14147 13.9809 1.27269 13.9284 1.39469C13.876 1.5167 13.7998 1.62704 13.7043 1.71929L8.41135 7.01228L13.7043 12.3053C13.8865 12.4939 13.9873 12.7465 13.985 13.0087C13.9827 13.2709 13.8776 13.5217 13.6922 13.7071C13.5067 13.8925 13.256 13.9977 12.9938 14C12.7316 14.0022 12.479 13.9015 12.2903 13.7193L6.99735 8.42628L1.70434 13.7193C1.51574 13.9015 1.26314 14.0022 1.00094 14C0.738747 13.9977 0.487933 13.8925 0.302526 13.7071C0.117118 13.5217 0.0119492 13.2709 0.00967073 13.0087C0.00739232 12.7465 0.108187 12.4939 0.290345 12.3053L5.58335 7.01228L0.290345 1.71929C0.102874 1.53176 -0.00244141 1.27745 -0.00244141 1.01229C-0.00244141 0.747124 0.102874 0.492816 0.290345 0.305287Z"
                          />
                        </g>
                      </g>
                    </svg>
                    إلغاء مجاني
                    {/* Free Cancellation */}
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width={20}
                      height={20}
                      x={0}
                      y={0}
                      viewBox="0 0 512 512"
                      style={{ enableBackground: "new 0 0 512 512" }}
                      xmlSpace="preserve"
                    >
                      <g>
                        <path
                          d="M256.042 512h-.028c-5.523 0-10-4.477-10-10s4.477-10 10-10 10.014 4.477 10.014 10-4.463 10-9.986 10z"
                          opacity={1}
                          data-original="#000000"
                        />
                        <path
                          d="M414.061 369.245v-39.872l-.001-.165c-.456-27.735-10.892-48.256-31.903-62.735-17.493-12.055-39.509-17.987-60.8-23.723-6.067-1.635-11.896-3.205-17.501-4.88v-21.161c22.812-15.416 37.841-41.522 37.841-71.074v-10.712a31.52 31.52 0 0 0 3.335-2.882c11.212-11.212 12.184-28.84 2.929-41.173V50.761C347.96 22.771 325.189 0 297.2 0h-82.4c-27.989 0-50.76 22.771-50.76 50.761v40.108c-9.255 12.333-8.282 29.961 2.941 41.185a31.63 31.63 0 0 0 3.323 2.872v10.709c0 29.547 15.028 55.649 37.841 71.066v21.169c-5.605 1.675-11.435 3.246-17.501 4.88-21.291 5.736-43.307 11.668-60.8 23.723-21.012 14.479-31.447 35-31.903 62.735l-.001.165v39.872c-4.657 4.703-7.54 11.167-7.54 18.294v28.459c0 14.345 11.67 26.016 26.015 26.016h24.915c1.312 0 2.609-.068 3.889-.191v46.6c0 13.001 10.564 23.578 23.549 23.578h42.319c5.523 0 10-4.477 10-10s-4.477-10-10-10h-42.319c-1.924 0-3.549-1.638-3.549-3.578v-54.29c9.914-7.337 16.355-19.111 16.355-32.364s-6.442-25.026-16.355-32.364v-30.083c0-1.924 1.625-3.549 3.549-3.549h46.662v60.865a10 10 0 0 0 15.587 8.293l24.994-16.84 24.967 16.838a9.998 9.998 0 0 0 15.591-8.29v-60.865h46.662c1.939 0 3.577 1.625 3.577 3.549v30.063c-9.929 7.336-16.383 19.119-16.383 32.384s6.454 25.048 16.383 32.384v54.27c0 1.939-1.638 3.578-3.577 3.578h-42.319c-5.523 0-10 4.477-10 10s4.477 10 10 10h42.319c13 0 23.577-10.577 23.577-23.578v-46.597a40.38 40.38 0 0 0 3.861.189h24.915c14.345 0 26.015-11.67 26.015-26.016v-28.459c.002-7.128-2.881-13.593-7.538-18.296zM184.04 50.761C184.04 33.799 197.839 20 214.8 20h82.4c16.961 0 30.76 13.799 30.76 30.761v22.4C307.002 58.503 282.109 50.604 256 50.604s-51.002 7.898-71.96 22.557zm-2.929 67.139c-4.486-4.487-4.486-11.786-.001-16.273l.002-.001c20.004-20.004 46.6-31.021 74.888-31.021s54.884 11.017 74.888 31.021l.002.001c4.486 4.487 4.485 11.787.012 16.261-4.485 4.469-11.782 4.47-16.255.012-15.667-15.667-36.489-24.295-58.631-24.295s-42.964 8.628-58.619 24.283c-4.494 4.478-11.804 4.478-16.286.012zm9.193 27.735v-4.43c7.71-.257 15.345-3.306 21.222-9.163 11.889-11.889 27.688-18.437 44.488-18.437s32.6 6.547 44.501 18.449c5.863 5.843 13.482 8.886 21.181 9.145v4.437c0 36.234-29.465 65.712-65.682 65.712-36.232-.001-65.71-29.479-65.71-65.713zm93.551 81.042v18.538c0 15.352-12.489 27.842-27.841 27.842-15.367 0-27.869-12.49-27.869-27.842V226.67a85.3 85.3 0 0 0 27.869 4.677 85.27 85.27 0 0 0 27.841-4.67zm-167.44 195.337a6.022 6.022 0 0 1-6.015-6.016v-28.459a6.021 6.021 0 0 1 6.015-6.015h24.915c11.163 0 20.245 9.082 20.245 20.245s-9.082 20.245-20.245 20.245zm160.155-44.181-14.965-10.092a9.996 9.996 0 0 0-11.179-.002l-14.997 10.104v-42.069h41.141zm66.662-62.06H168.768c-12.985 0-23.549 10.564-23.549 23.549v22.393a40.639 40.639 0 0 0-3.889-.191h-23.391V329.46c.364-21.055 7.754-35.838 23.253-46.519 14.665-10.105 34.994-15.583 54.654-20.88 4.661-1.256 9.402-2.542 14.097-3.891 5.669 20.102 24.169 34.885 46.07 34.885 21.889 0 40.378-14.782 46.043-34.884 4.694 1.348 9.436 2.634 14.096 3.89 19.66 5.297 39.99 10.774 54.654 20.88 15.5 10.681 22.89 25.463 23.253 46.519v32.063H370.67c-1.303 0-2.59.068-3.861.189v-22.39c.001-12.985-10.576-23.549-23.577-23.549zm58.369 100.226a6.022 6.022 0 0 1-6.015 6.016H370.67c-3.235 0-6.284-.782-8.998-2.137a10.056 10.056 0 0 0-.735-.366c-6.259-3.448-10.511-10.106-10.511-17.742 0-11.163 9.082-20.245 20.244-20.245h24.915a6.021 6.021 0 0 1 6.015 6.015v28.459z"
                          opacity={1}
                          data-original="#000000"
                        />
                      </g>
                    </svg>
                    {/* Pay at Pickup */}
                    الدفع عند الاستلام
                  </li>

                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width={20}
                      height={20}
                      x={0}
                      y={0}
                      viewBox="0 0 512 512"
                      style={{ enableBackground: "new 0 0 512 512" }}
                      xmlSpace="preserve"
                    >
                      <g>
                        <path
                          d="M256.042 512h-.028c-5.523 0-10-4.477-10-10s4.477-10 10-10 10.014 4.477 10.014 10-4.463 10-9.986 10z"
                          opacity={1}
                          data-original="#000000"
                        />
                        <path
                          d="M414.061 369.245v-39.872l-.001-.165c-.456-27.735-10.892-48.256-31.903-62.735-17.493-12.055-39.509-17.987-60.8-23.723-6.067-1.635-11.896-3.205-17.501-4.88v-21.161c22.812-15.416 37.841-41.522 37.841-71.074v-10.712a31.52 31.52 0 0 0 3.335-2.882c11.212-11.212 12.184-28.84 2.929-41.173V50.761C347.96 22.771 325.189 0 297.2 0h-82.4c-27.989 0-50.76 22.771-50.76 50.761v40.108c-9.255 12.333-8.282 29.961 2.941 41.185a31.63 31.63 0 0 0 3.323 2.872v10.709c0 29.547 15.028 55.649 37.841 71.066v21.169c-5.605 1.675-11.435 3.246-17.501 4.88-21.291 5.736-43.307 11.668-60.8 23.723-21.012 14.479-31.447 35-31.903 62.735l-.001.165v39.872c-4.657 4.703-7.54 11.167-7.54 18.294v28.459c0 14.345 11.67 26.016 26.015 26.016h24.915c1.312 0 2.609-.068 3.889-.191v46.6c0 13.001 10.564 23.578 23.549 23.578h42.319c5.523 0 10-4.477 10-10s-4.477-10-10-10h-42.319c-1.924 0-3.549-1.638-3.549-3.578v-54.29c9.914-7.337 16.355-19.111 16.355-32.364s-6.442-25.026-16.355-32.364v-30.083c0-1.924 1.625-3.549 3.549-3.549h46.662v60.865a10 10 0 0 0 15.587 8.293l24.994-16.84 24.967 16.838a9.998 9.998 0 0 0 15.591-8.29v-60.865h46.662c1.939 0 3.577 1.625 3.577 3.549v30.063c-9.929 7.336-16.383 19.119-16.383 32.384s6.454 25.048 16.383 32.384v54.27c0 1.939-1.638 3.578-3.577 3.578h-42.319c-5.523 0-10 4.477-10 10s4.477 10 10 10h42.319c13 0 23.577-10.577 23.577-23.578v-46.597a40.38 40.38 0 0 0 3.861.189h24.915c14.345 0 26.015-11.67 26.015-26.016v-28.459c.002-7.128-2.881-13.593-7.538-18.296zM184.04 50.761C184.04 33.799 197.839 20 214.8 20h82.4c16.961 0 30.76 13.799 30.76 30.761v22.4C307.002 58.503 282.109 50.604 256 50.604s-51.002 7.898-71.96 22.557zm-2.929 67.139c-4.486-4.487-4.486-11.786-.001-16.273l.002-.001c20.004-20.004 46.6-31.021 74.888-31.021s54.884 11.017 74.888 31.021l.002.001c4.486 4.487 4.485 11.787.012 16.261-4.485 4.469-11.782 4.47-16.255.012-15.667-15.667-36.489-24.295-58.631-24.295s-42.964 8.628-58.619 24.283c-4.494 4.478-11.804 4.478-16.286.012zm9.193 27.735v-4.43c7.71-.257 15.345-3.306 21.222-9.163 11.889-11.889 27.688-18.437 44.488-18.437s32.6 6.547 44.501 18.449c5.863 5.843 13.482 8.886 21.181 9.145v4.437c0 36.234-29.465 65.712-65.682 65.712-36.232-.001-65.71-29.479-65.71-65.713zm93.551 81.042v18.538c0 15.352-12.489 27.842-27.841 27.842-15.367 0-27.869-12.49-27.869-27.842V226.67a85.3 85.3 0 0 0 27.869 4.677 85.27 85.27 0 0 0 27.841-4.67zm-167.44 195.337a6.022 6.022 0 0 1-6.015-6.016v-28.459a6.021 6.021 0 0 1 6.015-6.015h24.915c11.163 0 20.245 9.082 20.245 20.245s-9.082 20.245-20.245 20.245zm160.155-44.181-14.965-10.092a9.996 9.996 0 0 0-11.179-.002l-14.997 10.104v-42.069h41.141zm66.662-62.06H168.768c-12.985 0-23.549 10.564-23.549 23.549v22.393a40.639 40.639 0 0 0-3.889-.191h-23.391V329.46c.364-21.055 7.754-35.838 23.253-46.519 14.665-10.105 34.994-15.583 54.654-20.88 4.661-1.256 9.402-2.542 14.097-3.891 5.669 20.102 24.169 34.885 46.07 34.885 21.889 0 40.378-14.782 46.043-34.884 4.694 1.348 9.436 2.634 14.096 3.89 19.66 5.297 39.99 10.774 54.654 20.88 15.5 10.681 22.89 25.463 23.253 46.519v32.063H370.67c-1.303 0-2.59.068-3.861.189v-22.39c.001-12.985-10.576-23.549-23.577-23.549zm58.369 100.226a6.022 6.022 0 0 1-6.015 6.016H370.67c-3.235 0-6.284-.782-8.998-2.137a10.056 10.056 0 0 0-.735-.366c-6.259-3.448-10.511-10.106-10.511-17.742 0-11.163 9.082-20.245 20.244-20.245h24.915a6.021 6.021 0 0 1 6.015 6.015v28.459z"
                          opacity={1}
                          data-original="#000000"
                        />
                      </g>
                    </svg>
                    {/* Pay at Pickup */}
                    من : {trans?.from}
                  </li>

                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width={20}
                      height={20}
                      x={0}
                      y={0}
                      viewBox="0 0 512 512"
                      style={{ enableBackground: "new 0 0 512 512" }}
                      xmlSpace="preserve"
                    >
                      <g>
                        <path
                          d="M256.042 512h-.028c-5.523 0-10-4.477-10-10s4.477-10 10-10 10.014 4.477 10.014 10-4.463 10-9.986 10z"
                          opacity={1}
                          data-original="#000000"
                        />
                        <path
                          d="M414.061 369.245v-39.872l-.001-.165c-.456-27.735-10.892-48.256-31.903-62.735-17.493-12.055-39.509-17.987-60.8-23.723-6.067-1.635-11.896-3.205-17.501-4.88v-21.161c22.812-15.416 37.841-41.522 37.841-71.074v-10.712a31.52 31.52 0 0 0 3.335-2.882c11.212-11.212 12.184-28.84 2.929-41.173V50.761C347.96 22.771 325.189 0 297.2 0h-82.4c-27.989 0-50.76 22.771-50.76 50.761v40.108c-9.255 12.333-8.282 29.961 2.941 41.185a31.63 31.63 0 0 0 3.323 2.872v10.709c0 29.547 15.028 55.649 37.841 71.066v21.169c-5.605 1.675-11.435 3.246-17.501 4.88-21.291 5.736-43.307 11.668-60.8 23.723-21.012 14.479-31.447 35-31.903 62.735l-.001.165v39.872c-4.657 4.703-7.54 11.167-7.54 18.294v28.459c0 14.345 11.67 26.016 26.015 26.016h24.915c1.312 0 2.609-.068 3.889-.191v46.6c0 13.001 10.564 23.578 23.549 23.578h42.319c5.523 0 10-4.477 10-10s-4.477-10-10-10h-42.319c-1.924 0-3.549-1.638-3.549-3.578v-54.29c9.914-7.337 16.355-19.111 16.355-32.364s-6.442-25.026-16.355-32.364v-30.083c0-1.924 1.625-3.549 3.549-3.549h46.662v60.865a10 10 0 0 0 15.587 8.293l24.994-16.84 24.967 16.838a9.998 9.998 0 0 0 15.591-8.29v-60.865h46.662c1.939 0 3.577 1.625 3.577 3.549v30.063c-9.929 7.336-16.383 19.119-16.383 32.384s6.454 25.048 16.383 32.384v54.27c0 1.939-1.638 3.578-3.577 3.578h-42.319c-5.523 0-10 4.477-10 10s4.477 10 10 10h42.319c13 0 23.577-10.577 23.577-23.578v-46.597a40.38 40.38 0 0 0 3.861.189h24.915c14.345 0 26.015-11.67 26.015-26.016v-28.459c.002-7.128-2.881-13.593-7.538-18.296zM184.04 50.761C184.04 33.799 197.839 20 214.8 20h82.4c16.961 0 30.76 13.799 30.76 30.761v22.4C307.002 58.503 282.109 50.604 256 50.604s-51.002 7.898-71.96 22.557zm-2.929 67.139c-4.486-4.487-4.486-11.786-.001-16.273l.002-.001c20.004-20.004 46.6-31.021 74.888-31.021s54.884 11.017 74.888 31.021l.002.001c4.486 4.487 4.485 11.787.012 16.261-4.485 4.469-11.782 4.47-16.255.012-15.667-15.667-36.489-24.295-58.631-24.295s-42.964 8.628-58.619 24.283c-4.494 4.478-11.804 4.478-16.286.012zm9.193 27.735v-4.43c7.71-.257 15.345-3.306 21.222-9.163 11.889-11.889 27.688-18.437 44.488-18.437s32.6 6.547 44.501 18.449c5.863 5.843 13.482 8.886 21.181 9.145v4.437c0 36.234-29.465 65.712-65.682 65.712-36.232-.001-65.71-29.479-65.71-65.713zm93.551 81.042v18.538c0 15.352-12.489 27.842-27.841 27.842-15.367 0-27.869-12.49-27.869-27.842V226.67a85.3 85.3 0 0 0 27.869 4.677 85.27 85.27 0 0 0 27.841-4.67zm-167.44 195.337a6.022 6.022 0 0 1-6.015-6.016v-28.459a6.021 6.021 0 0 1 6.015-6.015h24.915c11.163 0 20.245 9.082 20.245 20.245s-9.082 20.245-20.245 20.245zm160.155-44.181-14.965-10.092a9.996 9.996 0 0 0-11.179-.002l-14.997 10.104v-42.069h41.141zm66.662-62.06H168.768c-12.985 0-23.549 10.564-23.549 23.549v22.393a40.639 40.639 0 0 0-3.889-.191h-23.391V329.46c.364-21.055 7.754-35.838 23.253-46.519 14.665-10.105 34.994-15.583 54.654-20.88 4.661-1.256 9.402-2.542 14.097-3.891 5.669 20.102 24.169 34.885 46.07 34.885 21.889 0 40.378-14.782 46.043-34.884 4.694 1.348 9.436 2.634 14.096 3.89 19.66 5.297 39.99 10.774 54.654 20.88 15.5 10.681 22.89 25.463 23.253 46.519v32.063H370.67c-1.303 0-2.59.068-3.861.189v-22.39c.001-12.985-10.576-23.549-23.577-23.549zm58.369 100.226a6.022 6.022 0 0 1-6.015 6.016H370.67c-3.235 0-6.284-.782-8.998-2.137a10.056 10.056 0 0 0-.735-.366c-6.259-3.448-10.511-10.106-10.511-17.742 0-11.163 9.082-20.245 20.244-20.245h24.915a6.021 6.021 0 0 1 6.015 6.015v28.459z"
                          opacity={1}
                          data-original="#000000"
                        />
                      </g>
                    </svg>
                    {/* Pay at Pickup */}
                    الى: {trans?.to}
                  </li>

                  {/* <li>


                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 14 14"
                  >
                    <path d="M12.355 5.79446L11.6018 5.57163C11.5058 5.54339 11.4145 5.47737 11.3346 5.3784C11.2547 5.27948 11.1882 5.15003 11.1401 4.99957L10.0999 1.76401C9.92742 1.2287 9.67856 0.78376 9.37846 0.474057C9.07834 0.164306 8.73761 0.000826392 8.39059 0H4.7344C4.38741 0.000777781 4.04668 0.164209 3.74658 0.473863C3.44646 0.783517 3.1976 1.22841 3.02509 1.76362L1.96416 5.06413C1.92003 5.20063 1.86089 5.31992 1.79028 5.41496C1.71966 5.50994 1.63901 5.57873 1.55312 5.61713L0.828187 5.93913C0.647691 6.01944 0.481758 6.18054 0.346177 6.40706C0.210594 6.63364 0.109872 6.91807 0.0535937 7.23336C0.0511875 7.24347 0.0509687 7.25552 0.049 7.26602C0.0173298 7.4473 0.000819981 7.63586 0 7.82564V10.5C0.000347345 11.0156 0.115693 11.5098 0.320737 11.8743C0.525779 12.2388 0.803775 12.4439 1.09375 12.4445H1.89984C2.02356 12.9098 2.21909 13.303 2.46365 13.5784C2.70822 13.8538 2.99176 14 3.28125 14C3.57074 14 3.85429 13.8538 4.09885 13.5784C4.34342 13.303 4.53892 12.9098 4.66265 12.4445H9.33734C9.46107 12.9098 9.65658 13.303 9.90114 13.5784C10.1457 13.8538 10.4293 14 10.7187 14C11.0082 14 11.2918 13.8538 11.5363 13.5784C11.7809 13.303 11.9764 12.9098 12.1002 12.4445H12.9062C13.1962 12.4439 13.4742 12.2388 13.6793 11.8743C13.8843 11.5098 13.9996 11.0156 14 10.5V9.24664C14.0012 8.41763 13.8363 7.61496 13.5348 6.98238C13.2334 6.3498 12.8152 5.92873 12.355 5.79446ZM13.3206 7.7778C13.4071 8.01756 13.4718 8.28001 13.5124 8.55559H13.3437C13.1702 8.55549 13.0037 8.43362 12.8804 8.21647C12.8111 8.09232 12.7581 7.94255 12.7251 7.7778H13.3206ZM0.439687 7.7778H0.813531L0.704156 8.55559H0.4375V7.82564C0.4375 7.80931 0.439469 7.79375 0.439687 7.7778ZM3.28125 13.2223C3.06493 13.2223 2.85346 13.1082 2.67359 12.8946C2.49373 12.6809 2.35354 12.3772 2.27076 12.0219C2.18797 11.6666 2.16631 11.2757 2.20852 10.8985C2.25072 10.5213 2.35489 10.1748 2.50785 9.9029C2.66081 9.63096 2.8557 9.44576 3.06786 9.37075C3.28005 9.29569 3.49994 9.33419 3.6998 9.48139C3.89965 9.62853 4.0705 9.87776 4.19067 10.1975C4.31085 10.5173 4.375 10.8933 4.375 11.2778C4.37464 11.7933 4.25931 12.2876 4.05426 12.6521C3.84923 13.0166 3.57123 13.2216 3.28125 13.2223ZM10.7187 13.2223C10.5024 13.2223 10.291 13.1082 10.1111 12.8946C9.93122 12.6809 9.79103 12.3772 9.70826 12.0219C9.62546 11.6666 9.6038 11.2757 9.64602 10.8985C9.68821 10.5213 9.79239 10.1748 9.94535 9.9029C10.0983 9.63096 10.2932 9.44576 10.5054 9.37075C10.7175 9.29569 10.9374 9.33419 11.1373 9.48139C11.3372 9.62853 11.508 9.87776 11.6282 10.1975C11.7483 10.5173 11.8125 10.8933 11.8125 11.2778C11.8121 11.7933 11.6968 12.2876 11.4918 12.6521C11.2867 13.0166 11.0087 13.2216 10.7187 13.2223ZM12.9062 11.6667H12.2325C12.2657 11.279 12.2515 10.8831 12.1907 10.5061C12.1299 10.1291 12.024 9.77991 11.8803 9.48241C11.7365 9.18496 11.5583 8.94618 11.3578 8.7825C11.1573 8.61883 10.9394 8.5341 10.7187 8.5341C10.4981 8.5341 10.2802 8.61883 10.0797 8.7825C9.87921 8.94618 9.70098 9.18496 9.55724 9.48241C9.41349 9.77991 9.30759 10.1291 9.2468 10.5061C9.18599 10.8831 9.17175 11.279 9.205 11.6667H4.795C4.82825 11.279 4.814 10.8831 4.75319 10.5061C4.6924 10.1291 4.5865 9.77991 4.44276 9.48241C4.29901 9.18496 4.12078 8.94618 3.92033 8.7825C3.71984 8.61883 3.50186 8.5341 3.28125 8.5341C3.06064 8.5341 2.84265 8.61883 2.64218 8.7825C2.4417 8.94618 2.26349 9.18496 2.11974 9.48241C1.97599 9.77991 1.87009 10.1291 1.8093 10.5061C1.7485 10.8831 1.73424 11.279 1.7675 11.6667H1.09375C0.919701 11.6667 0.752781 11.5438 0.62971 11.325C0.506641 11.1062 0.4375 10.8094 0.4375 10.5V9.33337H0.875C0.923764 9.33337 0.971132 9.30439 1.00958 9.25107C1.04802 9.19774 1.07534 9.12307 1.08719 9.03898L1.30594 7.48341C1.31402 7.42605 1.31464 7.36621 1.30775 7.30836C1.30086 7.25057 1.28665 7.19627 1.2662 7.14965C1.24574 7.10308 1.21958 7.06536 1.1897 7.03945C1.15981 7.01349 1.127 7.00002 1.09375 7.00002H0.631968C0.715364 6.85118 0.819929 6.7454 0.9345 6.69397L1.65966 6.37158C1.80265 6.30741 1.93692 6.19274 2.05447 6.03436C2.17203 5.87603 2.27045 5.67726 2.34391 5.44991L3.40484 2.1494C3.53905 1.73314 3.73264 1.38712 3.96607 1.14635C4.19951 0.905531 4.46452 0.778412 4.7344 0.77778H8.39059C8.66047 0.778412 8.92549 0.905531 9.15892 1.14635C9.39235 1.38712 9.58595 1.73314 9.72015 2.1494L10.7601 5.38496C10.8403 5.63589 10.9511 5.85178 11.0842 6.01681C11.2174 6.1819 11.3697 6.2919 11.5299 6.33891L12.283 6.56213C12.5033 6.62693 12.7129 6.77636 12.8973 7.00002H12.4687C12.4107 7.00002 12.3551 7.041 12.3141 7.11392C12.273 7.18684 12.25 7.28576 12.25 7.38891C12.2499 7.64432 12.278 7.89729 12.333 8.13335C12.3879 8.36936 12.4684 8.58383 12.57 8.76442C12.6716 8.94501 12.7922 9.08827 12.925 9.18588C13.0578 9.28349 13.2001 9.33361 13.3437 9.33337H13.5625V10.5C13.5625 10.8094 13.4933 11.1062 13.3703 11.325C13.2472 11.5438 13.0803 11.6667 12.9062 11.6667Z" />
                    <path d="M9.94393 3.6887C9.91405 3.60028 9.86565 3.53655 9.80932 3.51156C9.75302 3.48658 9.69344 3.50237 9.6437 3.55551C9.59396 3.60864 9.55811 3.69468 9.54406 3.79482C9.53001 3.89491 9.53889 4.00083 9.56878 4.08926L9.89493 5.05565H7.21875V1.94453H8.47328C8.58656 1.94506 8.69788 1.99751 8.79645 2.09673C8.89503 2.19599 8.97758 2.33872 9.03612 2.51114L9.17481 2.92259C9.2047 3.01101 9.2531 3.07474 9.30942 3.09973C9.36572 3.12471 9.42531 3.10891 9.47504 3.05578C9.52478 3.00265 9.56063 2.91661 9.57468 2.81647C9.58874 2.71638 9.57985 2.61045 9.54997 2.52203L9.41106 2.11058C9.3135 1.82329 9.17599 1.58558 9.01173 1.42026C8.84748 1.25493 8.66203 1.16762 8.47328 1.16675H7C6.94197 1.16675 6.88633 1.20773 6.84531 1.28064C6.8043 1.35356 6.78125 1.45249 6.78125 1.55564V5.44454C6.78125 5.54769 6.8043 5.64662 6.84531 5.71953C6.88633 5.79245 6.94197 5.83343 7 5.83343H10.2812C10.32 5.83343 10.358 5.81515 10.3914 5.78045C10.4249 5.74579 10.4525 5.69591 10.4716 5.63602C10.4907 5.57608 10.5004 5.50827 10.4999 5.43944C10.4994 5.3706 10.4886 5.30328 10.4687 5.24426L9.94393 3.6887ZM6.125 1.16675H4.65172C4.46296 1.16762 4.27752 1.25493 4.11326 1.42026C3.94901 1.58558 3.8115 1.82329 3.71394 2.11058L2.65628 5.24426C2.63634 5.30328 2.62557 5.3706 2.62506 5.43944C2.62455 5.50827 2.63433 5.57608 2.65339 5.63602C2.67246 5.69591 2.70012 5.74579 2.73357 5.78045C2.76702 5.81515 2.80503 5.83343 2.84375 5.83343H6.125C6.18302 5.83343 6.23867 5.79245 6.27968 5.71953C6.3207 5.64662 6.34375 5.54769 6.34375 5.44454V1.55564C6.34375 1.45249 6.3207 1.35356 6.27968 1.28064C6.23867 1.20773 6.18302 1.16675 6.125 1.16675ZM5.90625 5.05565H3.23006L4.08887 2.51114C4.14742 2.33872 4.22997 2.19599 4.32854 2.09673C4.42712 1.99751 4.53843 1.94506 4.65172 1.94453H5.90625V5.05565ZM7.4375 6.22232H7C6.94197 6.22232 6.88633 6.2633 6.84531 6.33622C6.8043 6.40913 6.78125 6.50806 6.78125 6.61121C6.78125 6.71436 6.8043 6.81329 6.84531 6.88621C6.88633 6.95912 6.94197 7.0001 7 7.0001H7.4375C7.49552 7.0001 7.55117 6.95912 7.59218 6.88621C7.6332 6.81329 7.65625 6.71436 7.65625 6.61121C7.65625 6.50806 7.6332 6.40913 7.59218 6.33622C7.55117 6.2633 7.49552 6.22232 7.4375 6.22232ZM3.28125 6.22232H2.84375C2.78573 6.22232 2.7301 6.2633 2.68907 6.33622C2.64805 6.40913 2.625 6.50806 2.625 6.61121C2.625 6.71436 2.64805 6.81329 2.68907 6.88621C2.7301 6.95912 2.78573 7.0001 2.84375 7.0001H3.28125C3.33927 7.0001 3.39492 6.95912 3.43593 6.88621C3.47695 6.81329 3.5 6.71436 3.5 6.61121C3.5 6.50806 3.47695 6.40913 3.43593 6.33622C3.39492 6.2633 3.33927 6.22232 3.28125 6.22232ZM10.7187 10.1112C10.5889 10.1112 10.4621 10.1797 10.3541 10.3079C10.2462 10.436 10.1621 10.6182 10.1125 10.8314C10.0628 11.0446 10.0498 11.2792 10.0751 11.5055C10.1004 11.7318 10.1629 11.9397 10.2547 12.1029C10.3465 12.266 10.4634 12.3771 10.5907 12.4222C10.718 12.4672 10.85 12.4441 10.9699 12.3558C11.0898 12.2675 11.1923 12.1179 11.2644 11.9261C11.3365 11.7342 11.375 11.5087 11.375 11.2779C11.375 10.9685 11.3058 10.6717 11.1828 10.4529C11.0597 10.2342 10.8928 10.1112 10.7187 10.1112ZM10.7187 11.6668C10.6755 11.6668 10.6332 11.644 10.5972 11.6013C10.5612 11.5585 10.5332 11.4978 10.5166 11.4267C10.5001 11.3557 10.4958 11.2775 10.5042 11.202C10.5126 11.1266 10.5335 11.0573 10.5641 11.0029C10.5947 10.9485 10.6336 10.9115 10.6761 10.8965C10.7185 10.8815 10.7625 10.8892 10.8024 10.9186C10.8424 10.948 10.8766 10.9979 10.9006 11.0618C10.9247 11.1258 10.9375 11.201 10.9375 11.2779C10.9375 11.381 10.9144 11.48 10.8734 11.5529C10.8324 11.6258 10.7768 11.6668 10.7187 11.6668ZM3.28125 10.1112C3.15145 10.1112 3.02457 10.1797 2.91665 10.3079C2.80875 10.436 2.72462 10.6182 2.67495 10.8314C2.62528 11.0446 2.61229 11.2792 2.63761 11.5055C2.66293 11.7318 2.72543 11.9397 2.8172 12.1029C2.90899 12.266 3.02591 12.3771 3.15323 12.4222C3.28051 12.4672 3.41247 12.4441 3.53237 12.3558C3.6523 12.2675 3.75479 12.1179 3.82689 11.9261C3.899 11.7342 3.9375 11.5087 3.9375 11.2779C3.9375 10.9685 3.86835 10.6717 3.7453 10.4529C3.62223 10.2342 3.45529 10.1112 3.28125 10.1112ZM3.28125 11.6668C3.23799 11.6668 3.19569 11.644 3.15971 11.6013C3.12375 11.5585 3.0957 11.4978 3.07915 11.4267C3.06258 11.3557 3.05826 11.2775 3.06671 11.202C3.07513 11.1266 3.09597 11.0573 3.12657 11.0029C3.15716 10.9485 3.19613 10.9115 3.23857 10.8965C3.281 10.8815 3.325 10.8892 3.36495 10.9186C3.40493 10.948 3.43911 10.9979 3.46314 11.0618C3.48718 11.1258 3.5 11.201 3.5 11.2779C3.5 11.381 3.47695 11.48 3.43593 11.5529C3.39492 11.6258 3.33927 11.6668 3.28125 11.6668Z" />
                  </svg>
                  Shuttle to Car
                </li> */}
                </ul>

                {trans?.description && (
                  <p className=" ar">{parse(trans?.description)}</p>
                )}

                {/* <h4>Included and Excluded</h4>
              <div className="includ-and-exclud-area mb-20">
                <ul>
                  <li>
                    <i className="bi bi-check-lg" /> Specify the modes of
                    transportation included (flights, trains, buses, etc.).
                  </li>
                  <li>
                    <i className="bi bi-check-lg" /> Clarify if it covers
                    transfers between destinations or if it's limited to
                    specific legs of the journey.
                  </li>
                  <li>
                    <i className="bi bi-check-lg" /> Mention the type of
                    accommodation provided (hotels, hostels, etc.).
                  </li>
                  <li>
                    <i className="bi bi-check-lg" /> Specify the number of
                    nights included and the room type (single, double, etc.).
                  </li>
                  <li>
                    <i className="bi bi-check-lg" /> Any additional services
                    like travel insurance, Wi-Fi access, or specific amenities.
                  </li>
                </ul>
                <ul className="exclud">
                  <li>
                    <i className="bi bi-x-lg" /> Specify activities or tours not
                    included but available as optional extras.
                  </li>
                  <li>
                    <i className="bi bi-x-lg" /> Clarify that personal expenses
                    such as souvenirs, extra meals, or additional transportation
                    outside the tour schedule are not included.
                  </li>
                  <li>
                    <i className="bi bi-x-lg" /> Highlight that travel insurance
                    is not included (if applicable) and recommend purchasing it
                    separately.
                  </li>
                  <li>
                    <i className="bi bi-x-lg" /> Specify that costs related to
                    visas or permits are not part of the package.
                  </li>
                  <li>
                    <i className="bi bi-x-lg" /> Indicate that tips for guides,
                    drivers, or any other service providers are not included
                  </li>
                </ul>
              </div>
             
              */}
              </div>
              <div className="col-lg-4">
                <div className="transport-sidebar">
                  <div className="booking-form-wrap ar">
                    <h4>حجز وسائل النقل الخاصة بك</h4>
                    {/* <p>
                      Reserve your beautiful travel: Dhaka-Sajek Valley
                      transportation for a peaceful adventure.
                    </p> */}

                    <div className="tab-content" id="v-pills-tabContent2">
                      <div className="sidebar-booking-form">
                        <form>
                          {/* ---transport type--- */}
                          <div className="transport-type ar">
                            <h6>اختر نوع المركبة :</h6>
                            <ul>
                              {trans?.iscar && (
                                <li className="privet">
                                  <div className="form-check">
                                    <input
                                      onChange={inputChange}
                                      className="form-check-input"
                                      type="radio"
                                      name="transportType"
                                      id="car"
                                      defaultValue="car"
                                      defaultChecked
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="car"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={60}
                                        height={50}
                                        viewBox="0 0 50 30"
                                      >
                                        <path d="M44.125 12.4167L41.4351 11.9392C41.092 11.8787 40.7659 11.7373 40.4806 11.5252C40.1953 11.3131 39.9579 11.0358 39.7859 10.7134L36.0711 3.78001C35.4551 2.63294 34.5663 1.67947 33.4945 1.0158C32.4227 0.352133 31.2057 0.00174827 29.9664 0H16.9086C15.6693 0.00166413 14.4524 0.351923 13.3806 1.01544C12.3088 1.67896 11.42 2.63226 10.8039 3.77918L7.01484 10.8517C6.85724 11.1442 6.64605 11.3999 6.39384 11.6035C6.14164 11.807 5.8536 11.9544 5.54687 12.0367L2.95781 12.7267C2.31318 12.8988 1.72057 13.244 1.23634 13.7295C0.752121 14.2149 0.3924 14.8244 0.191406 15.5001C0.182812 15.5217 0.182031 15.5476 0.175 15.5701C0.0618921 15.9585 0.0029285 16.3625 0 16.7692L0 22.5001C0.00124051 23.6047 0.413189 24.6638 1.14548 25.4449C1.87778 26.226 2.87063 26.6654 3.90625 26.6668H6.78515C7.22701 27.6638 7.92531 28.5065 8.79876 29.0966C9.6722 29.6867 10.6848 30 11.7187 30C12.7527 30 13.7653 29.6867 14.6387 29.0966C15.5122 28.5065 16.2105 27.6638 16.6523 26.6668H33.3476C33.7895 27.6638 34.4878 28.5065 35.3612 29.0966C36.2347 29.6867 37.2473 30 38.2812 30C39.3151 30 40.3278 29.6867 41.2012 29.0966C42.0747 28.5065 42.773 27.6638 43.2148 26.6668H46.0937C47.1293 26.6654 48.1222 26.226 48.8545 25.4449C49.5868 24.6638 49.9987 23.6047 50 22.5001V19.8142C50.0041 18.0378 49.4152 16.3177 48.3387 14.9623C47.2622 13.6068 45.7684 12.7044 44.125 12.4167ZM47.5734 16.6667C47.8824 17.1805 48.1136 17.7429 48.2586 18.3334H47.6562C47.0364 18.3332 46.4418 18.0721 46.0015 17.6067C45.7541 17.3407 45.5647 17.0198 45.4469 16.6667H47.5734ZM1.57031 16.6667H2.90547L2.51484 18.3334H1.5625V16.7692C1.5625 16.7342 1.56953 16.7009 1.57031 16.6667ZM11.7187 28.3334C10.9462 28.3334 10.1909 28.0891 9.54855 27.6312C8.90617 27.1734 8.4055 26.5226 8.10984 25.7613C7.81419 24.9999 7.73683 24.1621 7.88755 23.3539C8.03828 22.5456 8.41031 21.8032 8.95661 21.2205C9.50291 20.6377 10.1989 20.2409 10.9567 20.0801C11.7144 19.9194 12.4998 20.0019 13.2136 20.3172C13.9274 20.6326 14.5374 21.1667 14.9667 21.8519C15.3959 22.5371 15.625 23.3427 15.625 24.1668C15.6238 25.2714 15.2118 26.3305 14.4795 27.1116C13.7472 27.8927 12.7544 28.3321 11.7187 28.3334ZM38.2812 28.3334C37.5086 28.3334 36.7534 28.0891 36.111 27.6312C35.4687 27.1734 34.968 26.5226 34.6723 25.7613C34.3767 24.9999 34.2993 24.1621 34.45 23.3539C34.6008 22.5456 34.9728 21.8032 35.5191 21.2205C36.0654 20.6377 36.7614 20.2409 37.5192 20.0801C38.2769 19.9194 39.0623 20.0019 39.7761 20.3172C40.4899 20.6326 41.0999 21.1667 41.5292 21.8519C41.9584 22.5371 42.1875 23.3427 42.1875 24.1668C42.1862 25.2714 41.7743 26.3305 41.042 27.1116C40.3097 27.8927 39.3169 28.3321 38.2812 28.3334ZM46.0937 25.0001H43.6875C43.8063 24.1693 43.7553 23.3209 43.5382 22.5131C43.3211 21.7052 42.9429 20.957 42.4295 20.3195C41.9161 19.682 41.2796 19.1704 40.5636 18.8197C39.8477 18.4689 39.0691 18.2873 38.2812 18.2873C37.4934 18.2873 36.7148 18.4689 35.9988 18.8197C35.2829 19.1704 34.6464 19.682 34.133 20.3195C33.6196 20.957 33.2414 21.7052 33.0243 22.5131C32.8071 23.3209 32.7562 24.1693 32.875 25.0001H17.125C17.2438 24.1693 17.1928 23.3209 16.9757 22.5131C16.7586 21.7052 16.3804 20.957 15.867 20.3195C15.3536 19.682 14.7171 19.1704 14.0011 18.8197C13.2852 18.4689 12.5066 18.2873 11.7187 18.2873C10.9309 18.2873 10.1523 18.4689 9.43634 18.8197C8.72037 19.1704 8.0839 19.682 7.5705 20.3195C7.0571 20.957 6.6789 21.7052 6.46177 22.5131C6.24464 23.3209 6.19372 24.1693 6.3125 25.0001H3.90625C3.28465 25.0001 2.68851 24.7367 2.24897 24.2679C1.80943 23.799 1.5625 23.1631 1.5625 22.5001V20.0001H3.125C3.29916 20.0001 3.46833 19.938 3.60563 19.8237C3.74293 19.7094 3.84049 19.5494 3.88281 19.3692L4.66406 16.0359C4.69292 15.913 4.69513 15.7847 4.67054 15.6608C4.64595 15.5369 4.59519 15.4206 4.52213 15.3207C4.44907 15.2208 4.35563 15.1401 4.24891 15.0845C4.14219 15.0289 4.025 15.0001 3.90625 15.0001H2.25703C2.55487 14.6811 2.92831 14.4544 3.3375 14.3442L5.92734 13.6534C6.43804 13.5158 6.91757 13.2701 7.3374 12.9308C7.75723 12.5915 8.10877 12.1656 8.37109 11.6784L12.1602 4.60585C12.6395 3.71385 13.3308 2.97245 14.1645 2.45642C14.9982 1.9404 15.9447 1.66799 16.9086 1.66667H29.9664C30.9303 1.66799 31.8768 1.9404 32.7105 2.45642C33.5441 2.97245 34.2355 3.71385 34.7148 4.60585L38.4289 11.5392C38.7154 12.0769 39.1109 12.5395 39.5866 12.8932C40.0622 13.2469 40.606 13.4827 41.1781 13.5834L43.8679 14.0617C44.6545 14.2005 45.4032 14.5208 46.0617 15.0001H44.5312C44.324 15.0001 44.1253 15.0879 43.9788 15.2441C43.8323 15.4004 43.75 15.6124 43.75 15.8334C43.7495 16.3807 43.8502 16.9228 44.0463 17.4286C44.2424 17.9343 44.5301 18.3939 44.8929 18.7809C45.2558 19.1679 45.6866 19.4748 46.1608 19.684C46.6349 19.8932 47.1431 20.0006 47.6562 20.0001H48.4375V22.5001C48.4375 23.1631 48.1905 23.799 47.751 24.2679C47.3115 24.7367 46.7153 25.0001 46.0937 25.0001Z" />
                                        <path d="M35.5141 7.90419C35.4073 7.71467 35.2344 7.57812 35.0333 7.5246C34.8322 7.47107 34.6195 7.50495 34.4418 7.61877C34.2641 7.73259 34.1361 7.91704 34.0859 8.13153C34.0357 8.34603 34.0675 8.573 34.1742 8.76252L35.3391 10.8334H25.7812V4.16667H30.2617C30.6663 4.16785 31.0638 4.28019 31.4159 4.49286C31.768 4.70552 32.0628 5.01134 32.2719 5.38084L32.7672 6.26251C32.8739 6.45203 33.0468 6.58858 33.2479 6.6421C33.449 6.69563 33.6618 6.66175 33.8394 6.54793C34.0171 6.43411 34.1451 6.24966 34.1953 6.03517C34.2455 5.82067 34.2137 5.5937 34.107 5.40418L33.6109 4.52251C33.2625 3.90693 32.7714 3.39746 32.1847 3.04321C31.5981 2.68897 30.9358 2.50188 30.2617 2.5H25C24.7928 2.5 24.5941 2.5878 24.4476 2.74408C24.3011 2.90036 24.2187 3.11232 24.2187 3.33334V11.6667C24.2187 11.8877 24.3011 12.0997 24.4476 12.256C24.5941 12.4122 24.7928 12.5 25 12.5H36.7187C36.857 12.5 36.9928 12.4608 37.1123 12.3865C37.2317 12.3122 37.3305 12.2054 37.3986 12.077C37.4667 11.9486 37.5016 11.8033 37.4998 11.6558C37.498 11.5083 37.4595 11.364 37.3883 11.2375L35.5141 7.90419ZM21.875 2.5H16.6133C15.9392 2.50188 15.2769 2.68897 14.6903 3.04321C14.1036 3.39746 13.6125 3.90693 13.2641 4.52251L9.48672 11.2375C9.41551 11.364 9.37703 11.5083 9.37522 11.6558C9.3734 11.8033 9.40832 11.9486 9.47641 12.077C9.54449 12.2054 9.6433 12.3122 9.76274 12.3865C9.88218 12.4608 10.018 12.5 10.1563 12.5H21.875C22.0822 12.5 22.2809 12.4122 22.4274 12.256C22.5739 12.0997 22.6562 11.8877 22.6562 11.6667V3.33334C22.6562 3.11232 22.5739 2.90036 22.4274 2.74408C22.2809 2.5878 22.0822 2.5 21.875 2.5ZM21.0937 10.8334H11.5359L14.6031 5.38084C14.8122 5.01134 15.107 4.70552 15.4591 4.49286C15.8112 4.28019 16.2087 4.16785 16.6133 4.16667H21.0937V10.8334ZM26.5625 13.3334H25C24.7928 13.3334 24.5941 13.4212 24.4476 13.5775C24.3011 13.7337 24.2187 13.9457 24.2187 14.1667C24.2187 14.3877 24.3011 14.5997 24.4476 14.756C24.5941 14.9122 24.7928 15 25 15H26.5625C26.7697 15 26.9684 14.9122 27.1149 14.756C27.2614 14.5997 27.3437 14.3877 27.3437 14.1667C27.3437 13.9457 27.2614 13.7337 27.1149 13.5775C26.9684 13.4212 26.7697 13.3334 26.5625 13.3334ZM11.7188 13.3334H10.1563C9.94905 13.3334 9.75034 13.4212 9.60382 13.5775C9.45731 13.7337 9.375 13.9457 9.375 14.1667C9.375 14.3877 9.45731 14.5997 9.60382 14.756C9.75034 14.9122 9.94905 15 10.1563 15H11.7188C11.926 15 12.1247 14.9122 12.2712 14.756C12.4177 14.5997 12.5 14.3877 12.5 14.1667C12.5 13.9457 12.4177 13.7337 12.2712 13.5775C12.1247 13.4212 11.926 13.3334 11.7188 13.3334ZM38.2812 21.6667C37.8177 21.6667 37.3645 21.8134 36.9791 22.0881C36.5937 22.3628 36.2933 22.7532 36.1159 23.21C35.9385 23.6669 35.8921 24.1695 35.9825 24.6545C36.073 25.1394 36.2962 25.5849 36.624 25.9345C36.9517 26.2841 37.3694 26.5223 37.824 26.6187C38.2786 26.7152 38.7499 26.6657 39.1781 26.4765C39.6064 26.2872 39.9725 25.9668 40.23 25.5557C40.4875 25.1446 40.625 24.6612 40.625 24.1667C40.625 23.5037 40.3781 22.8678 39.9385 22.399C39.499 21.9301 38.9028 21.6667 38.2812 21.6667ZM38.2812 25.0001C38.1267 25.0001 37.9757 24.9512 37.8472 24.8596C37.7187 24.7681 37.6186 24.6379 37.5595 24.4856C37.5003 24.3334 37.4849 24.1658 37.515 24.0042C37.5451 23.8425 37.6195 23.694 37.7288 23.5775C37.8381 23.4609 37.9773 23.3816 38.1288 23.3494C38.2804 23.3173 38.4375 23.3338 38.5802 23.3968C38.723 23.4599 38.845 23.5667 38.9308 23.7038C39.0167 23.8408 39.0625 24.0019 39.0625 24.1667C39.0625 24.3878 38.9802 24.5997 38.8337 24.756C38.6872 24.9123 38.4884 25.0001 38.2812 25.0001ZM11.7188 21.6667C11.2552 21.6667 10.8021 21.8134 10.4166 22.0881C10.0312 22.3628 9.7308 22.7532 9.55341 23.21C9.37602 23.6669 9.3296 24.1695 9.42004 24.6545C9.51047 25.1394 9.73369 25.5849 10.0615 25.9345C10.3892 26.2841 10.8069 26.5223 11.2615 26.6187C11.7162 26.7152 12.1874 26.6657 12.6157 26.4765C13.0439 26.2872 13.41 25.9668 13.6675 25.5557C13.925 25.1446 14.0625 24.6612 14.0625 24.1667C14.0625 23.5037 13.8156 22.8678 13.376 22.399C12.9365 21.9301 12.3404 21.6667 11.7188 21.6667ZM11.7188 25.0001C11.5642 25.0001 11.4132 24.9512 11.2847 24.8596C11.1562 24.7681 11.0561 24.6379 10.997 24.4856C10.9378 24.3334 10.9224 24.1658 10.9525 24.0042C10.9827 23.8425 11.0571 23.694 11.1663 23.5775C11.2756 23.4609 11.4148 23.3816 11.5663 23.3494C11.7179 23.3173 11.875 23.3338 12.0177 23.3968C12.1605 23.4599 12.2825 23.5667 12.3683 23.7038C12.4542 23.8408 12.5 24.0019 12.5 24.1667C12.5 24.3878 12.4177 24.5997 12.2712 24.756C12.1247 24.9123 11.926 25.0001 11.7188 25.0001Z" />
                                      </svg>
                                      <span className="title ar">
                                        سيارة صغيرة
                                      </span>
                                      <span className="title ar">
                                        {" "}
                                        السعة : {trans?.carcapacity} اشخاص
                                      </span>
                                      <span className="ar">
                                        {/* للشخص الواحد */}
                                        <span className="price ar mx-2 !text-[#63AB45]">
                                          {trans?.carprice}$
                                        </span>
                                      </span>
                                    </label>
                                  </div>
                                </li>
                              )}

                              {trans?.isbus && (
                                <li className="public">
                                  <div className="form-check">
                                    <input
                                      onChange={inputChange}
                                      className="form-check-input"
                                      type="radio"
                                      name="transportType"
                                      id="bus"
                                      defaultValue="bus"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="bus"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={60}
                                        height={50}
                                        viewBox="0 0 50 30"
                                      >
                                        <path d="M39.1667 22.1034C38.6722 22.1034 38.1889 22.2423 37.7777 22.5025C37.3666 22.7627 37.0462 23.1326 36.857 23.5653C36.6677 23.9981 36.6182 24.4742 36.7147 24.9336C36.8112 25.393 37.0493 25.815 37.3989 26.1462C37.7485 26.4774 38.194 26.7029 38.6789 26.7943C39.1639 26.8857 39.6666 26.8388 40.1234 26.6595C40.5802 26.4803 40.9706 26.1768 41.2453 25.7873C41.52 25.3979 41.6667 24.94 41.6667 24.4716C41.666 23.8437 41.4024 23.2417 40.9337 22.7977C40.465 22.3537 39.8295 22.104 39.1667 22.1034ZM39.1667 25.261C39.0018 25.261 38.8407 25.2147 38.7037 25.128C38.5667 25.0412 38.4598 24.9179 38.3968 24.7737C38.3337 24.6294 38.3172 24.4707 38.3493 24.3176C38.3815 24.1645 38.4609 24.0238 38.5774 23.9134C38.694 23.803 38.8424 23.7278 39.0041 23.6974C39.1657 23.6669 39.3333 23.6825 39.4856 23.7423C39.6378 23.802 39.768 23.9032 39.8596 24.033C39.9511 24.1628 40 24.3155 40 24.4716C39.9998 24.6809 39.9119 24.8816 39.7557 25.0296C39.5994 25.1776 39.3876 25.2608 39.1667 25.261ZM46.7558 12.5097L43.155 11.2309L39.9083 2.61925C39.6181 1.85331 39.0855 1.19081 38.3833 0.722079C37.681 0.253345 36.8432 0.00119249 35.9842 0H4.16667C3.062 0.00125346 2.00296 0.417503 1.22185 1.15744C0.440735 1.89738 0.00132321 2.9006 0 3.94703V22.8928C0.000661846 23.5207 0.264267 24.1227 0.732964 24.5667C1.20166 25.0107 1.83716 25.2604 2.5 25.261H4.23333C4.43131 26.5762 5.12354 27.7796 6.18289 28.6501C7.24223 29.5207 8.59758 30 10 30C11.4024 30 12.7578 29.5207 13.8171 28.6501C14.8765 27.7796 15.5687 26.5762 15.7667 25.261H33.4C33.598 26.5762 34.2902 27.7796 35.3496 28.6501C36.4089 29.5207 37.7642 30 39.1667 30C40.5691 30 41.9244 29.5207 42.9838 28.6501C44.0431 27.7796 44.7354 26.5762 44.9333 25.261H47.5C48.1628 25.2604 48.7983 25.0107 49.267 24.5667C49.7357 24.1227 49.9993 23.5207 50 22.8928V16.9446C49.9966 15.9812 49.6847 15.0415 49.1054 14.2496C48.5262 13.4577 47.7069 12.851 46.7558 12.5097ZM41.3167 11.0517H31.6667V4.73644H38.9367L41.3167 11.0517ZM10 28.4186C9.17591 28.4186 8.37033 28.1871 7.68512 27.7534C6.99992 27.3197 6.46587 26.7033 6.1505 25.9821C5.83514 25.2608 5.75262 24.4672 5.91339 23.7016C6.07417 22.9359 6.471 22.2326 7.05372 21.6806C7.63644 21.1286 8.37887 20.7527 9.18712 20.6004C9.99538 20.4481 10.8332 20.5263 11.5945 20.825C12.3559 21.1238 13.0066 21.6297 13.4645 22.2787C13.9223 22.9278 14.1667 23.6909 14.1667 24.4716C14.1653 25.518 13.7259 26.5212 12.9448 27.2612C12.1637 28.0011 11.1047 28.4174 10 28.4186ZM39.1667 28.4186C38.3426 28.4186 37.537 28.1871 36.8518 27.7534C36.1666 27.3197 35.6325 26.7033 35.3172 25.9821C35.0018 25.2608 34.9193 24.4672 35.0801 23.7016C35.2408 22.9359 35.6377 22.2326 36.2204 21.6806C36.8031 21.1286 37.5455 20.7527 38.3538 20.6004C39.162 20.4481 39.9998 20.5263 40.7612 20.825C41.5225 21.1238 42.1733 21.6297 42.6311 22.2787C43.089 22.9278 43.3333 23.6909 43.3333 24.4716C43.332 25.518 42.8926 26.5212 42.1115 27.2612C41.3304 28.0011 40.2713 28.4174 39.1667 28.4186ZM48.3333 22.8928C48.3331 23.1021 48.2452 23.3028 48.089 23.4507C47.9328 23.5987 47.7209 23.682 47.5 23.6822H44.9333C44.7354 22.367 44.0431 21.1636 42.9838 20.2931C41.9244 19.4225 40.5691 18.9432 39.1667 18.9432C37.7642 18.9432 36.4089 19.4225 35.3496 20.2931C34.2902 21.1636 33.598 22.367 33.4 23.6822H15.7667C15.5687 22.367 14.8765 21.1636 13.8171 20.2931C12.7578 19.4225 11.4024 18.9432 10 18.9432C8.59758 18.9432 7.24223 19.4225 6.18289 20.2931C5.12354 21.1636 4.43131 22.367 4.23333 23.6822H2.5C2.27905 23.682 2.06722 23.5987 1.91099 23.4507C1.75476 23.3028 1.66689 23.1021 1.66667 22.8928V3.94703C1.66733 3.31913 1.93093 2.71713 2.39963 2.27314C2.86833 1.82915 3.50383 1.57944 4.16667 1.57881H35.9842C36.4996 1.57954 37.0022 1.73086 37.4235 2.01213C37.8448 2.2934 38.1643 2.69094 38.3383 3.15052L38.3417 3.15763H31.6667C31.2248 3.15804 30.8011 3.32452 30.4886 3.62051C30.1762 3.9165 30.0004 4.31784 30 4.73644V11.0517C30.0004 11.4703 30.1762 11.8716 30.4886 12.1676C30.8011 12.4636 31.2248 12.6301 31.6667 12.6305H42.3483L46.1708 13.9883C46.8048 14.2158 47.3509 14.6203 47.737 15.1481C48.1232 15.676 48.3311 16.3024 48.3333 16.9446V22.8928ZM10 22.1034C9.50555 22.1034 9.0222 22.2423 8.61107 22.5025C8.19995 22.7627 7.87952 23.1326 7.6903 23.5653C7.50108 23.9981 7.45157 24.4742 7.54804 24.9336C7.6445 25.393 7.8826 25.815 8.23223 26.1462C8.58186 26.4774 9.02732 26.7029 9.51227 26.7943C9.99723 26.8857 10.4999 26.8388 10.9567 26.6595C11.4135 26.4803 11.804 26.1768 12.0787 25.7873C12.3534 25.3979 12.5 24.94 12.5 24.4716C12.4993 23.8437 12.2357 23.2417 11.767 22.7977C11.2983 22.3537 10.6628 22.104 10 22.1034ZM10 25.261C9.83518 25.261 9.67407 25.2147 9.53702 25.128C9.39998 25.0412 9.29317 24.9179 9.2301 24.7737C9.16703 24.6294 9.15052 24.4707 9.18268 24.3176C9.21483 24.1645 9.2942 24.0238 9.41074 23.9134C9.52729 23.803 9.67577 23.7278 9.83742 23.6974C9.99908 23.6669 10.1666 23.6825 10.3189 23.7423C10.4712 23.802 10.6013 23.9032 10.6929 24.033C10.7845 24.1628 10.8333 24.3155 10.8333 24.4716C10.8331 24.6809 10.7452 24.8816 10.589 25.0296C10.4328 25.1776 10.2209 25.2608 10 25.261ZM35 15.7881C35 15.9975 34.9122 16.1983 34.7559 16.3463C34.5996 16.4944 34.3877 16.5775 34.1667 16.5775H30.8333C30.6123 16.5775 30.4004 16.4944 30.2441 16.3463C30.0878 16.1983 30 15.9975 30 15.7881C30 15.5788 30.0878 15.378 30.2441 15.2299C30.4004 15.0819 30.6123 14.9987 30.8333 14.9987H34.1667C34.3877 14.9987 34.5996 15.0819 34.7559 15.2299C34.9122 15.378 35 15.5788 35 15.7881ZM26.6667 3.15763H5C4.55811 3.15804 4.13444 3.32452 3.82198 3.62051C3.50951 3.9165 3.33377 4.31784 3.33333 4.73644V11.0517C3.33377 11.4703 3.50951 11.8716 3.82198 12.1676C4.13444 12.4636 4.55811 12.6301 5 12.6305H26.6667C27.1086 12.6301 27.5322 12.4636 27.8447 12.1676C28.1572 11.8716 28.3329 11.4703 28.3333 11.0517V4.73644C28.3329 4.31784 28.1572 3.9165 27.8447 3.62051C27.5322 3.32452 27.1086 3.15804 26.6667 3.15763ZM5 4.73644H15V11.0517H5V4.73644ZM16.6667 11.0517V4.73644H26.6667L26.6683 11.0517H16.6667Z" />
                                      </svg>
                                      <span className="title ar">
                                        {" "}
                                        باص كبير{" "}
                                      </span>
                                      <span className="title ar">
                                        {" "}
                                        السعة : {trans?.buscapacity} اشخاص
                                      </span>
                                      <span className=" ar">
                                        {/* للشخص الواحد */}
                                        <span className="price ar mx-2 !text-[#63AB45]">
                                          {trans?.busprice}$
                                        </span>
                                      </span>
                                    </label>
                                  </div>
                                </li>
                              )}

                              {trans?.isvito && (
                                <li className="public">
                                  <div className="form-check">
                                    <input
                                      onChange={inputChange}
                                      className="form-check-input"
                                      type="radio"
                                      name="transportType"
                                      id="vito"
                                      defaultValue="vito"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="vito"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={60}
                                        height={50}
                                        viewBox="0 0 50 30"
                                      >
                                        <path d="M39.1667 22.1034C38.6722 22.1034 38.1889 22.2423 37.7777 22.5025C37.3666 22.7627 37.0462 23.1326 36.857 23.5653C36.6677 23.9981 36.6182 24.4742 36.7147 24.9336C36.8112 25.393 37.0493 25.815 37.3989 26.1462C37.7485 26.4774 38.194 26.7029 38.6789 26.7943C39.1639 26.8857 39.6666 26.8388 40.1234 26.6595C40.5802 26.4803 40.9706 26.1768 41.2453 25.7873C41.52 25.3979 41.6667 24.94 41.6667 24.4716C41.666 23.8437 41.4024 23.2417 40.9337 22.7977C40.465 22.3537 39.8295 22.104 39.1667 22.1034ZM39.1667 25.261C39.0018 25.261 38.8407 25.2147 38.7037 25.128C38.5667 25.0412 38.4598 24.9179 38.3968 24.7737C38.3337 24.6294 38.3172 24.4707 38.3493 24.3176C38.3815 24.1645 38.4609 24.0238 38.5774 23.9134C38.694 23.803 38.8424 23.7278 39.0041 23.6974C39.1657 23.6669 39.3333 23.6825 39.4856 23.7423C39.6378 23.802 39.768 23.9032 39.8596 24.033C39.9511 24.1628 40 24.3155 40 24.4716C39.9998 24.6809 39.9119 24.8816 39.7557 25.0296C39.5994 25.1776 39.3876 25.2608 39.1667 25.261ZM46.7558 12.5097L43.155 11.2309L39.9083 2.61925C39.6181 1.85331 39.0855 1.19081 38.3833 0.722079C37.681 0.253345 36.8432 0.00119249 35.9842 0H4.16667C3.062 0.00125346 2.00296 0.417503 1.22185 1.15744C0.440735 1.89738 0.00132321 2.9006 0 3.94703V22.8928C0.000661846 23.5207 0.264267 24.1227 0.732964 24.5667C1.20166 25.0107 1.83716 25.2604 2.5 25.261H4.23333C4.43131 26.5762 5.12354 27.7796 6.18289 28.6501C7.24223 29.5207 8.59758 30 10 30C11.4024 30 12.7578 29.5207 13.8171 28.6501C14.8765 27.7796 15.5687 26.5762 15.7667 25.261H33.4C33.598 26.5762 34.2902 27.7796 35.3496 28.6501C36.4089 29.5207 37.7642 30 39.1667 30C40.5691 30 41.9244 29.5207 42.9838 28.6501C44.0431 27.7796 44.7354 26.5762 44.9333 25.261H47.5C48.1628 25.2604 48.7983 25.0107 49.267 24.5667C49.7357 24.1227 49.9993 23.5207 50 22.8928V16.9446C49.9966 15.9812 49.6847 15.0415 49.1054 14.2496C48.5262 13.4577 47.7069 12.851 46.7558 12.5097ZM41.3167 11.0517H31.6667V4.73644H38.9367L41.3167 11.0517ZM10 28.4186C9.17591 28.4186 8.37033 28.1871 7.68512 27.7534C6.99992 27.3197 6.46587 26.7033 6.1505 25.9821C5.83514 25.2608 5.75262 24.4672 5.91339 23.7016C6.07417 22.9359 6.471 22.2326 7.05372 21.6806C7.63644 21.1286 8.37887 20.7527 9.18712 20.6004C9.99538 20.4481 10.8332 20.5263 11.5945 20.825C12.3559 21.1238 13.0066 21.6297 13.4645 22.2787C13.9223 22.9278 14.1667 23.6909 14.1667 24.4716C14.1653 25.518 13.7259 26.5212 12.9448 27.2612C12.1637 28.0011 11.1047 28.4174 10 28.4186ZM39.1667 28.4186C38.3426 28.4186 37.537 28.1871 36.8518 27.7534C36.1666 27.3197 35.6325 26.7033 35.3172 25.9821C35.0018 25.2608 34.9193 24.4672 35.0801 23.7016C35.2408 22.9359 35.6377 22.2326 36.2204 21.6806C36.8031 21.1286 37.5455 20.7527 38.3538 20.6004C39.162 20.4481 39.9998 20.5263 40.7612 20.825C41.5225 21.1238 42.1733 21.6297 42.6311 22.2787C43.089 22.9278 43.3333 23.6909 43.3333 24.4716C43.332 25.518 42.8926 26.5212 42.1115 27.2612C41.3304 28.0011 40.2713 28.4174 39.1667 28.4186ZM48.3333 22.8928C48.3331 23.1021 48.2452 23.3028 48.089 23.4507C47.9328 23.5987 47.7209 23.682 47.5 23.6822H44.9333C44.7354 22.367 44.0431 21.1636 42.9838 20.2931C41.9244 19.4225 40.5691 18.9432 39.1667 18.9432C37.7642 18.9432 36.4089 19.4225 35.3496 20.2931C34.2902 21.1636 33.598 22.367 33.4 23.6822H15.7667C15.5687 22.367 14.8765 21.1636 13.8171 20.2931C12.7578 19.4225 11.4024 18.9432 10 18.9432C8.59758 18.9432 7.24223 19.4225 6.18289 20.2931C5.12354 21.1636 4.43131 22.367 4.23333 23.6822H2.5C2.27905 23.682 2.06722 23.5987 1.91099 23.4507C1.75476 23.3028 1.66689 23.1021 1.66667 22.8928V3.94703C1.66733 3.31913 1.93093 2.71713 2.39963 2.27314C2.86833 1.82915 3.50383 1.57944 4.16667 1.57881H35.9842C36.4996 1.57954 37.0022 1.73086 37.4235 2.01213C37.8448 2.2934 38.1643 2.69094 38.3383 3.15052L38.3417 3.15763H31.6667C31.2248 3.15804 30.8011 3.32452 30.4886 3.62051C30.1762 3.9165 30.0004 4.31784 30 4.73644V11.0517C30.0004 11.4703 30.1762 11.8716 30.4886 12.1676C30.8011 12.4636 31.2248 12.6301 31.6667 12.6305H42.3483L46.1708 13.9883C46.8048 14.2158 47.3509 14.6203 47.737 15.1481C48.1232 15.676 48.3311 16.3024 48.3333 16.9446V22.8928ZM10 22.1034C9.50555 22.1034 9.0222 22.2423 8.61107 22.5025C8.19995 22.7627 7.87952 23.1326 7.6903 23.5653C7.50108 23.9981 7.45157 24.4742 7.54804 24.9336C7.6445 25.393 7.8826 25.815 8.23223 26.1462C8.58186 26.4774 9.02732 26.7029 9.51227 26.7943C9.99723 26.8857 10.4999 26.8388 10.9567 26.6595C11.4135 26.4803 11.804 26.1768 12.0787 25.7873C12.3534 25.3979 12.5 24.94 12.5 24.4716C12.4993 23.8437 12.2357 23.2417 11.767 22.7977C11.2983 22.3537 10.6628 22.104 10 22.1034ZM10 25.261C9.83518 25.261 9.67407 25.2147 9.53702 25.128C9.39998 25.0412 9.29317 24.9179 9.2301 24.7737C9.16703 24.6294 9.15052 24.4707 9.18268 24.3176C9.21483 24.1645 9.2942 24.0238 9.41074 23.9134C9.52729 23.803 9.67577 23.7278 9.83742 23.6974C9.99908 23.6669 10.1666 23.6825 10.3189 23.7423C10.4712 23.802 10.6013 23.9032 10.6929 24.033C10.7845 24.1628 10.8333 24.3155 10.8333 24.4716C10.8331 24.6809 10.7452 24.8816 10.589 25.0296C10.4328 25.1776 10.2209 25.2608 10 25.261ZM35 15.7881C35 15.9975 34.9122 16.1983 34.7559 16.3463C34.5996 16.4944 34.3877 16.5775 34.1667 16.5775H30.8333C30.6123 16.5775 30.4004 16.4944 30.2441 16.3463C30.0878 16.1983 30 15.9975 30 15.7881C30 15.5788 30.0878 15.378 30.2441 15.2299C30.4004 15.0819 30.6123 14.9987 30.8333 14.9987H34.1667C34.3877 14.9987 34.5996 15.0819 34.7559 15.2299C34.9122 15.378 35 15.5788 35 15.7881ZM26.6667 3.15763H5C4.55811 3.15804 4.13444 3.32452 3.82198 3.62051C3.50951 3.9165 3.33377 4.31784 3.33333 4.73644V11.0517C3.33377 11.4703 3.50951 11.8716 3.82198 12.1676C4.13444 12.4636 4.55811 12.6301 5 12.6305H26.6667C27.1086 12.6301 27.5322 12.4636 27.8447 12.1676C28.1572 11.8716 28.3329 11.4703 28.3333 11.0517V4.73644C28.3329 4.31784 28.1572 3.9165 27.8447 3.62051C27.5322 3.32452 27.1086 3.15804 26.6667 3.15763ZM5 4.73644H15V11.0517H5V4.73644ZM16.6667 11.0517V4.73644H26.6667L26.6683 11.0517H16.6667Z" />
                                      </svg>
                                      <span className="title ar">
                                        سيارة فيتو
                                      </span>
                                      <span className="title ar">
                                        {" "}
                                        السعة : {trans?.vitocapacity} اشخاص
                                      </span>
                                      <span className=" ar">
                                        {/* للشخص الواحد */}
                                        <span className="price ar mx-2 !text-[#63AB45]">
                                          {trans?.vitoprice}$
                                        </span>
                                      </span>
                                    </label>
                                  </div>
                                </li>
                              )}

                              {trans?.isminibus && (
                                <li className="public">
                                  <div className="form-check">
                                    <input
                                      onChange={inputChange}
                                      className="form-check-input"
                                      type="radio"
                                      name="transportType"
                                      id="boat"
                                      defaultValue="boat"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="boat"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={60}
                                        height={50}
                                        viewBox="0 0 50 30"
                                      >
                                        <path d="M39.1667 22.1034C38.6722 22.1034 38.1889 22.2423 37.7777 22.5025C37.3666 22.7627 37.0462 23.1326 36.857 23.5653C36.6677 23.9981 36.6182 24.4742 36.7147 24.9336C36.8112 25.393 37.0493 25.815 37.3989 26.1462C37.7485 26.4774 38.194 26.7029 38.6789 26.7943C39.1639 26.8857 39.6666 26.8388 40.1234 26.6595C40.5802 26.4803 40.9706 26.1768 41.2453 25.7873C41.52 25.3979 41.6667 24.94 41.6667 24.4716C41.666 23.8437 41.4024 23.2417 40.9337 22.7977C40.465 22.3537 39.8295 22.104 39.1667 22.1034ZM39.1667 25.261C39.0018 25.261 38.8407 25.2147 38.7037 25.128C38.5667 25.0412 38.4598 24.9179 38.3968 24.7737C38.3337 24.6294 38.3172 24.4707 38.3493 24.3176C38.3815 24.1645 38.4609 24.0238 38.5774 23.9134C38.694 23.803 38.8424 23.7278 39.0041 23.6974C39.1657 23.6669 39.3333 23.6825 39.4856 23.7423C39.6378 23.802 39.768 23.9032 39.8596 24.033C39.9511 24.1628 40 24.3155 40 24.4716C39.9998 24.6809 39.9119 24.8816 39.7557 25.0296C39.5994 25.1776 39.3876 25.2608 39.1667 25.261ZM46.7558 12.5097L43.155 11.2309L39.9083 2.61925C39.6181 1.85331 39.0855 1.19081 38.3833 0.722079C37.681 0.253345 36.8432 0.00119249 35.9842 0H4.16667C3.062 0.00125346 2.00296 0.417503 1.22185 1.15744C0.440735 1.89738 0.00132321 2.9006 0 3.94703V22.8928C0.000661846 23.5207 0.264267 24.1227 0.732964 24.5667C1.20166 25.0107 1.83716 25.2604 2.5 25.261H4.23333C4.43131 26.5762 5.12354 27.7796 6.18289 28.6501C7.24223 29.5207 8.59758 30 10 30C11.4024 30 12.7578 29.5207 13.8171 28.6501C14.8765 27.7796 15.5687 26.5762 15.7667 25.261H33.4C33.598 26.5762 34.2902 27.7796 35.3496 28.6501C36.4089 29.5207 37.7642 30 39.1667 30C40.5691 30 41.9244 29.5207 42.9838 28.6501C44.0431 27.7796 44.7354 26.5762 44.9333 25.261H47.5C48.1628 25.2604 48.7983 25.0107 49.267 24.5667C49.7357 24.1227 49.9993 23.5207 50 22.8928V16.9446C49.9966 15.9812 49.6847 15.0415 49.1054 14.2496C48.5262 13.4577 47.7069 12.851 46.7558 12.5097ZM41.3167 11.0517H31.6667V4.73644H38.9367L41.3167 11.0517ZM10 28.4186C9.17591 28.4186 8.37033 28.1871 7.68512 27.7534C6.99992 27.3197 6.46587 26.7033 6.1505 25.9821C5.83514 25.2608 5.75262 24.4672 5.91339 23.7016C6.07417 22.9359 6.471 22.2326 7.05372 21.6806C7.63644 21.1286 8.37887 20.7527 9.18712 20.6004C9.99538 20.4481 10.8332 20.5263 11.5945 20.825C12.3559 21.1238 13.0066 21.6297 13.4645 22.2787C13.9223 22.9278 14.1667 23.6909 14.1667 24.4716C14.1653 25.518 13.7259 26.5212 12.9448 27.2612C12.1637 28.0011 11.1047 28.4174 10 28.4186ZM39.1667 28.4186C38.3426 28.4186 37.537 28.1871 36.8518 27.7534C36.1666 27.3197 35.6325 26.7033 35.3172 25.9821C35.0018 25.2608 34.9193 24.4672 35.0801 23.7016C35.2408 22.9359 35.6377 22.2326 36.2204 21.6806C36.8031 21.1286 37.5455 20.7527 38.3538 20.6004C39.162 20.4481 39.9998 20.5263 40.7612 20.825C41.5225 21.1238 42.1733 21.6297 42.6311 22.2787C43.089 22.9278 43.3333 23.6909 43.3333 24.4716C43.332 25.518 42.8926 26.5212 42.1115 27.2612C41.3304 28.0011 40.2713 28.4174 39.1667 28.4186ZM48.3333 22.8928C48.3331 23.1021 48.2452 23.3028 48.089 23.4507C47.9328 23.5987 47.7209 23.682 47.5 23.6822H44.9333C44.7354 22.367 44.0431 21.1636 42.9838 20.2931C41.9244 19.4225 40.5691 18.9432 39.1667 18.9432C37.7642 18.9432 36.4089 19.4225 35.3496 20.2931C34.2902 21.1636 33.598 22.367 33.4 23.6822H15.7667C15.5687 22.367 14.8765 21.1636 13.8171 20.2931C12.7578 19.4225 11.4024 18.9432 10 18.9432C8.59758 18.9432 7.24223 19.4225 6.18289 20.2931C5.12354 21.1636 4.43131 22.367 4.23333 23.6822H2.5C2.27905 23.682 2.06722 23.5987 1.91099 23.4507C1.75476 23.3028 1.66689 23.1021 1.66667 22.8928V3.94703C1.66733 3.31913 1.93093 2.71713 2.39963 2.27314C2.86833 1.82915 3.50383 1.57944 4.16667 1.57881H35.9842C36.4996 1.57954 37.0022 1.73086 37.4235 2.01213C37.8448 2.2934 38.1643 2.69094 38.3383 3.15052L38.3417 3.15763H31.6667C31.2248 3.15804 30.8011 3.32452 30.4886 3.62051C30.1762 3.9165 30.0004 4.31784 30 4.73644V11.0517C30.0004 11.4703 30.1762 11.8716 30.4886 12.1676C30.8011 12.4636 31.2248 12.6301 31.6667 12.6305H42.3483L46.1708 13.9883C46.8048 14.2158 47.3509 14.6203 47.737 15.1481C48.1232 15.676 48.3311 16.3024 48.3333 16.9446V22.8928ZM10 22.1034C9.50555 22.1034 9.0222 22.2423 8.61107 22.5025C8.19995 22.7627 7.87952 23.1326 7.6903 23.5653C7.50108 23.9981 7.45157 24.4742 7.54804 24.9336C7.6445 25.393 7.8826 25.815 8.23223 26.1462C8.58186 26.4774 9.02732 26.7029 9.51227 26.7943C9.99723 26.8857 10.4999 26.8388 10.9567 26.6595C11.4135 26.4803 11.804 26.1768 12.0787 25.7873C12.3534 25.3979 12.5 24.94 12.5 24.4716C12.4993 23.8437 12.2357 23.2417 11.767 22.7977C11.2983 22.3537 10.6628 22.104 10 22.1034ZM10 25.261C9.83518 25.261 9.67407 25.2147 9.53702 25.128C9.39998 25.0412 9.29317 24.9179 9.2301 24.7737C9.16703 24.6294 9.15052 24.4707 9.18268 24.3176C9.21483 24.1645 9.2942 24.0238 9.41074 23.9134C9.52729 23.803 9.67577 23.7278 9.83742 23.6974C9.99908 23.6669 10.1666 23.6825 10.3189 23.7423C10.4712 23.802 10.6013 23.9032 10.6929 24.033C10.7845 24.1628 10.8333 24.3155 10.8333 24.4716C10.8331 24.6809 10.7452 24.8816 10.589 25.0296C10.4328 25.1776 10.2209 25.2608 10 25.261ZM35 15.7881C35 15.9975 34.9122 16.1983 34.7559 16.3463C34.5996 16.4944 34.3877 16.5775 34.1667 16.5775H30.8333C30.6123 16.5775 30.4004 16.4944 30.2441 16.3463C30.0878 16.1983 30 15.9975 30 15.7881C30 15.5788 30.0878 15.378 30.2441 15.2299C30.4004 15.0819 30.6123 14.9987 30.8333 14.9987H34.1667C34.3877 14.9987 34.5996 15.0819 34.7559 15.2299C34.9122 15.378 35 15.5788 35 15.7881ZM26.6667 3.15763H5C4.55811 3.15804 4.13444 3.32452 3.82198 3.62051C3.50951 3.9165 3.33377 4.31784 3.33333 4.73644V11.0517C3.33377 11.4703 3.50951 11.8716 3.82198 12.1676C4.13444 12.4636 4.55811 12.6301 5 12.6305H26.6667C27.1086 12.6301 27.5322 12.4636 27.8447 12.1676C28.1572 11.8716 28.3329 11.4703 28.3333 11.0517V4.73644C28.3329 4.31784 28.1572 3.9165 27.8447 3.62051C27.5322 3.32452 27.1086 3.15804 26.6667 3.15763ZM5 4.73644H15V11.0517H5V4.73644ZM16.6667 11.0517V4.73644H26.6667L26.6683 11.0517H16.6667Z" />
                                      </svg>

                                      <span className="title ar">
                                        {" "}
                                        باص صغير
                                      </span>
                                      <span className="title ar">
                                        {" "}
                                        السعة : {trans?.minibuscapacity} اشخاص
                                      </span>
                                      <span className=" ar">
                                        {/* للشخص الواحد */}
                                        <span className="price ar mx-2 !text-[#63AB45]">
                                          {trans?.minibusprice}$
                                        </span>
                                      </span>
                                    </label>
                                  </div>
                                </li>
                              )}
                            </ul>
                          </div>

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

                          <div className="booking-form-item-type mb-45">
                            {/* packages */}

                            <div className=" adults">
                              <p className="flex gap-2 ar">
                                <span>عدد الحقائب:</span>
                                <span>{trans?.package}</span>
                              </p>
                            </div>

                            <div className="   text-center">
                              <p className="flex gap-2 ar">
                                <span>السعر الكلي:</span>

                                <span>
                                  {trans?.discount > 0
                                    ? calculteDiscount(
                                        calcultePrice(trans),
                                        trans?.discount
                                      )
                                    : calcultePrice(trans)}
                                  $
                                </span>
                              </p>
                            </div>

                            {/* days */}

                            {/* <div className="number-input-item adults">
                              <label className="number-input-lable !text-sm  ar">
                                عدد الايام:<span></span>
                              </label>

                              <Amount
                                value={state.daysNum}
                                min={1}
                                onChange={handleUpdateBooking("daysNum")}
                              />
                            </div> */}

                            {/* <div className="number-input-item adults">
                              <label className="number-input-lable !text-sm  ar">
                                عدد الاشخاص :<span></span>
                         
                              </label>

                              <Amount
                                value={state.adultsNum}
                                min={1}
                                onChange={handleUpdateBooking("adultsNum")}
                              />
                            </div> */}

                            {/* <div className="number-input-item children">
                            <label className="number-input-lable ar !text-sm">
                              لكل طفل فوق ال 6 سنوات:<span> </span>
                              <span>$15</span>
                            </label>

                            <Amount
                              value={state.ChildrensNum}
                              min={0}
                              onChange={handleUpdateBooking("ChildrensNum")}
                            />
                          </div> */}
                          </div>

                          {/* -------dates--- */}

                          <div className="tour-date-wrap mb-50">
                            <div className="form-check customdate">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="tourDate"
                                id="custom"
                                defaultValue="option3"
                              />
                              <label
                                class="form-check-label"
                                for="custom"
                              ></label>
                              <span className="form-group">
                                <ReactDatePicker
                                  selectsRange={true}
                                  startDate={startDate}
                                  endDate={endDate}
                                  placeholderText="Check In & Out Data"
                                  onChange={(update) => {
                                    setDateRange(update);
                                  }}
                                  withPortal
                                />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={15}
                                  height={15}
                                  viewBox="0 0 15 15"
                                >
                                  <path d="M10.3125 7.03125C10.3125 6.90693 10.3619 6.7877 10.4498 6.69979C10.5377 6.61189 10.6569 6.5625 10.7812 6.5625H11.7188C11.8431 6.5625 11.9623 6.61189 12.0502 6.69979C12.1381 6.7877 12.1875 6.90693 12.1875 7.03125V7.96875C12.1875 8.09307 12.1381 8.2123 12.0502 8.30021C11.9623 8.38811 11.8431 8.4375 11.7188 8.4375H10.7812C10.6569 8.4375 10.5377 8.38811 10.4498 8.30021C10.3619 8.2123 10.3125 8.09307 10.3125 7.96875V7.03125Z" />
                                  <path d="M3.28125 0C3.40557 0 3.5248 0.049386 3.61271 0.137294C3.70061 0.225201 3.75 0.34443 3.75 0.46875V0.9375H11.25V0.46875C11.25 0.34443 11.2994 0.225201 11.3873 0.137294C11.4752 0.049386 11.5944 0 11.7188 0C11.8431 0 11.9623 0.049386 12.0502 0.137294C12.1381 0.225201 12.1875 0.34443 12.1875 0.46875V0.9375H13.125C13.6223 0.9375 14.0992 1.13504 14.4508 1.48667C14.8025 1.83831 15 2.31522 15 2.8125V13.125C15 13.6223 14.8025 14.0992 14.4508 14.4508C14.0992 14.8025 13.6223 15 13.125 15H1.875C1.37772 15 0.900806 14.8025 0.549175 14.4508C0.197544 14.0992 0 13.6223 0 13.125V2.8125C0 2.31522 0.197544 1.83831 0.549175 1.48667C0.900806 1.13504 1.37772 0.9375 1.875 0.9375H2.8125V0.46875C2.8125 0.34443 2.86189 0.225201 2.94979 0.137294C3.0377 0.049386 3.15693 0 3.28125 0V0ZM1.875 1.875C1.62636 1.875 1.3879 1.97377 1.21209 2.14959C1.03627 2.3254 0.9375 2.56386 0.9375 2.8125V13.125C0.9375 13.3736 1.03627 13.6121 1.21209 13.7879C1.3879 13.9637 1.62636 14.0625 1.875 14.0625H13.125C13.3736 14.0625 13.6121 13.9637 13.7879 13.7879C13.9637 13.6121 14.0625 13.3736 14.0625 13.125V2.8125C14.0625 2.56386 13.9637 2.3254 13.7879 2.14959C13.6121 1.97377 13.3736 1.875 13.125 1.875H1.875Z" />
                                  <path d="M2.34375 3.75C2.34375 3.62568 2.39314 3.50645 2.48104 3.41854C2.56895 3.33064 2.68818 3.28125 2.8125 3.28125H12.1875C12.3118 3.28125 12.431 3.33064 12.519 3.41854C12.6069 3.50645 12.6562 3.62568 12.6562 3.75V4.6875C12.6562 4.81182 12.6069 4.93105 12.519 5.01896C12.431 5.10686 12.3118 5.15625 12.1875 5.15625H2.8125C2.68818 5.15625 2.56895 5.10686 2.48104 5.01896C2.39314 4.93105 2.34375 4.81182 2.34375 4.6875V3.75Z" />
                                </svg>
                              </span>
                            </div>
                          </div>

                          {/* total price-- */}
                          {/* <div className="total-price">
                          <span>Total Price:</span> $
                          {hotel?.price * state.daysNum +
                            state.ChildrensNum * 15}
                        </div> */}

                          {trans?.discount > 0 && (
                            <div className="ar my-4 text-sm font-semibold text-[#63AB45]">
                              ملاحظة: هذا السعر يشمل نسبة خصم تصل الى{" "}
                              {trans?.discount}%
                            </div>
                          )}

                          <div className="form-inner my-4 py-4">
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

                            <WhatsappForm />
                          </div>
                        </form>
                      </div>
                    </div>
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

export default Page;

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
