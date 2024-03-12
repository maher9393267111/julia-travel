"use client"
import React from 'react'
import Link from "next/link";

export default function RentalCard({index ,rental}) {
  return (
    <div key={index} className="col-md-12 item">
    <div className="package-card4 four">
      <Link
        href={`/service/rental/${rental?._id}`}
        className="package-card-img"
      >

        <img
        // Sizes 250 * 316
        src={rental?.images[0] ?? "/assets/img/home4/package-card4-img1.jpg" }
        //  src="/assets/img/home4/package-card4-img1.jpg"
          alt=""
        />
      </Link>
      <div className="package-card-content">
        <div className="card-content-top">
          <h5 className=" ar">
            {/* Electronic rental Adult with Fan with Insurance. */}
{rental?.title}


          </h5>
          <ul   className=" ar">
            <li>
              <span> نوع الفيتيس:</span> {rental?.vites}
            </li>
            <li>
              <span> نوع السيارة:</span>{rental?.type}
            </li>
        
            <li>
              <span> نوع الوقود:</span> {rental?.Fueltype}
            </li>


            <li>
              <span> السعة:</span> {rental?.capacity}
            </li>


            <li>
              <span> مبلغ التأمين:</span> ${rental?.depoprice}

</li>

{/* 
                <li>
              <span>rental Mode :</span> Electronic
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
              <strong  className=" ar"></strong>{rental?.price}$<span className=" ar mx-4"></span>
            </h6>
          </div>
          <Link
          href={`/service/rental/${rental?._id}`}
            className="apply-btn  ar"
          >
         احجز سيارتك 
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
