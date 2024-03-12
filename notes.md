"use client"
import React ,{useState ,useEffect} from 'react'
import { SetLoading } from "@/redux/LoadersSlice";
import { useDispatch } from "react-redux";
import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";
import { Button, Table, message } from "antd";
import axios from "axios";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";


export default function HotelsServices() {

    const dispatch = useDispatch();
    const [hotels, setHotels] = useState([]);
    const getHotels = async () => {
      try {
        dispatch(SetLoading(true));
        const response = await axios.get("/api/admin/hotels");
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

<div className='   px-12 min-h-[70vh]'>
Hotels
</div>


<Footer/>

    </div>
  )
}

----------------------------------

SINGLEEEEEEEEEE


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


----------------------------------


  <div className="filter-group">


{/* ------HOTEL TAB----- */}

{activeTab === 'hotel' &&

<div className="    tab-pane fade px-4 my-4" id="hotel" role="tabpanel">
               



               <form className=" !font-kufi py-4">
                 <div className="flex flex-col md:flex-row gap-12 md:gap-4 mt-4 px-4 w-[90%] ">
                   <div className="w-full mb-10 md:mb-0">
                     <div className="relative  inline-block w-full text-gray-700">
                       <label
                         className={`absolute -top-7   !font-kuf     ${"text-black"} text-sm font-semibold mb-2`}
                         htmlFor="title"
                       >
                         الاسم
                       </label>

                       <div
                         className="absolute inset-y-0 left-1    flex items-center px-2 cursor-pointer duration-300 hover:opacity-80"
                         // onClick={() => setstate({ ...state, title: "" })}
                       >
                         {/* مسح */}
                         <RiFindReplaceFill className=" w-5 h-5"/>
                       </div>

                       <input
                         className="w-full px-8 h-10  !font-kufi text-base placeholder-gray-600 placeholder-opacity-75 border rounded-lg appearance-none focus:outline-none"
                         name="title"
                         type="text"
                         id="title"
                         onChange={inputChange}
                         value={state.title}
                       />

                       {/* <div className="absolute  !font-ibm inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      
                      
                   </div> */}



                     </div>
                   </div>

                   <div className="w-full mb-10 md:mb-0">
                     <div className="relative inline-block w-full text-gray-700">
                       <label
                         className={`absolute -top-7 ${"text-black"} !font-kufi text-sm font-semibold mb-2`}
                         htmlFor="type"
                       >
                         النوع
                       </label>
                       {/* <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                       icon
                   </div> */}

                       <input
                         className="w-full px-8 h-10 text-base placeholder-gray-600 placeholder-opacity-75 border rounded-lg appearance-none focus:outline-none"
                         name="type"
                         type="text"
                         id="type"
                         onChange={inputChange}
                         value={state.type}
                       />

                       <div
                         className="absolute inset-y-0 left-1 flex items-center px-2 cursor-pointer duration-300 hover:opacity-80"
                         onClick={() => setstate({ ...state, type: "" })}
                       >
                         مسح
                       </div>
                     </div>
                   </div>

                   <div className="w-full mb-10 md:mb-0">
                     <div className="relative inline-block w-full text-gray-700">
                       <label
                         className={`absolute -top-7 ${"text-black"} !font-kufi text-sm font-semibold mb-2`}
                         htmlFor="location"
                       >
                         الموقع
                       </label>
                       <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                       {/* icon */}

                       <FaLocationDot/>
                   </div>

                       <select
                         id="location"
                         name="location"
                         className="w-full h-10 px-8 text-base placeholder-gray-600 border rounded-lg appearance-none focus:outline-none"
                         placeholder="Regular input"
                         onChange={inputChange}
                         value={state.location}
                       >
                         <option default value={""}></option>
                         {cities.map((c) => (
                           <option value={c.link} key={c}>
                             {c?.name}
                           </option>
                         ))}
                       </select>

                       <div
                         className="absolute inset-y-0 left-1 flex items-center px-2 cursor-pointer duration-300 hover:opacity-80"
                         //  onClick={() => setstate({ ...state, type: "" })}
                       >
                         <i className="bi bi-chevron-down" />
                       </div>
                     </div>
                   </div>

                   {/* 
           < div className="w-full mb-10 md:mb-0">
               <div className="relative inline-block w-full text-gray-700">
                   <label className={`absolute -top-7 ${ "text-black"} !font-kufi text-sm font-semibold mb-2`} htmlFor="location">
                       الموقع
                   </label>
             

                   <input
                       className="w-full px-8 h-10 text-sm placeholder-gray-600 placeholder-opacity-75 border rounded-lg appearance-none focus:outline-none"
                       name="location"
                       type="text"
                       id="location"
                        onChange={inputChange}
                        value={state.location}
                   />
                  
                       <div
                           className="absolute inset-y-0 left-1  !font-kufi flex items-center px-2 cursor-pointer duration-300 hover:opacity-80"
                            onClick={() => setstate({ ...state, location: "" })}
                       >
                           مسح
                       </div>
                   
               </div>
           </div> */}
                 </div>

                 <div>
                   <button
                     className="py-2 px-4 block  w-full !rounded-[15px]  md:top-1 relative bg-[#63AB45]  text-white font-semibold "
                     onClick={(e) => formSubmit("hotels", e)}
                     type="button"
                   >
                     بحث
                   </button>
                 </div>
               </form>



             </div>
}




{activeTab}




{/* ------TOURS TAB --------- */}


{activeTab === 'tour' &&

<div className="tab-pane fade px-4 my-4 z-10" id="tour" role="tabpane">
               



               <form className=" !font-kufi py-4">
                 <div className="flex flex-col md:flex-row gap-12 md:gap-4 mt-4 px-4 w-[90%] ">
                   <div className="w-full mb-10 md:mb-0">
                     <div className="relative  inline-block w-full text-gray-700">
                       <label
                         className={`absolute -top-7   !font-kuf     ${"text-black"} text-sm font-semibold mb-2`}
                         htmlFor="title"
                       >
                         الاسم
                       </label>

                       <div
                         className="absolute inset-y-0 left-1    flex items-center px-2 cursor-pointer duration-300 hover:opacity-80"
                         // onClick={() => setstate({ ...state, title: "" })}
                       >
                         {/* مسح */}
                         <RiFindReplaceFill className=" w-5 h-5"/>
                       </div>

                       <input
                         className="w-full px-8 h-10  !font-kufi text-base placeholder-gray-600 placeholder-opacity-75 border rounded-lg appearance-none focus:outline-none"
                         name="title"
                         type="text"
                         id="title"
                         onChange={inputChange}
                         value={state.title}
                       />

                       {/* <div className="absolute  !font-ibm inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      
                      
                   </div> */}



                     </div>
                   </div>

                   <div className="w-full mb-10 md:mb-0">
                     <div className="relative inline-block w-full text-gray-700">
                       <label
                         className={`absolute -top-7 ${"text-black"} !font-kufi text-sm font-semibold mb-2`}
                         htmlFor="type"
                       >
                         النوع
                       </label>
                       {/* <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                       icon
                   </div> */}

                       <input
                         className="w-full px-8 h-10 text-base placeholder-gray-600 placeholder-opacity-75 border rounded-lg appearance-none focus:outline-none"
                         name="type"
                         type="text"
                         id="type"
                         onChange={inputChange}
                         value={state.type}
                       />

                       <div
                         className="absolute inset-y-0 left-1 flex items-center px-2 cursor-pointer duration-300 hover:opacity-80"
                         onClick={() => setstate({ ...state, type: "" })}
                       >
                         مسح
                       </div>
                     </div>
                   </div>

                   <div className="w-full mb-10 md:mb-0">
                     <div className="relative inline-block w-full text-gray-700">
                       <label
                         className={`absolute -top-7 ${"text-black"} !font-kufi text-sm font-semibold mb-2`}
                         htmlFor="location"
                       >
                         الموقع
                       </label>
                       <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                       {/* icon */}

                       <FaLocationDot/>
                   </div>

                       <select
                         id="location"
                         name="location"
                         className="w-full h-10 px-8 text-base placeholder-gray-600 border rounded-lg appearance-none focus:outline-none"
                         placeholder="Regular input"
                         onChange={inputChange}
                         value={state.location}
                       >
                         <option default value={""}></option>
                         {cities.map((c) => (
                           <option value={c.link} key={c}>
                             {c?.name}
                           </option>
                         ))}
                       </select>

                       <div
                         className="absolute inset-y-0 left-1 flex items-center px-2 cursor-pointer duration-300 hover:opacity-80"
                         //  onClick={() => setstate({ ...state, type: "" })}
                       >
                         <i className="bi bi-chevron-down" />
                       </div>
                     </div>
                   </div>

                   {/* 
           < div className="w-full mb-10 md:mb-0">
               <div className="relative inline-block w-full text-gray-700">
                   <label className={`absolute -top-7 ${ "text-black"} !font-kufi text-sm font-semibold mb-2`} htmlFor="location">
                       الموقع
                   </label>
             

                   <input
                       className="w-full px-8 h-10 text-sm placeholder-gray-600 placeholder-opacity-75 border rounded-lg appearance-none focus:outline-none"
                       name="location"
                       type="text"
                       id="location"
                        onChange={inputChange}
                        value={state.location}
                   />
                  
                       <div
                           className="absolute inset-y-0 left-1  !font-kufi flex items-center px-2 cursor-pointer duration-300 hover:opacity-80"
                            onClick={() => setstate({ ...state, location: "" })}
                       >
                           مسح
                       </div>
                   
               </div>
           </div> */}
                 </div>

                 <div>
                   <button
                     className="py-2 px-4 block  w-full !rounded-[15px]  md:top-1 relative bg-[#63AB45]  text-white font-semibold "
                     onClick={(e) => formSubmit("hotels", e)}
                     type="button"
                   >
                     بحث
                   </button>
                 </div>
               </form>



             </div>

          }
         



          </div>



          ------------------


        search input filter

           <div className="w-full mb-10 md:mb-0">
                      <div className="relative inline-block w-full text-gray-700">
                        <label
                          className={`absolute -top-7 ${"text-black"} !font-kufi text-sm font-semibold mb-2`}
                          htmlFor="type"
                        >
                       نوع الغرفة
                        </label>
                        {/* <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                       icon
                   </div> */}

                       <input
                          className="w-full px-8 h-10 text-base placeholder-gray-600 placeholder-opacity-75 border rounded-lg appearance-none focus:outline-none"
                          name="type"
                          type="text"
                          id="type"
                          onChange={inputChange}
                          value={state.type}
                        /> 
 


                        <div
                          className="absolute inset-y-0 left-1 flex items-center px-2 cursor-pointer duration-300 hover:opacity-80"
                          onClick={() => setstate({ ...state, type: "" })}
                        >
                          مسح
                        </div>
                      </div>
                    </div>


-----------------------------