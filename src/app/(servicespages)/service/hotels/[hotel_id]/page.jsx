"use client"
import React ,{useState ,useEffect} from 'react'
import { SetLoading } from "@/redux/LoadersSlice";
import { useDispatch } from "react-redux";
import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";
import { Button, Table, message } from "antd";
import axios from "axios";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

import { useParams } from "next/navigation";


export default function HotelsServices() {

    const dispatch = useDispatch();
   
    const [hotel, setHotel] = useState({});
  
    const params = useParams();


    const getHotel = async () => {
      try {
        dispatch(SetLoading(true));
        const response = await axios.get(`/api/admin/hotels/${params?.hotel_id}`);
        setHotel(response.data.data);
        console.log("REsponse-->" , response.data.data)
      } catch (error) {
        message.error(getCatchErrorMessage(error));
      } finally {
        dispatch(SetLoading(false));
      }
    };
    useEffect(() => {
      getHotel();
    }, []);




  return (
    <div>
<Header/>

<div className='   px-12 min-h-[70vh]'>
Hotels
</div>


<Footer/>

    </div>
  )
}
