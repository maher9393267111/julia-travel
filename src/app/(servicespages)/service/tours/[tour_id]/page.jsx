"use client";
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

  const [tour, setTour] = useState({});

  const params = useParams();

  const getTour = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/admin/tours/${params?.tour_id}`);
      setTour(response.data.data);
      console.log("REsponseeeeee-->", response.data.data);
    } catch (error) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };
  useEffect(() => {
    getTour();
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
        service: "tours",
        details: tour,
      };

      if (
        // !state.phone && !state.email && !state.name
        !state.phone &&
        !state.email &&
        !state.name &&
        !startDate &&
        !endDate
      ) {
        setstate({ ...state, error: true });
      } else {
        const res = await fetch("/api/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        setstate({ ...state, error: false });
      }

      console.log("response", res);

      //   setPhone("")
    } catch (error) {
      //  setIsLoading(false);
      //errorHandler(error?.message)
      console.log(error);
    }
  };

  return (
    <>
      <Breadcrumb pagename="تفاصيل الرحلة" pagetitle="تفاصيل الرحلة" />

      {tour && (
        <div className="package-details-area pt-120 mb-120 position-relativ !font-kufi">
          <div className="container package-img-group">
            <div className="row">
              <div className="co-lg-12">
                <div className="room-img-group mb-50">
                  <div className="row g-3">
                    <div className="col-lg-6">
                      <div className="gallery-img-wrap">
                        {/* //2087 * 1655 */}

                        {tour?.images?.length > 0 && (
                          <img
                            src={tour?.images[0]}
                            //  src="/assets/img/innerpage/room-01.jpg"

                            alt=""
                          />
                        )}
                        <a data-fancybox="gallery-01">
                          <i
                            className="bi bi-eye"
                            onClick={() =>
                              setOpenimg({
                                openingState: true,
                                openingIndex: 0,
                              })
                            }
                          />{" "}
                          View Tour
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="row g-3">
                        <div className="col-6">
                          <div className="gallery-img-wrap">
                            {tour?.images?.length > 0 && (
                              <img
                                src={tour?.images[1]}
                                //    src="/assets/img/innerpage/room-02.jpg"

                                alt=""
                              />
                            )}

                            <a>
                              <i
                                className="bi bi-eye"
                                onClick={() =>
                                  setOpenimg({
                                    openingState: true,
                                    openingIndex: 1,
                                  })
                                }
                              />{" "}
                              View Room
                            </a>
                          </div>
                        </div>

                        {tour?.images?.length > 0 && tour?.images[2] && (
                          <div className="col-6">
                            <div className="gallery-img-wrap">
                              <img
                                src={tour?.images[2]}
                                //src="/assets/img/innerpage/room-03.jpg"

                                alt=""
                              />
                              <a>
                                <i
                                  className="bi bi-eye"
                                  onClick={() =>
                                    setOpenimg({
                                      openingState: true,
                                      openingIndex: 2,
                                    })
                                  }
                                />{" "}
                                View Room
                              </a>
                            </div>
                          </div>
                        )}

                        {tour?.images?.length > 0 && tour?.images[3] && (
                          <div className="col-6">
                            <div className="gallery-img-wrap">
                              <img
                                src={tour?.images[3]}
                                //src="/assets/img/innerpage/room-03.jpg"

                                alt=""
                              />
                              <a>
                                <i
                                  className="bi bi-eye"
                                  onClick={() =>
                                    setOpenimg({
                                      openingState: true,
                                      openingIndex: 3,
                                    })
                                  }
                                />{" "}
                                View Room
                              </a>
                            </div>
                          </div>
                        )}

                        {/* 
                    
 */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="others-image-wrap d-none">
              <a href="assets/img/innerpage/room-01.jpg" data-fancybox="images">
                <img src="/assets/img/innerpage/blog-grid-img3.jpg" alt="" />
              </a>
              <a href="assets/img/innerpage/room-02.jpg" data-fancybox="images">
                <img src="/assets/img/innerpage/blog-grid-img3.jpg" alt="" />
              </a>
              <a href="assets/img/innerpage/room-03.jpg" data-fancybox="images">
                <img src="/assets/img/innerpage/blog-grid-img3.jpg" alt="" />
              </a>
              <a href="assets/img/innerpage/room-04.jpg" data-fancybox="images">
                <img src="/assets/img/innerpage/blog-grid-img3.jpg" alt="" />
              </a>
              <a href="assets/img/innerpage/room-05.jpg" data-fancybox="images">
                <img src="/assets/img/innerpage/blog-grid-img3.jpg" alt="" />
              </a>
            </div>
            <div className="row g-xl-4 gy-5">
              <div className="col-xl-8">
                <div className="location-and-review">
                  <div className="location  !mx-2">
                    <p>
                      <i className="bi bi-geo-alt" />
                      {/* House 168/170, Road 02,
                    Avenue 01, Mirpur DOHS, Dhaka, Bangladesh  */}
                      {tour?.location}

                      <a href="#">See Map</a>
                    </p>
                  </div>

                  <div className="tour-price  ar">
                    <span className=" ar">للشخص الواحد</span>
                    <h3 className=" mx-2  ar">{tour?.price}$</h3>
                  </div>
                  <ul className="tour-info-metalist ar">
                    <li className=" ar">
                      <svg
                        width={14}
                        height={14}
                        viewBox="0 0 14 14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14C5.14348 14 3.36301 13.2625 2.05025 11.9497C0.737498 10.637 0 8.85652 0 7C0 5.14348 0.737498 3.36301 2.05025 2.05025C3.36301 0.737498 5.14348 0 7 0C8.85652 0 10.637 0.737498 11.9497 2.05025C13.2625 3.36301 14 5.14348 14 7ZM7 3.0625C7 2.94647 6.95391 2.83519 6.87186 2.75314C6.78981 2.67109 6.67853 2.625 6.5625 2.625C6.44647 2.625 6.33519 2.67109 6.25314 2.75314C6.17109 2.83519 6.125 2.94647 6.125 3.0625V7.875C6.12502 7.95212 6.14543 8.02785 6.18415 8.09454C6.22288 8.16123 6.27854 8.2165 6.3455 8.25475L9.408 10.0048C9.5085 10.0591 9.62626 10.0719 9.73611 10.0406C9.84596 10.0092 9.93919 9.93611 9.99587 9.83692C10.0525 9.73774 10.0682 9.62031 10.0394 9.50975C10.0107 9.39919 9.93982 9.30426 9.842 9.24525L7 7.62125V3.0625Z"></path>
                      </svg>
                      {tour?.days} ايام / {tour?.days + 1} ليالي
                    </li>
                    {/* <li>
                  <svg
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 7C7.92826 7 8.8185 6.63125 9.47487 5.97487C10.1313 5.3185 10.5 4.42826 10.5 3.5C10.5 2.57174 10.1313 1.6815 9.47487 1.02513C8.8185 0.368749 7.92826 0 7 0C6.07174 0 5.1815 0.368749 4.52513 1.02513C3.86875 1.6815 3.5 2.57174 3.5 3.5C3.5 4.42826 3.86875 5.3185 4.52513 5.97487C5.1815 6.63125 6.07174 7 7 7ZM14 12.8333C14 14 12.8333 14 12.8333 14H1.16667C1.16667 14 0 14 0 12.8333C0 11.6667 1.16667 8.16667 7 8.16667C12.8333 8.16667 14 11.6667 14 12.8333Z"></path>
                  </svg>
                  Max People : 40
                </li> */}
                    <li className=" ar">
                      <svg
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
                      {tour?.from} &amp; {tour?.to}
                    </li>
                  </ul>
                </div>
                <h2 className=" ar">
                  {/* Golden Tulip The Grandmark Dhaka */}
                  {tour?.title}
                </h2>

                {tour?.description && (
                  <p className=" ar">{parse(tour?.description)}</p>
                )}
              </div>
              <div className="col-xl-4 ">
                <div className="booking-form-wrap mb-30">
                  <h4 className=" !font-kufi">احجز غرفتك</h4>
                  <p className="!font-kufi mt-2">
                    احجز غرفتك المثالية مبكرًا لتستمتع برحلة خالية من المتاعب؛
                    راحة ورفاهية آمنة!
                  </p>

                  <div className="">
                    <div className="sidebar-booking-form">
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

                          <div className="number-input-item adults">
                            <label className="number-input-lable !text-sm  ar">
                              عدد الاشخاص :<span></span>
                              {/* <span>
                              
                                $60
                              </span> */}
                            </label>

                            <Amount
                              value={state.adultsNum}
                              min={1}
                              onChange={handleUpdateBooking("adultsNum")}
                            />
                          </div>
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
                        <div className="total-price">
                          <span>Total Price:</span> $
                          {tour?.price * state.daysNum * state.adultsNum}
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
        </div>
      )}

      <React.Fragment>
        <ModalVideo
          channel="youtube"
          onClick={() => setOpenModalVideo(true)}
          isOpen={isOpenModalVideo}
          animationSpeed="350"
          videoId="r4KpWiK08vM"
          ratio="16:9"
          onClose={() => setOpenModalVideo(false)}
        />
      </React.Fragment>

      {tour?.images?.length > 0 && (
        <Lightbox
          className="img-fluid"
          open={isOpenimg.openingState}
          plugins={[Fullscreen]}
          index={isOpenimg.openingIndex}
          close={() => setOpenimg(false)}
          styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }}
          slides={tour?.images?.map(function (elem) {
            return { src: elem };
          })}
        />
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
