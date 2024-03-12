"use client";
import { Button, Table, message } from "antd";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DeleteButton from "@/components/myComponents/DeleteButton";
import EditButton from "@/components/myComponents/EditButton";
import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";
import { SetLoading } from "@/redux/LoadersSlice";
import axios from "axios";
import { ProductType } from "@/interfaces";
import parse from "html-react-parser";
import moment from "moment";
function ProductsList() {
  const [products = [], setProducts] = React.useState<any>([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const getProducts = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/admin/products");
      setProducts(response.data.data);
    } catch (error : any) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const onDelete = async (id: string) => {
    try {
      dispatch(SetLoading(true));
      await axios.delete(`/api/admin/products/${id}`);
      message.success("Product Deleted Successfully");
      getProducts();
    } catch (error : any) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt: string) => {
        return (

          <p> {moment(createdAt).format('DD/MM/YYYY')}</p>
        )
        

        
        
   
      }
    },




//     {
//       title: "Description",
//       dataIndex: "description",
//       render: (description: string) => {
//         return (<div>


// {parse(description.slice(0,4))}


//         </div>)
//       },
//     },


    {
      title: "Category",
      dataIndex: "category",
      render : (text: any, record: any) => record.category.name
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text: any, record: ProductType) => (
        <div className="flex gap-5">
          <DeleteButton title="Delete" onClick={() => onDelete(record._id)} />
          <EditButton
            title="Edit"
            onClick={() => router.push(`/admin/edit_product/${record._id}`)}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => router.push("/admin/add_product")}
        >
          Add Vehicle
        </Button>
      </div>

      <div className="mt-5">
        <Table dataSource={products} columns={columns} />
      </div>
    </div>
  );
}

export default ProductsList;
