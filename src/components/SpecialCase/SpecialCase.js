import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
// import { useSelector } from "react-redux";
// import apiInstance from "../../axios/axios";
import { CartContext } from "../plugins/Context";
import UserData from "../plugins/UserData";


const SpecialCase = () => {

  // const [products,setProducts]=useState([]);
  const userData=UserData()?.user_id
  const cartCount = useContext(CartContext)

  return (
    <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">
      {
        userData? 
        <Link to="/customer/account/">
        <div className="bg-blue-100 w-16 h-[70px] rounded-md flex flex-col gap-1 text-blue-500 justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
          <div className="flex justify-center items-center">
            <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          
          <p className="text-xs font-semibold font-titleFont">Profile</p>
        </div>
      </Link>:
      <Link to="/signin">
      <div className="bg-blue-100 w-16 h-[70px] rounded-md flex flex-col gap-1 text-blue-500 justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
        <div className="flex justify-center items-center">
          <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

          <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
        </div>
        
        <p className="text-xs font-semibold font-titleFont">Login</p>
      </div>
    </Link>
      }
      
      <Link to="/cart">
        <div className="bg-blue-100 w-16 h-[70px] rounded-md flex flex-col gap-1 text-blue-500 justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
          <div className="flex justify-center items-center">
            <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">Buy Now</p>
          {parseInt(cartCount) > 0 && (
            <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {cartCount}
            </p>
         )} 
        </div>
      </Link>
    </div>
  );
};

export default SpecialCase;
