import axios from "axios";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoRestaurantOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
  
    try {
      const res = await axios.post(
        `${server}/user/login`,
        { email, password },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setEmail("");
      setPassword("");
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
  return (
    <div className=" min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 ">
      <div className=" w-full max-w-xl bg-white py-10 px-8 shadow-xl rounded-xl">
        <div className="flex justify-center items-center text-green-500 mb-4">
          <IoRestaurantOutline size={60} />
        </div>
        <h1 className="text-green-600 font-bold text-2xl text-center mb-2">
          Welcome to SmartServe
        </h1>
        <h2 className="mb-6 text-gray-700 text-center text-lg">
          Login to your account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none  focus:ring-green-500 focus:border-green-500"
            />
            <MdEmail
              className="absolute left-3 top-2.5 text-gray-600"
              size={18}
            />
          </div>
          <div className=" relative mb-4">
            <input
              type={visible ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
             {visible ? (
                              <AiOutlineEye
                                className="absolute left-3 top-2.5 text-gray-600 cursor-pointer"
                                size={18}
                                onClick={() => setVisible(false)}
                              />
                            ) : (
                              <AiOutlineEyeInvisible
                                className="absolute left-3 top-2.5 text-gray-600 cursor-pointer"
                                size={18}
                                onClick={() => setVisible(true)}
                              />
                            )}
          </div>
          <button
  type="submit"
  disabled={loading}
  className={`w-full py-2 rounded-full text-white font-semibold ${
    loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-700"
  }`}
>
  {loading ? "Logging in..." : "Log in"}
</button>

          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">
            Don't have an account?
            </span>
            <Link to="/" className="text-green-600 font-medium ml-1">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
