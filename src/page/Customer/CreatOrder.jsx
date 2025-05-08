import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllMenuItems } from "../../redux/action/menu";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import toast from "react-hot-toast";
const CreatOrder = () => {
  const { id: restaurantId } = useParams();
  const { menuItems } = useSelector((state) => state.menu);
  const [filter, setFilter] = useState("all");
  const [selectedItems, setSelectedItems] = useState({});
  const [open, setOpen] = useState(false);
  const [tableNo, setTableNo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMenuItems(restaurantId));
  }, [dispatch, restaurantId]);
  const categories = [...new Set(menuItems.map((item) => item.category))];
  const filterItem =
    filter === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === filter);

  const handleQuantityChange = (item, delta) => {
    const key = `${item._id}`;
    setSelectedItems((prev) => {
      const updated = { ...prev };
      const existing = updated[key] || { ...item, quantity: 0 };
      existing.quantity += delta;
      if (existing.quantity <= 0) {
        delete updated[key];
      } else {
        updated[key] = existing;
      }
      return updated;
    });
  };
  const totalItems = Object.values(selectedItems).length;
  const totalPrice = Object.values(selectedItems).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${server}/order/create`,
        {
          restaurantId,
          tableNo,
          name,
          phone,
          items: Object.values(selectedItems),
          totalPrice,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setSelectedItems({});
        setOpen(false);
        setTableNo("");
        setName("");
        setPhone("");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="my-8 mx-3">
      <div className="flex justify-between items-center mb-8">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-xl border border-green-600 outline-none p-2 rounded-md w-[35%] sm:w-[20%] lg:w-[15%]"
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div className="relative">
          {/* Cart Button */}
          <div
            onClick={() => setOpen(true)}
            className="w-12 h-12 border border-green-600 rounded-full flex justify-center items-center cursor-pointer "
          >
            <MdOutlineAddShoppingCart size={24} className="text-green-600" />
          </div>

          {/* Cart Badge */}
          <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
            {totalItems ? totalItems : 0}
          </span>
        </div>
      </div>
      <Cart
        open={open}
        setOpen={setOpen}
        selectedItems={selectedItems}
        handleQuantityChange={handleQuantityChange}
        totalPrice={totalPrice}
        tableNo={tableNo}
        setTableNo={setTableNo}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        handleSubmit={handleSubmit}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterItem.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md border p-4"
          >
            <img
              src={item.image && item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="flex justify-between items-center mt-2">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <span className="text-green-600 font-semibold">
                ₨ {item.price}
              </span>
            </div>
            <div className="flex justify-center items-center gap-2 pt-2">
              <button
                onClick={() => handleQuantityChange(item, -1)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                <BiMinus size={16} />
              </button>
              <span>{selectedItems[item._id]?.quantity || 0}</span>

              <button
                onClick={() => handleQuantityChange(item, 1)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                <BiPlus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatOrder;

const Cart = ({
  open,
  setOpen,
  selectedItems,
  handleQuantityChange,
  totalPrice,
  tableNo,
  setTableNo,
  name,
  setName,
  phone,
  setPhone,
  handleSubmit,
}) => {
  return (
    <div
      className=" fixed top-0 right-0 w-[360px] h-screen bg-white shadow-lg z-50 transition-transform transform"
      style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
    >
      {/* Cart Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Selected Item</h2>
        <button
          onClick={() => setOpen(false)}
          className=" text-3xl font-bold hover:text-green-600"
        >
          &times;
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-[80%]">
        {Object.keys(selectedItems).length > 0 && (
          <div className=" mt-5">
            {Object.entries(selectedItems).map(([key, item]) => (
              <div
                key={key}
                className="flex justify-between items-center py-2 border-b"
              >
                <span>{item.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item, -1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item, 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                  <span className="ml-4">Rs {item.price * item.quantity}</span>
                </div>
              </div>
            ))}
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" mt-4 w-full border border-gray-200 p-1 outline-none focus:ring-1 focus:ring-green-600"
            />
            <input
              type="text"
              placeholder="Enter Phone No"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className=" mt-4 w-full border border-gray-200 p-1 outline-none focus:ring-1 focus:ring-green-600"
            />
            <input
              type="text"
              placeholder="Enter Table No"
              value={tableNo}
              onChange={(e) => setTableNo(e.target.value)}
              className=" mt-4 w-full border border-gray-200 p-1 outline-none focus:ring-1 focus:ring-green-600"
            />
            <div className="text-right mt-4 font-semibold">
              Total: Rs {totalPrice}
            </div>
            <button
              onClick={handleSubmit}
              className="mt-4 p-2 w-full bg-green-600 text-white rounded"
            >
              Submit Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
