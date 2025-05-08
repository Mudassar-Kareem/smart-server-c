import React, {  useState } from "react";
import Sidebar from "../../component/Restaurant/Sidebar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import toast from "react-hot-toast";
import { BsEye } from "react-icons/bs";

const Order = () => {
  const {orders} = useSelector((state)=> state.order);
  const {user} =useSelector((state)=> state.user);
  const [filter, setFilter] = useState("All");
  const [open,setOpen] = useState(false);
  const [orderId,setOrderId] = useState(null);
  const filterOrder = orders.filter(
    (order) => filter === "All" || order.status === filter
  );

  const handleStatusChange = (id) =>{
    axios.put(`${server}/order/changeStatus/${id}`,{},{withCredentials:true}).then((res)=>{
      toast.success(res.data.message);
      window.location.reload();
    }).catch((err)=>{
      toast.error(err.response.data.message);
    })
  }
  const handleChange = (id) =>{
    axios.put(`${server}/order/paymentStatus/${id}`,{},{withCredentials:true}).then((res)=>{
      toast.success(res.data.message);
      window.location.reload();
    }).catch((err)=>{
      toast.error(err.response.data.message);
    })
  }

  const handleView = (id) =>{
    setOpen(true)
    setOrderId(id)
  }
  const handlePrint = () => {
    window.print();
  };

  
  
  
  return (
    <div className="flex font-outfit">
      <Sidebar />
      <div className=" w-[77%] ml-[23%] mt-8 mb-10 pr-6 ">
        <div className=" flex gap-8">
          <button
            onClick={() => setFilter("All")}
            className={`bg-white flex text-[19px] px-10 py-2.5 shadow-sm ${
              filter === "All"
                ? "text-green-600 border-b-4 border-green-600 rounded-md"
                : "hover:text-green-600 hover:bg-gray-50"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Pending")}
            className={`bg-white flex text-[19px] px-10 py-2.5 shadow-sm ${
              filter === "Pending"
                ? "text-green-600 border-b-4 border-green-600 rounded-md"
                : "hover:text-green-600 hover:bg-gray-50"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("Ready")}
            className={`bg-white flex text-[19px] px-10 py-2.5 shadow-sm ${
              filter === "Ready"
                ? "text-green-600 border-b-4 border-green-600 rounded-md"
                : "hover:text-green-600 hover:bg-gray-50"
            }`}
          >
            Ready
          </button>
          <button
            onClick={() => setFilter("Served")}
            className={`bg-white flex text-[19px] px-10 py-2.5 shadow-sm ${
              filter === "Served"
                ? "text-green-600 border-b-4 border-green-600 rounded-md"
                : "hover:text-green-600 hover:bg-gray-50"
            }`}
          >
            Served
          </button>
        </div>

        <div className="mt-10">
            
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
                      >Table No</TableCell>
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
                      >Payment Status</TableCell>
                      <TableCell
                       className="text-white font-semibold"
                       sx={{
                         bgcolor: "#16a34a",
                         fontWeight: "bold",
                         fontSize: "19px",
                         color: "white",
                       }}
                      >Status</TableCell>
                      <TableCell
                       className="text-white font-semibold"
                       sx={{
                         bgcolor: "#16a34a",
                         fontWeight: "bold",
                         fontSize: "19px",
                         color: "white",
                       }}
                      >View</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
  {filterOrder && filterOrder.length > 0 ? (
    filterOrder.map((order, index) => (
      <TableRow key={order.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>
          <div className="flex flex-col gap-1 text-sm">
            {order.items.map((orderItem, idx) => (
              <div key={idx} className="flex justify-between">
                <span>
                  {orderItem.quantity} {orderItem.name}
                </span>
              </div>
            ))}
          </div>
        </TableCell>
        <TableCell>
          <div className="flex text-[15px]">
            {(() => {
              const timeString = order.createdAt;
              const dateObj = new Date(timeString);
              return dateObj.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });
            })()}
          </div>
        </TableCell>
        <TableCell>{order.tableNo}</TableCell>
        <TableCell>Rs {order.totalPrice}</TableCell>
        <TableCell>
          <button
            onClick={() => handleChange(order._id)}
            className={`${
              order.status === "Unpaid"
                ? "text-red-500 text-[15px]"
                : "text-green-500 text-[15px]"
            }`}
          >
            {order.paymentStatus}
          </button>
        </TableCell>
        <TableCell>
          <button
            onClick={() => handleStatusChange(order._id)}
            className={`${
              order.status === "Pending"
                ? "text-red-500 text-[15px]"
                : "text-green-500 text-[15px]"
            }`}
          >
            {order.status}
          </button>
        </TableCell>
        <TableCell>
          <button
            onClick={() => handleView(order)}
            className={"bg-green-600 text-white rounded-md px-6 py-1.5"}
          >
            <BsEye size={17} />
          </button>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={7} align="center">
        No Data Found
      </TableCell>
    </TableRow>
  )}
</TableBody>

                </Table>
              </TableContainer>
            </Paper>
        </div>
        <ViewOrder open={open} close={()=> setOpen(false)} order={orderId} print={handlePrint} user={user}/>
      </div>
    </div>
  );
};

export default Order;

const ViewOrder = ({ open, close, order, print, user }) => {
  if (!order) return null;
  
  return (
    <div>
      {open && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg max-h-[90vh] overflow-y-auto">
            {/* Receipt Header */}
            <div className="text-center border-b pb-4">
              <h2 className="text-[20px] font-bold">{user.restaurantName}</h2>
              <p className="text-sm text-gray-600">Order Receipt</p>
              <p className="text-sm">{new Date(order.createdAt).toLocaleString()}</p>
            </div>

            {/* Receipt Body */}
            <div className="mt-4 text-sm text-gray-800">
              <div className="flex justify-between mb-2">
                <span><strong>Table No:</strong></span>
                <span>{order.tableNo}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span><strong>Customer:</strong></span>
                <span>{order.name || "N/A"}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span><strong>Phone:</strong></span>
                <span>{order.phone || "N/A"}</span>
              </div>
              <div className="mt-4 border-t pt-2">
                <strong>Items:</strong>
                <div className="mt-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between mb-1">
                      <span>{item.name} × {item.quantity}</span>
                      <span>Rs {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t mt-4 pt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span>Rs {order.totalPrice}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Payment:</span>
                <span>{order.paymentStatus}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span>{order.status}</span>
              </div>
            </div>

            {/* Receipt Footer */}
            <div className="mt-6 text-center text-xs text-gray-500 border-t pt-2">
              Thank you for dining with us!
            </div>

            {/* Print Button */}
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => {
                  print();  // Open the print dialog
                  close();  // Close the modal after printing
                }}
                className="bg-green-600 hover:bg-green-700 px-5 py-1.5 text-white rounded-md text-sm print-hidden">
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


