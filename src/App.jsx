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
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/action/user";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
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
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
