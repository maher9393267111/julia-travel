
import {
  antdFieldValidation,
  getCatchErrorMessage,
} from "@/helpers/ErrorMessgaes";
import { SetLoading } from "@/redux/LoadersSlice";
import { useEffect } from "react";
import { Button, Form, Upload, message } from "antd";
import axios from "axios";
import Image from "next/image";
import React , {useMemo} from "react";
import { useDispatch } from "react-redux";

import "react-quill/dist/quill.snow.css";
import dynamic from 'next/dynamic';

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const types = [
  "Sedan" , "SUV" , "Coupe", "Hatchback"  ,"Convertible" ,  "Electric" , "Sport" ,  "Luxury" , "Hybird"



]




function ProductForm({ onFinish, initialValues , files , setFiles }: ProductFormProps) {
  const [images = [], setImages] = React.useState<any>(
    initialValues?.images || []
  );

  console.log(initialValues)


  const [categories, setCategories] = React.useState<any>([]);
  const dispatch = useDispatch();

  const getCategories = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/admin/categories");
      setCategories(response.data.data);
    } catch (error: unknown) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    getCategories();
  }, []);




  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );






  return (
    <Form
      layout="vertical"
      onFinish={(values) =>
        onFinish({
          ...values,
          images,
        })
      }
      initialValues={initialValues}
    >
      <div className="grid grid-cols-3 mt-5 gap-5 h-auto">
        <div className="col-span-3">
          <Form.Item label="Name" name="name" rules={antdFieldValidation}>
            <input type="text" />
          </Form.Item>
        </div>
        <div className="col-span-3 mb-24 md:mb-4">
          <Form.Item
            label="Description"
            name="description"
            rules={antdFieldValidation}
          >
            {/* <textarea rows={5}></textarea> */}




<ReactQuill
          modules={modules}
          theme="snow"
          className="h-[140px] pb-[2.5rem] border-[2.5px] text-black font-medium rounded-md border-teal-400 hover:border-blue-600"
         
        />


          </Form.Item>
        </div>

        <Form.Item label="Price" name="price" rules={antdFieldValidation}>
          <input type="number" />
        </Form.Item>


        <Form.Item label="weeklyPrice" name="priceWeek" rules={antdFieldValidation}>
          <input type="number" />
        </Form.Item>



        <Form.Item label="MonthlyPrice" name="priceMonth" rules={antdFieldValidation}>
          <input type="number" />
        </Form.Item>





        <Form.Item label="Seats" name="seats" rules={antdFieldValidation}>
          <input type="number" />
        </Form.Item>







        <Form.Item label="Type" name="type" rules={antdFieldValidation}>
          <select
          
          value={initialValues?.type ? initialValues?.type : ""}
          >
            <option value="">Select Type</option>
            {types.map((type: any ,index:number) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          
        </Form.Item>




        <Form.Item label="Category" name="category" rules={antdFieldValidation}>
          <select
          
          value={initialValues?.category ? initialValues?.category : ""}
          >
            <option value="">Select Category</option>
            {categories.map((category: any) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>


        </Form.Item>
        {/* <Form.Item
          label="Count In Stock"
          name="countInStock"
          rules={antdFieldValidation}
        >
          <input type="number" />
        </Form.Item> */}

        <Form.Item label="Location" name="location" rules={antdFieldValidation}>
            <input type="text" />
          </Form.Item>



        <Form.Item label="Whatsapp" name="whatsapp" >
            <input type="text" />
          </Form.Item>

          <Form.Item label="Engine" name="engine" >
            <input type="text" />
          </Form.Item>


          <Form.Item label="Telgram" name="telgram">
            <input type="text" />
          </Form.Item>


          <Form.Item label="Phone" name="phone" >
            <input type="number" />
          </Form.Item>


          <Form.Item label="Year" name="year" >
            <input type="number" />
          </Form.Item>





        <div className="col-span-3">
          <Upload
            accept="image/*"
            multiple
            beforeUpload={(file) => {
              setFiles((prev: any) => [...prev, file]);
              return false;
            }}
            listType="picture-card"
          >
             Upload Images
          </Upload>
        </div>

        <div className="flex gap-5">
          {images.map((image: any, index: number) => (
            <div
              key={index}
              className="p-5 border-solid border border-gray-300 rounded-md overflow-hidden flex flex-col items-center justify-center gap-2"
            >
              <Image
                className="w-20 h-20 object-cover"
                src={image}
                alt={image}
                width={80}
                height={80}
              />

              <span
                className="underline cursor-pointer text-gray-600"
                onClick={() => {
                  setImages((prev: any) => {
                    const temp = [...prev];
                    temp.splice(index, 1);
                    return temp;
                  });
                }}
              >
                Remove
              </span>
            </div>
          ))}
        </div>

        <div className="col-span-3 flex justify-end">
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default ProductForm;

export interface ProductFormProps {
  onFinish: any;
  initialValues?: any;
  files?: any;
  setFiles?: any;
}









