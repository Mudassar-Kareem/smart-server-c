import axios from "axios";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoRestaurantOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import toast from "react-hot-toast";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [vis, setVis] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post(`${server}/user/register`,{restaurantName,address,type,contactNo,name,email,password},{withCredentials:true}).then((res)=>{
      toast.success(res.data.message);
      setRestaurantName("");
      setAddress("");
      setType("");
      setContactNo("");
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    }).catch((error)=>{
      toast.error(error.response.data.message);
    })
  }
  
 

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
          Create an account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <h1 className=" font-semibold mb-2 text-lg">
                Restaurant Details
              </h1>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Restaurant Name"
                  required
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none  focus:ring-green-500 focus:border-green-500"
                />
                <IoRestaurantOutline
                  className="absolute left-3 top-2.5 text-gray-600"
                  size={18}
                />
              </div>

              <div className="relative mb-4">
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="Restaurant Address "
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                <FaLocationDot
                  className="absolute left-3 top-2.5 text-gray-600"
                  size={18}
                />
              </div>

              <div className=" relative mb-4">
                <select
                  required
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full appearance-none pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select Restaurant Type</option>
                  <option value="Shop">Shop</option>
                  <option value="Cafe">Cafe</option>
                  <option value="FastFood">Fast Food</option>
                  <option value="FineDining">Fine Dining</option>
                  <option value="Bakery">Bakery</option>
                </select>
                <IoRestaurantOutline
                  className="absolute left-3 top-2.5 text-gray-600"
                  size={18}
                />
              </div>

              <div className=" relative mb-4">
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="Contact Number"
                  required
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                <FaPhoneAlt
                  className="absolute left-3 top-2.5 text-gray-600"
                  size={18}
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setStep(step + 1)}
                  type="button"
                  className="w-[33%] py-2 rounded-full bg-green-500 text-white font-semibold"
                >
                  Next
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h1 className=" font-semibold mb-2 text-lg">Personal Details</h1>

              <div className="relative mb-4">
                <input
                  type="text"
                  autoComplete=""
                  placeholder="Owner Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                <CiUser
                  className="absolute left-3 top-2.5 text-gray-600"
                  size={18}
                />
              </div>
              <div className="relative mb-4">
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                <MdEmail
                  className="absolute left-3 top-2.5 text-gray-600"
                  size={18}
                />
              </div>

              <div className="relative mb-4">
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

              <div className="relative mb-4">
                <input
                  type={vis ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                {vis ? (
                  <AiOutlineEye
                    className="absolute left-3 top-2.5 text-gray-600 cursor-pointer"
                    size={18}
                    onClick={() => setVis(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute left-3 top-2.5 text-gray-600 cursor-pointer"
                    size={18}
                    onClick={() => setVis(true)}
                  />
                )}
              </div>
              <h1>
                {password !== confirmPassword &&
                password.length > 0 &&
                confirmPassword.length > 0 ? (
                  <span className="text-red-500 text-sm">
                    Passwords do not match
                  </span>
                ) : null}
              </h1>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(step - 1)}
                  type="button"
                  className="w-[33%] py-2 rounded-full bg-red-500 text-white font-semibold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-[33%] py-2 rounded-full bg-green-500 text-white font-semibold"
                >
                  Sign Up
                </button>
              </div>
            </>
          )}

          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">
              Already have an account?
            </span>
            <Link to="/login" className="text-green-600 font-medium ml-1">
              LogIn
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
