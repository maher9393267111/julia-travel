"use client";
import { Button, Form, Modal, message, Upload ,Input } from "antd";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/LoadersSlice";
import { uploadImages, deleteImages } from "@/helpers/imageUploadAndDelete";
import axios from "axios";
import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";
import ModelTitle from "@/components/myComponents/ModelTitle";
import { ProductType } from "@/interfaces";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { CountriesAr ,CitiesAr } from "@/uitils/locations";


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


const locations = ["istanbul", "bursa" ,"trabzon" , "izmir" , "izmit" ,"sapanca"    ]

const types = ["honeyMoon", "family", "vip", "groups", "adventure" ,"seaBoats" ,"campagin" ,"seaSport"];
    
    

function TourForm({
  showCategoryForm,
  setShowCategoryForm,
  selectedCategory,
  setSelectedCategory,
  reloadCategories,
}: TourFormProps) {
  const dispatch = useDispatch();

  const [files, setFiles] = React.useState<any>([]);
  const [images = [], setImages] = React.useState<any>(
    selectedCategory?.images || []
  );

  const [value, setValue] = React.useState<any>("");

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const onFinish = async (values: ProductType) => {
    try {
      dispatch(SetLoading(true));
      let response;
      if (selectedCategory) {
        console.log(
          "selected",
          selectedCategory?.images,
          "values",
          values.images
        );
        // delete images
        const imagesToDelete = selectedCategory.images.filter(
          (image: string) => !values.images.includes(image)
        );
        await deleteImages(imagesToDelete);
        const newImagesUploaded = await uploadImages(files);
        values.images = [...values.images, ...newImagesUploaded];

        response = await axios.put(
          `/api/admin/tours/${selectedCategory._id}`,
          values
        );
      } else {
        values.images = await uploadImages(files);

        response = await axios.post("/api/admin/tours", values);
      }
      message.success("Tour Added Successfully");
      setShowCategoryForm(false);
      reloadCategories();
      setSelectedCategory(null);
    } catch (error: any) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };


console.log("S?????"  , selectedCategory)

  const modelTitle = selectedCategory ? "Edit Tour" : "Add Tour";
  return (
    <Modal
      title={<ModelTitle title={modelTitle} />}
      open={showCategoryForm}
      onCancel={() => {
        setShowCategoryForm(false);
        setSelectedCategory(null);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={(values) =>
          onFinish({
            ...values,
            images,
          })
        }
        initialValues={selectedCategory}
        className="flex flex-col gap-5"
      >
        <Form.Item
          label="title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input title",
            },
          ]}
        >
          {/* <input type="text" /> */}
          <Input className="    input_style  " type="text" />
        </Form.Item>

        <Form.Item
          label="Country"
          name="country"
          rules={[
            {
              required: true,
              message: "Please input country name",
            },
          ]}
        >
      
      <select className="input_style w-full py-2" value={""}>
            <option value="">Select Country</option>
            {CountriesAr.map((location: any, index: any) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>




        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          rules={[
            {
              required: true,
              message: "Please input city name",
            },
          ]}
        >
     
     <select className="input_style w-full py-2" value={""}>
            <option value="">Select City</option>
            {CitiesAr.map((city: any, index: any) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>


        </Form.Item>

        {/* <Form.Item label="Location" name="location"     rules={[
            {
              required: true,
              message: "Please input location",
            },
          ]} >
          <select
          className="input_style w-full py-2"
          value={""}
          >
            <option value="">Select Location</option>
            {locations.map((location: any ,index :any) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>


        </Form.Item> */}

        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Please input type",
            },
          ]}
        >
          <select className="input_style w-full py-2" value={""}>
            <option value="">Select Type</option>
            {types.map((type: any, index: any) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Form.Item>

        <Form.Item
          className="input_style"
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input price",
            },
          ]}
        >
          <Input className="    input_style  " type="text" />
        </Form.Item>

        <Form.Item
          className="input_style"
          label="Discount"
          name="discount"
    
        >
          <Input className="    input_style  " type="text" />
        </Form.Item>

        {/* <Form.Item
          className="input_style"
          label="days"
          name="days"
          rules={[
            {
              required: true,
              message: "Please input days number",
            },
          ]}
        >
          <Input className="    input_style  " type="text" />
        </Form.Item> */}



<Form.Item
          className="input_style"
          label="Duration"
          name="duration"
          rules={[
            {
              required: true,
              message: "Please input duration",
            },
          ]}
        >
          <Input className="input_style " type="text" />
        </Form.Item>



        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your description!",
            },
          ]}
        >
          {/* <textarea rows={5}></textarea> */}

          <ReactQuill
            modules={modules}
            theme="snow"
            className=" pb-[10px] border-[2.5px] text-black font-medium rounded-md border-teal-400 hover:border-blue-600"
          />
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
          {images?.map((image: any, index: number) => (
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




        <div className="flex justify-end gap-5">
          <Button onClick={() => setShowCategoryForm(false)}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default TourForm;

export interface TourFormProps {
  showCategoryForm: boolean;
  setShowCategoryForm: any;
  selectedCategory: any;
  setSelectedCategory: any;
  reloadCategories: any;
}
