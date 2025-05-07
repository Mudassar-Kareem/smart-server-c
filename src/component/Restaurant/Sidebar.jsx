import axios from "axios";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BsQrCode } from "react-icons/bs";
import { FaClipboardList} from "react-icons/fa";
import { IoFastFoodOutline, IoSettings } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { server } from "../../server";
import toast from "react-hot-toast";

const Sidebar = () => {
  const navigate = useNavigate()
  const logoutHandler = () =>{
    axios.get(`${server}/user/logout`,{},{withCredentials:true}).then((res)=>{
      toast.success(res.data.message)
      navigate("/login")
    }).catch((error)=>{
      toast.error(error.response.data.message)
    })
  }
  const location = useLocation();
  return ( //bg-gradient-to-b from-green-600 to-green-800 
    <div className="fixed left-0 top-0 bg-white h-full w-[20%] shadow-2xl rounded-r-xl">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-serif italic font-semibold bg-gradient-to-r from-green-600 to-green-900 bg-clip-text text-transparent  mt-10">
          Smart Serve
        </h1>
      </div>
      <div className=" flex flex-col px-12 py-10 gap-10">
        <Link
          to="/dashboard"
          className={`${
            location.pathname === "/dashboard"
              ? "bg-green-500 text-white"
              : "text-[#000000a5]"
          } flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <RxDashboard size={20} /> {/* Icon for Dashboard */}
          <p>Dashboard</p>
        </Link>
        <Link
          to={"/menu"}
          className={`${
            location.pathname === "/menu"
              ? "bg-green-500 text-white"
              : "text-[#000000a5]"
          } flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <IoFastFoodOutline size={20} />
          <p>Menu Items</p>
        </Link>
        <Link
          to="/orders"
          className={`${
            location.pathname === "/orders"
              ? "bg-green-500 text-white"
              : "text-[#000000a5]"
          } flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <FaClipboardList size={20} /> {/* Icon for Orders */}
          <p>Orders</p>
        </Link>

        <Link
          to="/qr-code"
          className={`${
            location.pathname === "/qr-code"
              ? "bg-green-500 text-white"
              : "text-[#000000a5]"
          } flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <BsQrCode size={20} /> {/* Icon for Orders */}
          <p>QR Code</p>
        </Link>
        <Link
          to="/profile"
          className={`${
            location.pathname === "/profile"
              ? "bg-green-500 text-white"
              : "text-[#000000a5]"
          } flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <IoSettings size={20} /> {/* Icon for Settings */}
          <p>Profile</p>
        </Link>

        <button 
        onClick={logoutHandler}
        className="flex gap-2 items-center text-[20px] font-semibold h-10 px-4 rounded-md text-[#000000a5]">
          <AiOutlineLogout size={20} />
          <span className="text-lg">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
