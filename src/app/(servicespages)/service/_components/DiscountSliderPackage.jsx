"use client";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import Link from "next/link";
import { hanldeScore } from "@/uitils/StarsHandle";
import { calculteDiscount } from "@/uitils/CalculateDiscount";

SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const DiscountSliderPackage = ({ title, link, data }) => {
  console.log("data-->", data);

  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 2000,
      spaceBetween: 25,
      navigation: {
        nextEl: ".package-card-slider-next",
        prevEl: ".package-card-slider-prev",
      },

      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        386: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1400: {
          slidesPerView: 3,
        },
      },
    };
  }, []);
  return (
    <>
      <div className="tour-pack-section">
        <div className="container">
          <div className="row mb-50">
            <div className="col-lg-12">
              <div className="section-title2 text-center">
                <div className="eg-section-tag two">
                  <span>{link}</span>
                </div>
                <h2 className="text-black ar">{title}</h2>
              </div>
            </div>
          </div>
          <div className="package-card-slider-wrap">
            <div className="row">
              <div className="col-lg-12">
                {data && data?.length > 0 && (
                  <Swiper
                    {...settings}
                    className="swiper package-card-slider mb-60"
                  >
                    <div className="swiper-wrapper">
                      {data?.map((item, index) => {
                        return (
                          <SwiperSlide className="swiper-slide">
                            <div className="package-card3">
                              <Link
                                href={`/service/${link}`}
                                className="package-card-img"
                              >
                                <img
                                  src={
                                    item?.images[0]
                                      ? item?.images[0]
                                      : "/assets/img/home2/package-card3-img1.png"
                                  }
                                  //   src="/assets/img/home2/package-card3-img1.png"
                                  alt=""
                                />
                                <div className="batch">
                                  <span>
                                    {item?.discount > 0 ? "Discount" : "Offer"}
                                  </span>
                                </div>
                              </Link>
                              <div className="package-card-content">
                                <div className="card-content-top">
                                  <div className="rating-area">
                                    <ul dir="ltr" className="rating">
                                      {hanldeScore(4)}

                                      {/* <li>
                                        <i className="bi bi-star-fill" />
                                      </li> */}
                                    </ul>
                                    <span className=" text-lg  ar">
                                      {item?.stars} نجوم
                                    </span>
                                  </div>
                                  <h5>
                                    <Link href={`/service/${link}`}>
                                      {item?.title}
                                    </Link>
                                  </h5>

                                  {/* <h6  className="ar text-md text-[#63AB45] mb-2 -mt-2"> عرض {item?.offer}  + {item?.offerplus} مجانا</h6> */}

                                  <ul className="feature-list ar">
                                    <li>{item?.days} ايام</li>
                                    <li>{item?.loction}</li>

                                    <li className="ar">{item.from} </li>
                                    <li className="ar">{item.to} </li>

                                    <li className="ar">{item.type}</li>
                                  </ul>

                                  <ul className="feature-list ar  my-[11px]">
                                    <li className="ar">
                                      {item.adult} شخص بالغ{" "}
                                    </li>
                                    <li className="ar">{item.child} طفل </li>
                                  </ul>
                                </div>
                                <div className="card-content-bottom  ar">
                                  <div className="price-area">
                                    <span className="title ar">
                                      تبدأ الأسعار من:
                                    </span>

                                    {item?.discount > 0 ? (
                                      <h6>
                                        <sub>$</sub>
                                        {calculteDiscount(
                                          item.price,
                                          item.discount
                                        )}

                                        <del>${item?.price}</del>
                                      </h6>
                                    ) : (
                                      <h6>${item?.price}</h6>
                                    )}

                                    <span className="ar  mt-2">
                                      للشخص الواحد
                                    </span>
                                  </div>
                                  <Link
                                    href={`/service/${link}/${item?._id}`}
                                    className="primary-btn2"
                                  >
                                    احجز الان
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={18}
                                      height={18}
                                      viewBox="0 0 18 18"
                                      fill="none"
                                    >
                                      <path d="M8.15624 10.2261L7.70276 12.3534L5.60722 18L6.85097 17.7928L12.6612 10.1948C13.4812 10.1662 14.2764 10.1222 14.9674 10.054C18.1643 9.73783 17.9985 8.99997 17.9985 8.99997C17.9985 8.99997 18.1643 8.26211 14.9674 7.94594C14.2764 7.87745 13.4811 7.8335 12.6611 7.80518L6.851 0.206972L5.60722 -5.41705e-07L7.70276 5.64663L8.15624 7.77386C7.0917 7.78979 6.37132 7.81403 6.37132 7.81403C6.37132 7.81403 4.90278 7.84793 2.63059 8.35988L0.778036 5.79016L0.000253424 5.79016L0.554115 8.91458C0.454429 8.94514 0.454429 9.05483 0.554115 9.08539L0.000253144 12.2098L0.778036 12.2098L2.63059 9.64035C4.90278 10.1523 6.37132 10.1857 6.37132 10.1857C6.37132 10.1857 7.0917 10.2102 8.15624 10.2261Z" />
                                      <path d="M12.0703 11.9318L12.0703 12.7706L8.97041 12.7706L8.97041 11.9318L12.0703 11.9318ZM12.0703 5.23292L12.0703 6.0714L8.97059 6.0714L8.97059 5.23292L12.0703 5.23292ZM9.97892 14.7465L9.97892 15.585L7.11389 15.585L7.11389 14.7465L9.97892 14.7465ZM9.97892 2.41846L9.97892 3.2572L7.11389 3.2572L7.11389 2.41846L9.97892 2.41846Z" />
                                    </svg>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </div>
                  </Swiper>
                )}

                <div className="slide-and-view-btn-grp style-2">
                  <div className="slider-btn-grp3">
                    <div className="slider-btn package-card-slider-prev ar">
                      <i className="bi bi-arrow-left ar" />
                      <span>السابق</span>
                    </div>
                    <Link
                      href={`/service/${link}?all=true`}
                      className="secondary-btn2 ar"
                    >
                      مشاهدة جميع {title}
                    </Link>
                    <div className="slider-btn package-card-slider-next ar  ">
                      <span>التالي</span>
                      <i className="bi bi-arrow-right" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscountSliderPackage;
