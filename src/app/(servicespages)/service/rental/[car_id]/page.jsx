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
      const response = await axios.get(`/api/admin/cars/${params?.car_id}`);
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

  const sendMessage = async () => {
    try {
      //  setIsLoading(true);

      const start = dayjs(startDate, "YYYY-MM-DD").format("D MMMM");
      const end = dayjs(endDate, "YYYY-MM-DD").format("D MMMM");

      let data = {
        ...state,
        startDate: start,
        endDate: end,
        service: "rental",
        details: trans,
        totalprice:
          trans?.discount === 0
            ? trans?.price * state.daysNum
            : calculteDiscount(trans?.price, trans?.discount) * state.daysNum,
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
      <Breadcrumb pagename="تفاصيل السيارة" pagetitle="تفاصيل السيارة" />

      {state.transportType}
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

                <ul className="tour-info-metalist ar  flex  flex-col gap-2 !mt-2">
                  <li className=" ar">
                    <svg
                      className=" !text-green-500  "
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14 0.43748C14 0.372778 13.9856 0.308889 13.9579 0.250418C13.9302 0.191947 13.8898 0.140348 13.8398 0.0993396C13.7897 0.0583312 13.7312 0.0289339 13.6684 0.0132656C13.6057 -0.00240264 13.5402 -0.00395173 13.4768 0.00872996L9.1875 0.86623L4.89825 0.00872996C4.84164 -0.00258444 4.78336 -0.00258444 4.72675 0.00872996L0.35175 0.88373C0.252608 0.903546 0.163389 0.957088 0.099263 1.03525C0.0351366 1.11342 6.10593e-05 1.21138 0 1.31248L0 13.5625C3.90711e-05 13.6272 0.0144289 13.6911 0.0421328 13.7495C0.0698367 13.808 0.110165 13.8596 0.160212 13.9006C0.210259 13.9416 0.268779 13.971 0.331556 13.9867C0.394332 14.0024 0.459803 14.0039 0.52325 13.9912L4.8125 13.1337L9.10175 13.9912C9.15836 14.0025 9.21664 14.0025 9.27325 13.9912L13.6482 13.1162C13.7474 13.0964 13.8366 13.0429 13.9007 12.9647C13.9649 12.8865 13.9999 12.7886 14 12.6875V0.43748ZM4.375 12.3287V0.97123L4.8125 0.88373L5.25 0.97123V12.3287L4.89825 12.2587C4.84165 12.2474 4.78335 12.2474 4.72675 12.2587L4.375 12.3287ZM8.75 13.0287V1.67123L9.10175 1.74123C9.15836 1.75254 9.21664 1.75254 9.27325 1.74123L9.625 1.67123V13.0287L9.1875 13.1162L8.75 13.0287Z"
                      ></path>
                    </svg>

                    <span className="mx-2 ar mt-4">
                      {" "}
                      نوع السيارة : {trans?.type}
                    </span>
                  </li>

                  <li className=" ar">
                    <svg
                      className=" !text-green-500  "
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14 0.43748C14 0.372778 13.9856 0.308889 13.9579 0.250418C13.9302 0.191947 13.8898 0.140348 13.8398 0.0993396C13.7897 0.0583312 13.7312 0.0289339 13.6684 0.0132656C13.6057 -0.00240264 13.5402 -0.00395173 13.4768 0.00872996L9.1875 0.86623L4.89825 0.00872996C4.84164 -0.00258444 4.78336 -0.00258444 4.72675 0.00872996L0.35175 0.88373C0.252608 0.903546 0.163389 0.957088 0.099263 1.03525C0.0351366 1.11342 6.10593e-05 1.21138 0 1.31248L0 13.5625C3.90711e-05 13.6272 0.0144289 13.6911 0.0421328 13.7495C0.0698367 13.808 0.110165 13.8596 0.160212 13.9006C0.210259 13.9416 0.268779 13.971 0.331556 13.9867C0.394332 14.0024 0.459803 14.0039 0.52325 13.9912L4.8125 13.1337L9.10175 13.9912C9.15836 14.0025 9.21664 14.0025 9.27325 13.9912L13.6482 13.1162C13.7474 13.0964 13.8366 13.0429 13.9007 12.9647C13.9649 12.8865 13.9999 12.7886 14 12.6875V0.43748ZM4.375 12.3287V0.97123L4.8125 0.88373L5.25 0.97123V12.3287L4.89825 12.2587C4.84165 12.2474 4.78335 12.2474 4.72675 12.2587L4.375 12.3287ZM8.75 13.0287V1.67123L9.10175 1.74123C9.15836 1.75254 9.21664 1.75254 9.27325 1.74123L9.625 1.67123V13.0287L9.1875 13.1162L8.75 13.0287Z"
                      ></path>
                    </svg>

                    <span className="mx-2 ar">
                      {" "}
                      سعة السيارة :{trans?.capacity}{" "}
                    </span>
                  </li>

                  <li className=" ar">
                    <svg
                      className=" !text-green-500  "
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14 0.43748C14 0.372778 13.9856 0.308889 13.9579 0.250418C13.9302 0.191947 13.8898 0.140348 13.8398 0.0993396C13.7897 0.0583312 13.7312 0.0289339 13.6684 0.0132656C13.6057 -0.00240264 13.5402 -0.00395173 13.4768 0.00872996L9.1875 0.86623L4.89825 0.00872996C4.84164 -0.00258444 4.78336 -0.00258444 4.72675 0.00872996L0.35175 0.88373C0.252608 0.903546 0.163389 0.957088 0.099263 1.03525C0.0351366 1.11342 6.10593e-05 1.21138 0 1.31248L0 13.5625C3.90711e-05 13.6272 0.0144289 13.6911 0.0421328 13.7495C0.0698367 13.808 0.110165 13.8596 0.160212 13.9006C0.210259 13.9416 0.268779 13.971 0.331556 13.9867C0.394332 14.0024 0.459803 14.0039 0.52325 13.9912L4.8125 13.1337L9.10175 13.9912C9.15836 14.0025 9.21664 14.0025 9.27325 13.9912L13.6482 13.1162C13.7474 13.0964 13.8366 13.0429 13.9007 12.9647C13.9649 12.8865 13.9999 12.7886 14 12.6875V0.43748ZM4.375 12.3287V0.97123L4.8125 0.88373L5.25 0.97123V12.3287L4.89825 12.2587C4.84165 12.2474 4.78335 12.2474 4.72675 12.2587L4.375 12.3287ZM8.75 13.0287V1.67123L9.10175 1.74123C9.15836 1.75254 9.21664 1.75254 9.27325 1.74123L9.625 1.67123V13.0287L9.1875 13.1162L8.75 13.0287Z"
                      ></path>
                    </svg>

                    <span className="mx-2 ar">
                      {" "}
                      نوع الوقود:{trans?.capacity}{" "}
                    </span>
                  </li>

                  <li className=" ar">
                    <svg
                      className=" !text-green-500  "
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14 0.43748C14 0.372778 13.9856 0.308889 13.9579 0.250418C13.9302 0.191947 13.8898 0.140348 13.8398 0.0993396C13.7897 0.0583312 13.7312 0.0289339 13.6684 0.0132656C13.6057 -0.00240264 13.5402 -0.00395173 13.4768 0.00872996L9.1875 0.86623L4.89825 0.00872996C4.84164 -0.00258444 4.78336 -0.00258444 4.72675 0.00872996L0.35175 0.88373C0.252608 0.903546 0.163389 0.957088 0.099263 1.03525C0.0351366 1.11342 6.10593e-05 1.21138 0 1.31248L0 13.5625C3.90711e-05 13.6272 0.0144289 13.6911 0.0421328 13.7495C0.0698367 13.808 0.110165 13.8596 0.160212 13.9006C0.210259 13.9416 0.268779 13.971 0.331556 13.9867C0.394332 14.0024 0.459803 14.0039 0.52325 13.9912L4.8125 13.1337L9.10175 13.9912C9.15836 14.0025 9.21664 14.0025 9.27325 13.9912L13.6482 13.1162C13.7474 13.0964 13.8366 13.0429 13.9007 12.9647C13.9649 12.8865 13.9999 12.7886 14 12.6875V0.43748ZM4.375 12.3287V0.97123L4.8125 0.88373L5.25 0.97123V12.3287L4.89825 12.2587C4.84165 12.2474 4.78335 12.2474 4.72675 12.2587L4.375 12.3287ZM8.75 13.0287V1.67123L9.10175 1.74123C9.15836 1.75254 9.21664 1.75254 9.27325 1.74123L9.625 1.67123V13.0287L9.1875 13.1162L8.75 13.0287Z"
                      ></path>
                    </svg>

                    <span className="mx-2 ar">
                      نوع الفيتيس: {trans?.vites}{" "}
                    </span>
                  </li>

                  <li className=" ar">
                    <svg
                      className=" !text-green-500  "
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14 0.43748C14 0.372778 13.9856 0.308889 13.9579 0.250418C13.9302 0.191947 13.8898 0.140348 13.8398 0.0993396C13.7897 0.0583312 13.7312 0.0289339 13.6684 0.0132656C13.6057 -0.00240264 13.5402 -0.00395173 13.4768 0.00872996L9.1875 0.86623L4.89825 0.00872996C4.84164 -0.00258444 4.78336 -0.00258444 4.72675 0.00872996L0.35175 0.88373C0.252608 0.903546 0.163389 0.957088 0.099263 1.03525C0.0351366 1.11342 6.10593e-05 1.21138 0 1.31248L0 13.5625C3.90711e-05 13.6272 0.0144289 13.6911 0.0421328 13.7495C0.0698367 13.808 0.110165 13.8596 0.160212 13.9006C0.210259 13.9416 0.268779 13.971 0.331556 13.9867C0.394332 14.0024 0.459803 14.0039 0.52325 13.9912L4.8125 13.1337L9.10175 13.9912C9.15836 14.0025 9.21664 14.0025 9.27325 13.9912L13.6482 13.1162C13.7474 13.0964 13.8366 13.0429 13.9007 12.9647C13.9649 12.8865 13.9999 12.7886 14 12.6875V0.43748ZM4.375 12.3287V0.97123L4.8125 0.88373L5.25 0.97123V12.3287L4.89825 12.2587C4.84165 12.2474 4.78335 12.2474 4.72675 12.2587L4.375 12.3287ZM8.75 13.0287V1.67123L9.10175 1.74123C9.15836 1.75254 9.21664 1.75254 9.27325 1.74123L9.625 1.67123V13.0287L9.1875 13.1162L8.75 13.0287Z"
                      ></path>
                    </svg>

                    <span className="mx-2 ar">
                      {" "}
                      نوع الوقود: {trans?.Fueltype}{" "}
                    </span>
                  </li>

                  <li className=" ar">
                    <svg
                      className=" !text-green-500  "
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14 0.43748C14 0.372778 13.9856 0.308889 13.9579 0.250418C13.9302 0.191947 13.8898 0.140348 13.8398 0.0993396C13.7897 0.0583312 13.7312 0.0289339 13.6684 0.0132656C13.6057 -0.00240264 13.5402 -0.00395173 13.4768 0.00872996L9.1875 0.86623L4.89825 0.00872996C4.84164 -0.00258444 4.78336 -0.00258444 4.72675 0.00872996L0.35175 0.88373C0.252608 0.903546 0.163389 0.957088 0.099263 1.03525C0.0351366 1.11342 6.10593e-05 1.21138 0 1.31248L0 13.5625C3.90711e-05 13.6272 0.0144289 13.6911 0.0421328 13.7495C0.0698367 13.808 0.110165 13.8596 0.160212 13.9006C0.210259 13.9416 0.268779 13.971 0.331556 13.9867C0.394332 14.0024 0.459803 14.0039 0.52325 13.9912L4.8125 13.1337L9.10175 13.9912C9.15836 14.0025 9.21664 14.0025 9.27325 13.9912L13.6482 13.1162C13.7474 13.0964 13.8366 13.0429 13.9007 12.9647C13.9649 12.8865 13.9999 12.7886 14 12.6875V0.43748ZM4.375 12.3287V0.97123L4.8125 0.88373L5.25 0.97123V12.3287L4.89825 12.2587C4.84165 12.2474 4.78335 12.2474 4.72675 12.2587L4.375 12.3287ZM8.75 13.0287V1.67123L9.10175 1.74123C9.15836 1.75254 9.21664 1.75254 9.27325 1.74123L9.625 1.67123V13.0287L9.1875 13.1162L8.75 13.0287Z"
                      ></path>
                    </svg>

                    {trans?.depoprice > 0 ? (
                      <span className="mx-2 ar">
                        مبلغ التامين : ${trans?.depoprice}
                      </span>
                    ) : (
                      <span className="mx-2 ar">لا يوجد تامين</span>
                    )}
                  </li>

                  <li className=" ar">
                    <svg
                      className=" !text-green-500  "
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14 0.43748C14 0.372778 13.9856 0.308889 13.9579 0.250418C13.9302 0.191947 13.8898 0.140348 13.8398 0.0993396C13.7897 0.0583312 13.7312 0.0289339 13.6684 0.0132656C13.6057 -0.00240264 13.5402 -0.00395173 13.4768 0.00872996L9.1875 0.86623L4.89825 0.00872996C4.84164 -0.00258444 4.78336 -0.00258444 4.72675 0.00872996L0.35175 0.88373C0.252608 0.903546 0.163389 0.957088 0.099263 1.03525C0.0351366 1.11342 6.10593e-05 1.21138 0 1.31248L0 13.5625C3.90711e-05 13.6272 0.0144289 13.6911 0.0421328 13.7495C0.0698367 13.808 0.110165 13.8596 0.160212 13.9006C0.210259 13.9416 0.268779 13.971 0.331556 13.9867C0.394332 14.0024 0.459803 14.0039 0.52325 13.9912L4.8125 13.1337L9.10175 13.9912C9.15836 14.0025 9.21664 14.0025 9.27325 13.9912L13.6482 13.1162C13.7474 13.0964 13.8366 13.0429 13.9007 12.9647C13.9649 12.8865 13.9999 12.7886 14 12.6875V0.43748ZM4.375 12.3287V0.97123L4.8125 0.88373L5.25 0.97123V12.3287L4.89825 12.2587C4.84165 12.2474 4.78335 12.2474 4.72675 12.2587L4.375 12.3287ZM8.75 13.0287V1.67123L9.10175 1.74123C9.15836 1.75254 9.21664 1.75254 9.27325 1.74123L9.625 1.67123V13.0287L9.1875 13.1162L8.75 13.0287Z"
                      ></path>
                    </svg>

                    <span className="mx-2 ar">
                      {" "}
                      السعر الاسبوعي : ${trans?.weekprice}{" "}
                    </span>
                  </li>

                  <li className=" ar">
                    <svg
                      className=" !text-green-500  "
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14 0.43748C14 0.372778 13.9856 0.308889 13.9579 0.250418C13.9302 0.191947 13.8898 0.140348 13.8398 0.0993396C13.7897 0.0583312 13.7312 0.0289339 13.6684 0.0132656C13.6057 -0.00240264 13.5402 -0.00395173 13.4768 0.00872996L9.1875 0.86623L4.89825 0.00872996C4.84164 -0.00258444 4.78336 -0.00258444 4.72675 0.00872996L0.35175 0.88373C0.252608 0.903546 0.163389 0.957088 0.099263 1.03525C0.0351366 1.11342 6.10593e-05 1.21138 0 1.31248L0 13.5625C3.90711e-05 13.6272 0.0144289 13.6911 0.0421328 13.7495C0.0698367 13.808 0.110165 13.8596 0.160212 13.9006C0.210259 13.9416 0.268779 13.971 0.331556 13.9867C0.394332 14.0024 0.459803 14.0039 0.52325 13.9912L4.8125 13.1337L9.10175 13.9912C9.15836 14.0025 9.21664 14.0025 9.27325 13.9912L13.6482 13.1162C13.7474 13.0964 13.8366 13.0429 13.9007 12.9647C13.9649 12.8865 13.9999 12.7886 14 12.6875V0.43748ZM4.375 12.3287V0.97123L4.8125 0.88373L5.25 0.97123V12.3287L4.89825 12.2587C4.84165 12.2474 4.78335 12.2474 4.72675 12.2587L4.375 12.3287ZM8.75 13.0287V1.67123L9.10175 1.74123C9.15836 1.75254 9.21664 1.75254 9.27325 1.74123L9.625 1.67123V13.0287L9.1875 13.1162L8.75 13.0287Z"
                      ></path>
                    </svg>

                    <span className="mx-2 ar">
                      {" "}
                      السعر الشهري : ${trans?.monthprice}{" "}
                    </span>
                  </li>
                </ul>

                <ul className="fetures ar mt-4">
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

                <h4 className="ar">مزايا الرحلة</h4>
                <div className="includ-and-exclud-area mb-20">
                  <ul className=" ar">
                    {trans?.features?.map((feature, index) => {
                      return (
                        <li className="ar" key={index}>
                          <i className="bi bi-check-lg" />
                          {feature}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="transport-sidebar">
                  <div className="booking-form-wrap ar">
                    <h4 className="ar">احجز باقتك معنا</h4>
                    <h5 className=" text-[#63AB45]   text-center my-4    font-semibold text-2xl ar ">
                      {trans?.price}$
                    </h5>

                    <div className="tab-content" id="v-pills-tabContent2">
                      <div className="sidebar-booking-form">
                        <form>
                          {/* ---transport type--- */}

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
                            {/* days */}

                            <div className="number-input-item adults">
                              <label className="number-input-lable !text-sm  ar">
                                عدد الايام:<span></span>
                              </label>

                              <Amount
                                value={state.daysNum}
                                min={1}
                                onChange={handleUpdateBooking("daysNum")}
                              />
                            </div>

                            {/* <div className="number-input-item children">
                            <label className="number-input-lable ar !text-sm">
                            عدد الاطفال<span> </span>
                            
                            </label>

                            <Amount
                              value={state.ChildrensNum}
                              min={0}
                              onChange={handleUpdateBooking("ChildrensNum")}
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

                          {trans?.discount === 0 ? (
                            <div className="total-price">
                              {trans?.price * state.daysNum}

                              {/* {tour?.price * state.daysNum * state.adultsNum} */}
                            </div>
                          ) : (
                            <div className="total-price">
                              {calculteDiscount(trans?.price, trans?.discount) *
                                state.daysNum}
                              $
                            </div>
                          )}

                          {trans?.discount > 0 && (
                            <div className="ar my-4 text-sm font-semibold text-[#63AB45]">
                              ملاحظة: هذا السعر يشمل نسبة خصم تصل الى{" "}
                              {trans?.discount}%
                            </div>
                          )}

                          {/* total price-- */}
                          {/* <div className="total-price">
                          <span>Total Price:</span> $
                          {hotel?.price * state.daysNum +
                            state.ChildrensNum * 15}
                        </div> */}

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
