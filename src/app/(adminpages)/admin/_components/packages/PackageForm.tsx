"use client";
import { Button, Form, Modal, message, Upload, Input } from "antd";
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
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import UploadButton from "./UploadPdf";

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

const types = [
  "honeyMoon",
  "family",
  "vip",
  "groups",
  "adventure",
  "seaBoats",
  "campagin",
  "seaSport",
];
const levels = ["normal", "medium", "height"];

function PackageForm({
  showCategoryForm,
  setShowCategoryForm,
  selectedCategory,
  setSelectedCategory,
  reloadCategories,
}: PackageFormProps) {
  const dispatch = useDispatch();

  const [files, setFiles] = React.useState<any>([]);
  const [images = [], setImages] = React.useState<any>(
    selectedCategory?.images || []
  );

  const [value, setValue] = React.useState<any>("");
  const [file, setFile] = React.useState<any>( selectedCategory?.pdf ||  {id:"" ,url:""});

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
        values.pdf = file
        response = await axios.put(
          `/api/admin/packages/${selectedCategory._id}`,
          values
        );
      } else {
        values.images = await uploadImages(files);

        values.pdf = file
        console.log("VALUE" ,value ,file)
        response = await axios.post("/api/admin/packages", values);
      }
      message.success("Package Added Successfully");
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

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 20,
      },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 20,
        offset: 4,
      },
    },
  };

  const modelTitle = selectedCategory ? "Edit Package" : "Add Package";
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
            <option value="">Select Package type</option>
            {types.map((type: any, index: any) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Form.Item>

        <Form.Item
          label="Level"
          name="level"
          rules={[
            {
              required: true,
              message: "Please input level",
            },
          ]}
        >
          <select className="input_style w-full py-2" value={""}>
            <option value="">Select Package level</option>
            {levels.map((level: any, index: any) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
        </Form.Item>

        <Form.Item
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
        </Form.Item>

        <Form.Item className="input_style" label="Discount" name="discount">
          <Input className="    input_style  " type="text" />
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
          label="Adult number"
          name="adult"
          rules={[
            {
              required: true,
              message: "Please input adult number",
            },
          ]}
        >
          <Input className="    input_style  " type="text" />
        </Form.Item>

        <Form.Item
          className="input_style"
          label="Child number"
          name="child"
          rules={[
            {
              required: true,
              message: "Please input child number",
            },
          ]}
        >
          <Input className="    input_style  " type="text" />
        </Form.Item>

        <Form.Item
          label="From"
          name="from"
          rules={[
            {
              required: true,
              message: "Please input from name",
            },
          ]}
        >
          {/* <input type="text" /> */}
          <Input className=" input_style" type="text" />
        </Form.Item>

        <Form.Item
          label="To"
          name="to"
          rules={[
            {
              required: true,
              message: "Please input to",
            },
          ]}
        >
          {/* <input type="text" /> */}
          <Input className="    input_style  " type="text" />
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

        {/* ----array of inputs---- */}

        <Form.List
          name="features"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(new Error("At least 1 features"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "Features" : ""}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          "Please input feature's name or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="feature name"
                      style={{
                        width: "60%",
                      }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "60%",
                  }}
                  icon={<PlusOutlined />}
                >
                  Add new feature
                </Button>

                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

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

        {/* -upload pdf */}

        {file?.id ? (
          <div>pdf link 
          
          <a href={file?.url}  target="_blank">link</a>
          </div>
        ) : (
          <div>
            <UploadButton file={file} setFile={setFile} />
          </div>
        )}

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

export default PackageForm;

export interface PackageFormProps {
  showCategoryForm: boolean;
  setShowCategoryForm: any;
  selectedCategory: any;
  setSelectedCategory: any;
  reloadCategories: any;
}
