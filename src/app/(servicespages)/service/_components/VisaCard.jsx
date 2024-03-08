"use client"
import React from 'react'
import Link from "next/link";
import { calculteDiscount } from "@/uitils/CalculateDiscount";

export default function VisaCard({index ,visa}) {
  return (
    <div className="col-md-12 item">
    <div className="package-card4 four">
      <Link
        href={`/service/visa/${visa?._id}`}
        className="package-card-img"
      >

        <img
        // Sizes 250 * 316
        src={visa?.images[0] ?? "/assets/img/home4/package-card4-img1.jpg" }
        //  src="/assets/img/home4/package-card4-img1.jpg"
          alt=""
        />
      </Link>
      <div className="package-card-content">
        <div className="card-content-top">
          <h5 className=" ar">
            {/* Electronic Visa Adult with Fan with Insurance. */}
{visa?.title}


          </h5>
          <ul   className=" ar">
            <li>
              <span>البلد :</span> {visa?.country}
            </li>
            <li>
              <span>نوع الفيزا :</span>{visa?.type}
            </li>


            <li>
              <span>{visa?.extratype}
              </span>
            </li>



        
        {visa?.maketime &&
            <li>
              <span>مدة الاصدار :</span> {visa?.maketime}
            </li>
}
{/* 
                <li>
              <span>Visa Mode :</span> Electronic
            </li>
            <li>
              <span>Validity :</span> 60 Days
            </li> */}
          </ul>
        </div>
        <div className="card-content-bottom">
          <div className="price-area ar">
            <span    className=" ar">تبدأ الاسعار من:</span>
            <h6>
              <strong  className=" ar">
                {visa?.discount > 0 &&
                 <del className='mx-2'>${calculteDiscount(visa?.price ,visa?.discount)}</del>
                }
                   $</strong>{visa?.price}<span className=" ar mx-4">للشخص الواحد</span>
            </h6>
          </div>
          <Link
          href={`/service/visa/${visa?._id}`}
            className="apply-btn  ar"
          >
           قدم الان
            <div className="arrow">
              <i className="bi bi-arrow-right" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}
