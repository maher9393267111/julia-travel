// "use server"
import About1 from "@/components/about/About1";
import Home1Activities from "@/components/activities/Home1Activities";
// import Banner1 from "@/components/banner/Banner1";
import Banner1Bottom from "@/components/banner/Banner1Bottom";
import Home1Banner2 from "@/components/banner/Home1Banner2";
import Home1Blog from "@/components/blog/Home1Blog";
import Newslatter from "@/components/common/Newslatter";
import Destination1 from "@/components/destination/Destination1";
import Home1FacilitySlide from "@/components/facilitySlide/Home1FacilitySlide";
import Home1Fecilities2 from "@/components/facilitySlide/Home1Fecilities2";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
// import Home1popularTour from "@/components/popularTour/Home1popularTour";
import Home1Testimonail from "@/components/testimonial/Home1Testimonail";
import Topbar2 from "@/components/topbar/Topbar2";
import Home1TourPackage from "@/components/tourPackage/Home1TourPackage";
import Home1Vise from "@/components/visaComponents/Home1Vise";
import Home1WhyChoose from "@/components/whyChoose/Home1WhyChoose";

// -------------------
import axios from "axios";
import HeaderSite from "@/components/myComponents/layout/Header";
import FilterComponent from "@/components/myComponents/HomeComponents/Filter";
import HomeVisa from "@/components/myComponents/HomeComponents/VisaSlider";
import HomeHotels from "@/components/myComponents/HomeComponents/HotelsHome";
import Banner1 from "@/components/banner/Banner1";
 import ToursHome from '@/components/myComponents/HomeComponents/ToursHome'
 import TransportHome from '@/components/myComponents/HomeComponents/TransportHome'
 import FlightHome from '@/components/myComponents/HomeComponents/FlightsHome'
 import GoogleReviews from   '@/components/myComponents/HomeComponents/reviews'
import { RemoveItemFromCart } from "@/redux/CartSlice";

export const metadata = {
  title: " juliaTours - Tour & Travel Agency",
  description:
    "juliaTours - Tour & Travel Agency ",
  icons: {
    icon:"/assets/img/julia-png.png",
  },
};


const REACT_APP_BASE_URL1 = "https://julia-travel97.vercel.app";
const REACT_APP_BASE_URL = "http://localhost:3000";

const domain = process.env.NODE_ENV === "development"
?  REACT_APP_BASE_URL
: REACT_APP_BASE_URL1


//REACT_APP_BASE_URL

//  !process.env.NODE_ENV === "development"
//   ? REACT_APP_BASE_URL1
//     : REACT_APP_BASE_URL;


const getVisa = async () => {
  try {
    // const domain = "http://localhost:3000/api/admin/visa";

    const endPoint = `${domain}/api/admin/visa?limit=true`;
    const response = await axios.get(endPoint);
    //console.log("RESPONSE", response.data.data);
    return response.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  } finally {
  }
};

const getHotels = async () => {
  try {
    //  const domain = "http://localhost:3000/api/admin/hotels?limit=true";

    const endPoint = `${domain}/api/admin/hotels?limit=true`;
    const response = await axios.get(endPoint);
    //console.log("RESPONSE", response.data.data);

    return response.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  } finally {
  }
};

const getTours = async () => {
  try {
    // const domain = "http://localhost:3000/api/admin/tours?limit=true";

    const endPoint = `${domain}/api/admin/tours?limit=true`;
    const response = await axios.get(endPoint);
    //console.log("RESPONSE TTTTTTTT📝📩🏷📒📕💡📝📩🏷📒📕💡📝📩🏷📒📕💡T", response.data.data);

    return response.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  } finally {
  }
};


const getFlights = async () => {
  try {
    // const domain = "http://localhost:3000/api/admin/visa";

    const endPoint = `${domain}/api/admin/flights?limit=true`;
    const response = await axios.get(endPoint);
    //console.log("RESPONSE", response.data.data);
    return response.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  } finally {
  }
};




const getTransport = async () => {
  try {
    // const domain = "http://localhost:3000/api/admin/trans?limit=true";

    const endPoint = `${domain}/api/admin/trans?limit=true`;
    const response = await axios.get(endPoint);
    console.log("RESPONSE", response.data.data);

    return response.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  } finally {
  }
};




export default async function Home() {
  const [visaData, hotelsData, toursData , transportData ,flightData] = await Promise.all([ getVisa(),getHotels(),getTours(), getTransport()
  , getFlights()
  ]);
  // const toursData = await getTours() 
 
  
  //console.log("RESPONSE TTTTTTTT📝📩🏷📒📕💡📝📩🏷📒📕💡📝📩🏷📒📕💡TTTTTT", toursData);

  return (
    <>
      <HeaderSite />

      <Banner1 data={flightData} />

      <FilterComponent />

<div className=" container">



      <HomeHotels hotels={hotelsData} />

      <ToursHome tours={toursData}/>
      <TransportHome transports={transportData}/>
      {/* <FlightHome flights={flightData}/> */}

      <HomeVisa visaData={visaData} />


      <GoogleReviews />


    

      </div>


      {/* <Topbar2 /> */}
      {/* <Header /> */}
      {/* <Banner1Bottom /> */}
      {/* <Home1Vise /> */}

      {/* <About1 />
      <Destination1 />
      <Home1Fecilities2 />
      <Home1FacilitySlide />
      <Home1TourPackage />
      <Home1WhyChoose /> */}
      {/* <Home1popularTour /> */}
      {/* <Home1Activities />
      <Home1Banner2 />
      <Home1Testimonail />
      <Home1Blog /> */}

      {/* <Newslatter /> */}

      <Footer />
    </>
  );
}
