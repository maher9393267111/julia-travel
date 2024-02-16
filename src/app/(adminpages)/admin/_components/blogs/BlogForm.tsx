
"use client"
import { Button, Form, Modal, message, Upload } from "antd";
import React ,{useMemo} from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/LoadersSlice";
import { uploadImages ,deleteImages } from "@/helpers/imageUploadAndDelete";
import axios from "axios";
import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";
import ModelTitle from "@/components/ModelTitle";
import { ProductType } from "@/interfaces";
import Image from "next/image";
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




function CategoryForm({
  showCategoryForm,
  setShowCategoryForm,
  selectedCategory,
  setSelectedCategory,
  reloadCategories,
}: CategoryFormProps) {
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
console.log('selected' ,selectedCategory?.images,"values" ,values.images)
          // delete images
      const imagesToDelete = selectedCategory.images.filter(
        (image: string) => !values.images.includes(image)
      );
      await deleteImages(imagesToDelete);
      const newImagesUploaded = await uploadImages(files);
      values.images = [...values.images, ...newImagesUploaded];



        response = await axios.put(
          `/api/admin/blogs/${selectedCategory._id}`,
          values
        );
      } else {

        values.images = await uploadImages(files);


        response = await axios.post("/api/admin/blogs", values);
      }
      message.success("Blog Added Successfully");
      setShowCategoryForm(false);
      reloadCategories();
      setSelectedCategory(null);
    } catch (error: any) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };
  const modelTitle = selectedCategory ? "Edit Blog" : "Add Blog";
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
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          rules={[
            {
              required: true,
              message: "Please input author",
            },
          ]}
        >
          <input type="text" />
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
          className=" pb-[2.5rem] border-[2.5px] text-black font-medium rounded-md border-teal-400 hover:border-blue-600"
         
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

export default CategoryForm;

export interface CategoryFormProps {
  showCategoryForm: boolean;
  setShowCategoryForm: any;
  selectedCategory: any;
  setSelectedCategory: any;
  reloadCategories: any;
}
