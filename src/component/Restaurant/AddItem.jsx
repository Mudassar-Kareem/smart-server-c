import axios from 'axios';
import React, { useState } from 'react'
import { MdCloudUpload } from 'react-icons/md';
import { server } from '../../server';
import toast from 'react-hot-toast';


const AddItem = ({open,close}) => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    if(!open) return null;
    const handleImage = async(e) =>{
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Restaurant-isris");
        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dt6skdss9/image/upload", {
              method: "POST",
              body: formData,
            });
      
            const data = await res.json();
            setImage(data.secure_url);
          } catch (error) {
            console.error("Cloudinary upload failed", error);
          }
    }
    const handleChangeImage = () =>{
        document.getElementById("image").click();
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post(`${server}/menu/create`,{image,name,category,price},{withCredentials:true}).then((res)=>{
            toast.success(res.data.message);
            setImage(null);
            setName("");
            setCategory("");
            setPrice("");
            close();
        }).catch((error)=>{
            toast.error(error.response.data.message);
        })
    }
  return (
    <div className=" fixed bg-black bg-opacity-50  flex justify-center items-center z-50 inset-0 pt-3 pb-3">
        <div className=" w-[90%] max-w-lg bg-white h-full overflow-auto p-6 rounded-md shadow-md">
            <div className="flex justify-between items-center">
                <h1 className=" text-2xl font-semibold">Add New Item</h1>
                <span onClick={close} className=' cursor-pointer text-5xl font-bold hover:text-green-600 '>&times;</span>
            </div>
            <form onSubmit={handleSubmit} className=' space-x-4 '>
                <div className={`flex  flex-col justify-center items-center mt-7 rounded-lg cursor-pointer ${
                    image ? "border-2 border-solid border-green-600 shadow-md p-1" : "border-2 border-dashed border-gray-400 hover:border-green-600  p-4"
                }`}
                onClick={handleChangeImage}
                >
                    {image ?(
                        <img src={image} className='w-full h-auto max-h-[250px] object-contain rounded-lg' alt="Uploaded Item" />
                    ):(
                        <>
                         <MdCloudUpload size={35} className=' text-green-600'/>
                         <span className=" text-green-600 font-semibold mt-2">Click to Upload</span>
                         <span className=" text-sm text-gray-400 mt-2">or drag and drop your image here</span>
                        </>
                    )}
                    <input type="file" id="image" name="image" className='hidden' onChange={handleImage} accept='image/*'/>
                </div>
                <div className=" mt-4 flex flex-col gap-2">
                    <label  className=" font-semibold text-sm">Item Name</label>
                    <input type="text" placeholder=' Enter Item Name ' required value={name} onChange={(e)=> setName(e.target.value)} className=' p-2 outline-none border rounded-sm border-gray-200 focus:ring-1 focus:ring-green-600' />
                </div>
                <div className=" mt-4 flex flex-col gap-2">
                    <label  className=" font-semibold text-sm">Item Category</label>
                    <select  value={category} onChange={(e)=>setCategory(e.target.value)} className=' p-2 outline-none border rounded-sm border-gray-200 focus:ring-1 focus:ring-green-600'>
                        <option value="" disabled selected>Select Category</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Burger">Burger</option>
                        <option value="Salad">Salad</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Drink">Drink</option>
                        <option value="Deals">Deals</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className=" mt-4 flex flex-col gap-2">
                    <label  className=" font-semibold text-sm">Item Price</label>
                    <input type="text" placeholder=' Enter Item Price ' required value={price} onChange={(e)=> setPrice(e.target.value)} className=' p-2 outline-none border rounded-sm border-gray-200 focus:ring-1 focus:ring-green-600' />
                </div>
               <div className=" flex justify-end mt-4">
               <button
                type='submit'
                className='bg-green-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-green-700 transition-all duration-200 ease-in-out'
                >
                    Add Item
                </button>
               </div>
            </form>
        </div>
    </div>
  )
}

export default AddItem