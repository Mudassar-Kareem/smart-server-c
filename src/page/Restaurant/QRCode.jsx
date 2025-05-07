import { QRCodeCanvas } from "qrcode.react";
import React from "react";
import Sidebar from "../../component/Restaurant/Sidebar";
import { useSelector } from "react-redux";

const QRCode = () => {
  const {user} = useSelector((state) => state.user);
  const restaurantId = user && user._id;
  const menuUrl =  `https://smartserve-seven.vercel.app/create-order/${restaurantId}`; 
  const downloadQR = () => {
    const canvas = document.querySelector("canvas");
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "menu-qr.png";
    a.click();
  };

  return (
    <div className="flex font-outfit bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="ml-[23%] w-full p-10">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Menu QR Code
            </h1>
            <button
              onClick={downloadQR}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Download QR
            </button>
          </div>

          <div className="flex flex-col items-center gap-4">
            <QRCodeCanvas value={menuUrl} size={220} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCode;
