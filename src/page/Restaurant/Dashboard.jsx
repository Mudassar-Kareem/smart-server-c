import React from "react";
import Sidebar from "../../component/Restaurant/Sidebar";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiShoppingBag3Line } from "react-icons/ri";
import {orderData} from "../../data/Order"
import { menuItems } from "../../data/Menu";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";


const Dashboard = () => {
  const {user} = useSelector((state)=> state.user);
    const recentOrders = orderData.slice(0,5).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const totalmenu = menuItems.length;
    const totalOrder = orderData.length;
    const pendingorder = orderData.filter((order)=> order.status === "Pending").length;
  return (
    <div className=" flex font-outfit">
      <Sidebar />
      <div className="w-[77%] ml-[23%] mt-8 mb-10 pr-6">
        <div className=" w-full bg-green-600 text-white p-4  rounded-md flex items-center justify-end gap-2">
          <h1 className=" font-semibold"> {user?.restaurantName?.toUpperCase()}</h1>
          <FaUserCircle size={28} />
        </div>
        <div className="flex flex-wrap gap-6 mt-8 mb-8">
          <div className="flex justify-between items-center p-6 rounded-xl shadow-md bg-white flex-1 min-w-[280px] min-h-[160px] max-w-sm">
            <div className="flex flex-col space-y-1">
              <h1 className="text-md font-semibold text-gray-600">
                Total Orders
              </h1>
              <p className="text-xl font-bold">{totalOrder}</p>
              <Link
                to="/orders"
                className="text-sm text-green-600 font-semibold"
              >
                View Orders
              </Link>
            </div>
            <div className="flex items-center justify-center w-16 h-16 border border-green-600 rounded-full">
              <LiaShoppingBagSolid size={40} className="text-green-600" />
            </div>
          </div>

          <div className="flex justify-between items-center p-6 rounded-xl shadow-md bg-white flex-1 min-w-[280px] max-w-sm">
            <div className="flex flex-col space-y-1">
              <h1 className="text-md font-semibold text-gray-600">
                Total Menu Item
              </h1>
              <p className="text-xl font-bold">{totalmenu}</p>
              <Link to="/menu" className="text-sm text-green-600 font-semibold">
                View Menu
              </Link>
            </div>
            <div className="flex items-center justify-center w-16 h-16 border border-green-600 rounded-full">
              <IoFastFoodOutline size={40} className="text-green-600" />
            </div>
          </div>

          <div className="flex justify-between items-center p-6 rounded-xl shadow-md bg-white flex-1 min-w-[280px] max-w-sm">
            <div className="flex flex-col space-y-1">
              <h1 className="text-md font-semibold text-gray-600">
                Total Pending Orders
              </h1>
              <p className="text-xl font-bold">{pendingorder}</p>
              <Link
                to="/orders"
                className="text-sm text-green-600 font-semibold"
              >
                View Orders
              </Link>
            </div>
            <div className="flex items-center justify-center w-16 h-16 border border-green-600 rounded-full">
              <RiShoppingBag3Line size={40} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="mt-10">
            <h1 className=" font-semibold text-xl mb-10"> Recent Orders</h1>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead
                   sx={{
                    bgcolor: "",
                    fontWeight: "bold",
                    fontSize: "19px",
                    color: "black",
                  }}
                  >
                    <TableRow>
                      <TableCell
                       className="text-white font-semibold"
                       sx={{
                         bgcolor: "#16a34a",
                         fontWeight: "bold",
                         fontSize: "19px",
                         color: "white",
                       }}
                      >S.No</TableCell>
                      <TableCell
                       className="text-white font-semibold"
                       sx={{
                         bgcolor: "#16a34a",
                         fontWeight: "bold",
                         fontSize: "19px",
                         color: "white",
                       }}
                      >Order Item</TableCell>
                      <TableCell
                       className="text-white font-semibold"
                       sx={{
                         bgcolor: "#16a34a",
                         fontWeight: "bold",
                         fontSize: "19px",
                         color: "white",
                       }}
                      >Order Time</TableCell>
                      <TableCell
                       className="text-white font-semibold"
                       sx={{
                         bgcolor: "#16a34a",
                         fontWeight: "bold",
                         fontSize: "19px",
                         color: "white",
                       }}
                      >Table</TableCell>
                      <TableCell
                       className="text-white font-semibold"
                       sx={{
                         bgcolor: "#16a34a",
                         fontWeight: "bold",
                         fontSize: "19px",
                         color: "white",
                       }}
                      >Total Amount</TableCell>
                      <TableCell
                       className="text-white font-semibold"
                       sx={{
                         bgcolor: "#16a34a",
                         fontWeight: "bold",
                         fontSize: "19px",
                         color: "white",
                       }}
                      >Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((order,index) => (
                      <TableRow key={order.id}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell> <div className="flex flex-col gap-1 text-sm">
                            {order.items.map((orderItem, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span>
                                  {orderItem.quantity} {orderItem.name}
                                </span>
                              </div>
                            ))}
                          </div></TableCell>
                        <TableCell><div className="flex text-[15px]">
                            {(() => {
                              // if the user provided a time, turn "08:57" into a valid full ISO:
                              const timeString = order.createdAt;

                              const dateObj = new Date(timeString);
                              return dateObj.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              });
                            })()}
                          </div></TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>Rs {order.totalPrice}</TableCell>
                        <TableCell> <button
                           
                            className={`${
                              order.status === "Pending"
                                ? "text-red-500 text-[15px]"
                                : "text-green-500 text-[15px]"
                            }`}
                          >
                            {order.status}
                          </button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
