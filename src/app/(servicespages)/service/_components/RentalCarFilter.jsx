import React from "react";
import { Checkbox } from "antd";

const CarFilter = ({ onChange, checkboxes, setCheckboxes }) => {
    function onChangeType(e, type) {
        console.log(`checked = ${e.target.checked}`, type);
    }

    return (
        <>
            <div className="sidebar-area ar">
                <div className="single-widget mb-30">
                    <h5 className="widget-title ar">ابحث هنا</h5>
                    <form>
                        <div className="search-box">
                            <input type="text" placeholder="Search Here" />
                            <button type="submit">
                                <i className="bx bx-search" />
                            </button>
                        </div>
                    </form>

                    <div className="w-full mb-10  !my-12 ">
                      <div className="relative inline-block w-full text-gray-700">
                        <label
                          className={`absolute -top-7 ${"text-black"} !font-kufi text-sm font-semibold mb-2`}
                          htmlFor="roomType"
                        >
                       السعة
                        </label>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          {/* icon */}

                          {/* <FaLocationDot /> */}
                        </div>

                        <select
                          id="roomType"
                          name="roomType"
                          className="w-full h-10 px-8 text-base placeholder-gray-600 border rounded-lg appearance-none focus:outline-none"
                          placeholder="Regular input"
                          onChange={(e) => {
                            setCheckboxes({
                                ...checkboxes,
                                capacity: e.target.value,
                                
                            });
                        }}
                          value={checkboxes.capacity}
                        >
                          <option default value={""}></option>
                          {[1,2,3,4,5,6,7,8,9,10].map((c) => (
                            <option value={c} key={c}>
                              {c}
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



                </div>
                <div className="single-widget mb-30 ar">
                    <h5 className="widget-title">نوع السيارة</h5>
                    <div className="checkbox-container">
                        <ul>
                            <li>
                                <Checkbox
                                    className="ar"
                                    name="smallcar"
                                    // onChange={(e) => onChange(e, "type")}
                                    onChange={(e) => {
                                        setCheckboxes({
                                            ...checkboxes,
                                            type: e.target.checked,
                                            typevalue: "small",
                                        });
                                    }}
                                    checked={checkboxes.type && checkboxes.typevalue === "small"}
                                >
                                    صغيرة
                                </Checkbox>
                            </li>

                            <li>
                                <Checkbox
                                    className="ar"
                                    name="medcar"
                                    // onChange={(e) => onChange(e, "type")}
                                    onChange={(e) => {
                                        setCheckboxes({
                                            ...checkboxes,
                                            type: e.target.checked,
                                            typevalue: "medium",
                                        });
                                    }}
                                    checked={checkboxes.type && checkboxes.typevalue === "medium"}
                                >
                                    متوسطة
                                </Checkbox>
                            </li>



                            <li>
                                <Checkbox
                                    className="ar"
                                    name="largecar"
                                    // onChange={(e) => onChange(e, "type")}
                                    onChange={(e) => {
                                        setCheckboxes({
                                            ...checkboxes,
                                            type: e.target.checked,
                                            typevalue: "large",
                                        });
                                    }}
                                    checked={checkboxes.type && checkboxes.typevalue === "large"}
                                >
                                    كبيرة

                                </Checkbox>
                            </li>



                            <li>
                                <Checkbox
                                    className="ar"
                                    name="luxurycar"
                                    // onChange={(e) => onChange(e, "type")}
                                    onChange={(e) => {
                                        setCheckboxes({
                                            ...checkboxes,
                                            type: e.target.checked,
                                            typevalue: "luxury",
                                        });
                                    }}
                                    checked={checkboxes.type && checkboxes.typevalue === "luxury"}
                                >
                                 لوكسوري

                                </Checkbox>
                            </li>






                        </ul>
                    </div>
                </div>

             
                <div className="single-widget mb-30 ar">
                    <h5 className="widget-title ar"> نوع الفيتيس</h5>
                    <div className="checkbox-container">
                        <ul>


                            
                        <li>
                                <Checkbox
                                    className="ar"
                                    name="luxurycar"
                                    // onChange={(e) => onChange(e, "type")}
                                    onChange={(e) => {
                                        setCheckboxes({
                                            ...checkboxes,
                                            vites: e.target.checked,
                                            vitesvalue: "automatc",
                                        });
                                    }}
                                    checked={checkboxes.vites && checkboxes.vitesalue=== "automatic"}
                                >
                          اوتوماتك

                                </Checkbox>
                            </li>



       
                            <li>
                                <Checkbox
                                    className="ar"
                                    name="luxurycar"
                                    // onChange={(e) => onChange(e, "type")}
                                    onChange={(e) => {
                                        setCheckboxes({
                                            ...checkboxes,
                                            vites: e.target.checked,
                                            vitesvalue: "manual",
                                        });
                                    }}
                                    checked={checkboxes.vites && checkboxes.vitesalue=== "manual"}
                                >
                         عادي

                                </Checkbox>
                            </li>



                            
                          
                       
                        </ul>
                    </div>
                </div>





                <div className="single-widget mb-30 ar">
                    <h5 className="widget-title ar"> نوع الوقود</h5>
                    <div className="checkbox-container">
                        <ul>


                            
                        <li>
                                <Checkbox
                                    className="ar"
                                    name="luxurycar"
                                    // onChange={(e) => onChange(e, "type")}
                                    onChange={(e) => {
                                        setCheckboxes({
                                            ...checkboxes,
                                            fueltype: e.target.checked,
                                            fuelvalue: "gaz",
                                        });
                                    }}
                                    checked={checkboxes.fueltype && checkboxes.fuelvalue=== "gaz"}
                                >
                            غاز

                                </Checkbox>
                            </li>



       
                            <li>
                                <Checkbox
                                    className="ar"
                                    name="luxurycar"
                                    // onChange={(e) => onChange(e, "type")}
                                    onChange={(e) => {
                                        setCheckboxes({
                                            ...checkboxes,
                                            fueltype: e.target.checked,
                                            fuelvalue: "dizil",
                                        });
                                    }}
                                    checked={checkboxes.fueltype && checkboxes.fuelvalue=== "dizil"}
                                >
                            ديزل

                                </Checkbox>
                            </li>



                            
                          
                       
                        </ul>
                    </div>
                </div>



               






            </div>
        </>
    );
};

export default CarFilter;
