import React, { useEffect, useState } from 'react'
import Sidebar from '../../component/Restaurant/Sidebar'
import { BiSearchAlt } from 'react-icons/bi'
// import { menuItems } from '../../data/Menu';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import AddItem from '../../component/Restaurant/AddItem';
import EditItem from '../../component/Restaurant/EditItem';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMenuItems } from '../../redux/action/menu';

const MenuItems = () => {
 const {user} = useSelector((state)=> state.user)
 const restaurantId = user && user._id
  const {menuItems} = useSelector((state)=> state.menu)
  const [search, setSearch] = useState("");
  const [open,setOpen] = useState(false);
  const [selectItem,setSelectItem] =useState("")
  const [edit,setEdit] =useState(false);
  const [del, setDel] =useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllMenuItems(restaurantId))
  },[dispatch,restaurantId])
  
  const handleEditClick = (item) =>{
    setEdit(true),
    setSelectItem(item)
  }
  return (
    <div className=" flex font-outfit">
        <Sidebar/>
        <div className="w-[77%] ml-[23%] mt-8 mb-10 pr-6">
            <div className=" flex justify-between">
              <div className=" relative w-[50%]">
                <input type="text" placeholder='Search Product ...' value={search} onChange={(e)=>setSearch(e.target.value)} className='w-full border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-600'/>
                <BiSearchAlt size={25} className=' absolute top-2 right-2 cursor-pointer  '/>
              </div>
              <button
                onClick={()=>setOpen(true)}
              className=' bg-green-600 text-white px-6 py-3  rounded-md  hover:bg-green-700 transition-all duration-200 ease-in-out'
              >
                Add Item
              </button>
              <AddItem open={open} close={()=>setOpen(false)}/>
            </div>
            <div className="mt-10">
              <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 500 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell 
                         className="text-white font-semibold"
                         sx={{
                           bgcolor: "#16a34a",
                           fontWeight: "bold",
                           fontSize: "19px",
                           color: "white",
                         }}
                        >
                          S.No
                        </TableCell>
                        <TableCell 
                         className="text-white font-semibold"
                         sx={{
                           bgcolor: "#16a34a",
                           fontWeight: "bold",
                           fontSize: "19px",
                           color: "white",
                         }}
                        >
                          Name
                        </TableCell>
                        <TableCell 
                         className="text-white font-semibold"
                         sx={{
                           bgcolor: "#16a34a",
                           fontWeight: "bold",
                           fontSize: "19px",
                           color: "white",
                         }}
                        >
                          Category
                        </TableCell>
                        <TableCell 
                         className="text-white font-semibold"
                         sx={{
                           bgcolor: "#16a34a",
                           fontWeight: "bold",
                           fontSize: "19px",
                           color: "white",
                         }}
                        >
                          Price
                        </TableCell>
                        <TableCell 
                         className="text-white font-semibold"
                         sx={{
                           bgcolor: "#16a34a",
                           fontWeight: "bold",
                           fontSize: "19px",
                           color: "white",
                         }}
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {menuItems.filter((item)=>item.name.toLowerCase().includes(search)).map((item, index) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>Rs {item.price}</TableCell>
                          <TableCell>
                          <div className="flex gap-4">
                            <button
                              className="text-green-700"
                              onClick={()=> handleEditClick(item)}
                            >
                              <AiOutlineEdit size={20} />
                            </button>
                            <button
                              className="text-red-700"
                              onClick={()=> setDel(true)  || setDel(item)}
                            >
                              <AiOutlineDelete size={20} />
                            </button>
                          </div>
                        </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
            <EditItem open={edit} close = {()=> setEdit(false)} item={selectItem}/>
            <DeleteItem open={del} close={()=> setDel(false)} item={del}  />
            
        </div>
    </div>
  )
}

export default MenuItems

const DeleteItem = ({open,close,item}) =>{
  return(
    <div>
    {open && (
      <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-[999] flex justify-center items-center">
        <div className="bg-white p-10 rounded-md">
          <h1 className="text-2xl font-semibold">
            Are you sure you want to delete this item?
          </h1>
          <div className="flex justify-center gap-4 mt-5">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md transition hover:scale-105"
              onClick={close}
            >
              No
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-md transition hover:scale-105"
             
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}