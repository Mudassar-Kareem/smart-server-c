import React, { useState } from "react";
import Sidebar from "../../component/Restaurant/Sidebar";
import { orderData } from "../../data/Order";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Order = () => {
  const [filter, setFilter] = useState("All");
  const filterOrder = orderData.filter(
    (order) => filter === "All" || order.status === filter
  );

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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filterOrder ? filterOrder.map((order,index) => (
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
                        <TableCell>{order.totalPrice}</TableCell>
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
                    )):(
                        <TableRow>
                      <TableCell colSpan={5} align="center">
                        No Data Found
                      </TableCell>
                    </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
        </div>
      </div>
    </div>
  );
};

export default Order;
