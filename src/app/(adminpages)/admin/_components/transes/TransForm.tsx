"use client";
import { Button, Form, Modal, message, Upload, Input, Checkbox } from "antd";
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

const locations = ["istanbul", "bursa", "trabzon", "izmir", "izmit"];

function TransForm({
  showCategoryForm,
  setShowCategoryForm,
  selectedCategory,
  setSelectedCategory,
  reloadCategories,
}: TransFormProps) {
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
          `/api/admin/trans/${selectedCategory._id}`,
          values
        );
      } else {
        values.images = await uploadImages(files);

        response = await axios.post("/api/admin/trans", values);
      }
      message.success("Transiction Added Successfully");
      setShowCategoryForm(false);
      reloadCategories();
      setSelectedCategory(null);
    } catch (error: any) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };

  console.log("S?????", selectedCategory);

  const modelTitle = selectedCategory ? "Edit Tranform" : "Add Transform";
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

        {/* <Form.Item
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
        </Form.Item> */}

   

{/* 
        <Form.Item
          className="input_style"
          label="Persons"
          name="person"
          rules={[
            {
              required: true,
              message: "Please input person",
            },
          ]}
        >
          <Input className="    input_style  " type="text" />
        </Form.Item>

    */}





        <Form.Item
          label="from"
          name="from"
          rules={[
            {
              required: true,
              message: "Please input from",
            },
          ]}
        >
          {/* <input type="text" /> */}
          <Input className="    input_style  " type="text" />
        </Form.Item>




        <Form.Item
          label="to"
          name="to"
          rules={[
            {
              required: true,
              message: "Please input to ",
            },
          ]}
        >
          {/* <input type="text" /> */}
          <Input className="    input_style  " type="text" />
        </Form.Item>



        <Form.Item className=" " name="discount"      label="Discount" >
            


            <Input className="    input_style  " type="text" />

          </Form.Item>


          <Form.Item className=" " name="package"      label="Package number" >
            


            <Input className="    input_style  " type="text" />

          </Form.Item>




        <div className=" grid grid-cols-4 gap-2">
          
        <Form.Item className=" " name="iscar" valuePropName="checked">
            <Checkbox>Small Car </Checkbox>
          </Form.Item>

          <Form.Item className=" " name="isbus" valuePropName="checked">
            <Checkbox>Bus </Checkbox>
          </Form.Item>

          <Form.Item className=" " name="isminibus" valuePropName="checked">
            <Checkbox>MiniBus</Checkbox>
          </Form.Item>

          <Form.Item className=" " name="isvito" valuePropName="checked">
            <Checkbox>Vito </Checkbox>
          </Form.Item>



          <Form.Item className=" " name="carprice"      label="Car price" >
            


            <Input className="    input_style  " type="text" />

          </Form.Item>


          <Form.Item className=" " name="busprice"      label="Bus price" >
            


            <Input className="    input_style  " type="text" />

          </Form.Item>

          <Form.Item className=" " name="minibusprice"   label="MiniBus price" >
          <Input className="    input_style  " type="text" />
          </Form.Item>

          <Form.Item className=" " name="vitoprice"   label="Vito price">

          <Input className="    input_style  " type="text" />

            
          </Form.Item>




{/* -------capacity---- */}

<Form.Item className=" " name="carcapacity"      label="Car Capacity" >
            


            <Input className="    input_style  " type="text" />

          </Form.Item>

          <Form.Item className=" " name="vitocapacity"   label="Vito Capacity" >
          <Input className="    input_style  " type="text" />
          </Form.Item>

          <Form.Item className=" " name="minibuscapacity"   label="Mini Capacity">

          <Input className="    input_style  " type="text" />

            
          </Form.Item>



          <Form.Item className=" " name="buscapacity"   label="Bus Capacity">

<Input className="    input_style  " type="text" />

  
</Form.Item>




        </div>

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

export default TransForm;

export interface TransFormProps {
  showCategoryForm: boolean;
  setShowCategoryForm: any;
  selectedCategory: any;
  setSelectedCategory: any;
  reloadCategories: any;
}
