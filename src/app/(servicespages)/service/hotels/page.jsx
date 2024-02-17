"use client"
import React ,{useState ,useEffect} from 'react'
import { SetLoading } from "@/redux/LoadersSlice";
import { useDispatch } from "react-redux";
import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";
import { Button, Table, message } from "antd";
import axios from "axios";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { useSearchParams } from 'next/navigation'


export default function HotelsServices() {

    const dispatch = useDispatch();
    const [hotels, setHotels] = useState([]);

    const searchParams = useSearchParams()
 
    const location = searchParams.get('location')
    const getHotels = async () => {
      try {
        dispatch(SetLoading(true));
        const response = await axios.get(`/api/admin/hotels?location=${location}`);
        setHotels(response.data.data);
        console.log("REsponse-->" , response.data.data)
      } catch (error) {
        message.error(getCatchErrorMessage(error));
      } finally {
        dispatch(SetLoading(false));
      }
    };
    useEffect(() => {
      getHotels();
    }, []);




  return (
    <div>
<Header/>

<div className='    !font-kufi  px-12 min-h-[70vh]'>
الموقع {location}  {hotels?.length}
</div>


<Footer/>

    </div>
  )
}
