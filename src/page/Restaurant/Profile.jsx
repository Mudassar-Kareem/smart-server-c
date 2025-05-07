import React, { useState } from 'react'
import Sidebar from '../../component/Restaurant/Sidebar'

const Profile = () => {
    const [name,setName] =useState("")
    const [restaurantName,setRestaurantName] =useState("")
    const [email,setEmail] =useState("")
    const [contactNo,setContactNo] = useState("")

  return (
    <div className="flex font-outfit">
        <Sidebar/>
        <div className=" w-[77%] ml-[23%] mt-8 mb-10 pr-6 flex justify-center">
        <div className="max-w-xl w-full p-8  rounded-lg bg-white shadow-xl">
          <form  className="flex flex-col gap-3">
            <h1 className="text-2xl flex items-center justify-center font-semibold">
              Edit Profile
            </h1>
            <div>
              <label className="text-md font-semibold ">
                Owner Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded-lg mt-1 outline-none focus:ring-1 focus:ring-green-600 transition duration-300"
                required
              />
            </div>

            <div>
              <label className="text-md font-semibold ">
                Restaurant Name
              </label>
              <input
                type="text"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full border p-2 rounded-lg mt-1 outline-none focus:ring-1 focus:ring-green-600 transition duration-300"
                required
              />
            </div>

            <div>
              <label className="text-md font-semibold ">
                Contact No
              </label>
              <input
                type="text"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                className="w-full border p-2 rounded-lg mt-1 outline-none focus:ring-1 focus:ring-green-600 transition duration-300"
                required
              />
            </div>


            <div>
              <label className="text-md  font-semibold">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded-lg mt-1 outline-none focus:ring-1 focus:ring-green-600 transition duration-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
            >
              Save Changes
            </button>
          </form>
        </div>
        </div>
    </div>
  )
}

export default Profile