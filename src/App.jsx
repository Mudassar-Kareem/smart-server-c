import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./page/Restaurant/Signup";
import Login from "./page/Restaurant/Login";
import Dashboard from "./page/Restaurant/Dashboard";
import MenuItems from "./page/Restaurant/MenuItems";
import Order from "./page/Restaurant/Order";
import CreateOrder from "./page/Customer/CreatOrder";
import QRCode from "./page/Restaurant/QRCode";
import Profile from "./page/Restaurant/Profile";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/action/user";
import { getAllMenuItems } from "./redux/action/menu";
import { getAllOrders } from "./redux/action/order";
import Admin from "./page/Admin/Admin";
import ThankYou from "./page/Customer/ThankYou";

const App = () => {
  const {user} = useSelector((state)=> state.user);
    const restaurantId = user && user._id
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllOrders())
        dispatch(getAllMenuItems(restaurantId))
  }, [dispatch,restaurantId]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/menu" element={<MenuItems />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/qr-code" element={<QRCode />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-order/:id" element={<CreateOrder />} />
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/order-succes" element={<ThankYou/>}/>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
