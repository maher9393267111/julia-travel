import { RootStore } from "@/redux/Store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import axios from "axios";
import { SetCurrentUser } from "@/redux/UsersSlice";
import { SetLoading } from "@/redux/LoadersSlice";
import { Badge, Popover, message } from "antd";
<<<<<<< HEAD
import { useRouter ,redirect } from "next/navigation";
=======
import { useRouter } from "next/navigation";
>>>>>>> 289e36ffced48af35b6036d3b87998c7ee695d5c
import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { loading } = useSelector((state: RootStore) => state.loaders);
  const { currentUser } = useSelector((state: RootStore) => state.users);
  const { items } = useSelector((state: RootStore) => state.cart);
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/auth/current_user");
<<<<<<< HEAD
      
      dispatch(SetCurrentUser(response.data.data));
      console.log("curentuser-->>>>" , currentUser ,response.data.data)
=======
      dispatch(SetCurrentUser(response.data.data));
>>>>>>> 289e36ffced48af35b6036d3b87998c7ee695d5c
    } catch (error: unknown) {
      router.push("/auth/login");
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };


  


  const onLogout = async () => {
    try {
      dispatch(SetLoading(true));
      await axios.get("/api/auth/logout");
      dispatch(SetCurrentUser(null));
      router.push("/auth/login");
    } catch (error: unknown) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);

  const popoverContent = (
    <div className="flex flex-col gap-2 p-2">
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => {
          if (currentUser.isAdmin) {
            router.push("/admin");
          } else {
            router.push("/admin");
          }
        }}
      >
        <i className="ri-user-line text-xl"></i>
<<<<<<< HEAD
        <span>{currentUser?.isAdmin ? "Admin" : "User"}</span>
=======
        <span>Profile</span>
>>>>>>> 289e36ffced48af35b6036d3b87998c7ee695d5c
      </div>

      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={onLogout}
      >
        <i className="ri-logout-box-r-line"></i>
        <span>Logout</span>
      </div>
    </div>
  );

<<<<<<< HEAD

  if (currentUser && !currentUser?.isAdmin) {
    redirect("/");
  }



=======
>>>>>>> 289e36ffced48af35b6036d3b87998c7ee695d5c
  return (
    currentUser && (
      <>
        {loading && <Loader />}
        <div className="header bg-gray-800 px-5 py-4 flex justify-between items-center">
          <h1
            className="text-2xl font-black cursor-pointer text-red-400"
            onClick={() => router.push("/")}
          >
            Julia <span className="text-yellow-500 font-semibold">Tours</span>
          </h1>

          <div className="flex gap-5 items-center">
       
            <Popover
              placement="bottomRight"
              content={popoverContent}
              trigger="click"
            >
              <div className="flex justify-center items-center  bg-white rounded-full h-10 w-10 cursor-pointer">
                <span>{currentUser.name[0].toUpperCase()}</span>
              </div>
            </Popover>
          </div>
        </div>
        <div className="content px-5 py-3">{children}</div>
      </>
    )
  );
}

export default PrivateLayout;
