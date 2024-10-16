import  { useState, useRef, useEffect, useContext } from "react";
import { motion } from "framer-motion";
// import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart, FaHome } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { paginationItems } from "../../../constants";
import { BsSuitHeartFill } from "react-icons/bs";
import { CartContext } from "../../plugins/Context";
import apiInstance from "../../../axios/axios";
import UserData from "../../plugins/UserData";

const HeaderBottom = () => {
  // const products = useSelector((state) => state.orebiReducer.products);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const userdata = UserData()?.user_id;
  const ref = useRef();
  
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show, ref]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const cartCount = useContext(CartContext);
  
  const [category, setCategory] = useState([]);
  const [query, setQuery] = useState('');
  
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiInstance.get(`search/?query=${query}`);
      setFilteredProducts(response.data);
    };
    const fetchCategory = async () => {
      const response = await apiInstance.get(`category`);
      setCategory(response.data);
    };
    fetchData();
    fetchCategory();
  }, [query]);

  return (
    <div className="w-full bg-[#E3F2FD] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <Link className="hidden md:block" to='/'><FaHome className="h-10 w-10 text-[#1E88E5]" /></Link>
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-[#FFFFFF] flex items-center gap-2 justify-between px-6 rounded-xl my-2 shadow-md">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={query}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5 text-[#1E88E5]" />
            {query && (
              <div className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}>
                {filteredProducts.map((item) => (
                  <div
                    onClick={() =>
                      navigate(`/product/${item.slug.toLowerCase().split(" ").join("")}`, {
                        state: { item: item },
                      }) & setShowSearchBar(true) & setQuery("")
                    }
                    key={item.id}
                    className="max-w-[600px] h-28 bg-[#E3F2FD] mb-3 flex items-center gap-3 p-4 rounded-lg shadow-sm"
                  >
                    <img className="w-24" src={item.image} alt="productImg" />
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-lg">{item.title}</p>
                      <p className="text-xs">
                        {item.description.length > 100 ? `${item.description.slice(0, 100)}...` : item.description}
                      </p>
                      <p className="text-sm">
                        Price: <span className="text-[#1E88E5] font-semibold">${item.price}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div onClick={() => setShowUser(!showUser)} className="flex items-center">
              <FaUser className="h-8 w-8 text-[#1E88E5]" />
              <FaCaretDown className="h-8 w-8 text-[#1E88E5]" />
            </div>
            {showUser && (
              userdata ? (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-6 left-0 z-50 bg-[#BBDEFB] w-44 text-[#767676] h-auto p-4 pb-6 rounded-lg shadow-md"
                >
                  <Link to="/customer/account">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-[#1E88E5] hover:text-[#1E88E5] duration-300 cursor-pointer">
                      Profile
                    </li>
                  </Link>
                  <Link onClick={() => setShowUser(false)} to="/customer/notifications/">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-[#1E88E5] hover:text-[#1E88E5] duration-300 cursor-pointer">
                      Notifications
                    </li>
                  </Link>
                  <Link onClick={() => setShowUser(false)} to="/customer/orders">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-[#1E88E5] hover:text-[#1E88E5] duration-300 cursor-pointer">
                      Orders
                    </li>
                  </Link>
                  <Link onClick={() => setShowUser(false)} to="/customer/wishlist">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-[#1E88E5] hover:text-[#1E88E5] duration-300 cursor-pointer">
                      Wishlist
                    </li>
                  </Link>
                  <Link onClick={() => setShowUser(false)} to="/customer/settings">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-[#1E88E5] hover:text-[#1E88E5] duration-300 cursor-pointer">
                      Settings
                    </li>
                  </Link>
                  <Link onClick={() => setShowUser(false)} to="/logout">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-[#1E88E5] hover:text-[#1E88E5] duration-300 cursor-pointer">
                      Logout
                    </li>
                  </Link>
                </motion.ul>
              ) : (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-6 left-0 z-50 bg-[#BBDEFB] w-44 text-[#767676] h-auto p-4 pb-6 rounded-lg shadow-md"
                >
                  <Link to="/signin">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-[#1E88E5] hover:text-[#1E88E5] duration-300 cursor-pointer">
                      Login
                    </li>
                  </Link>
                  <Link onClick={() => setShowUser(false)} to="/signup">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-[#1E88E5] hover:text-[#1E88E5] duration-300 cursor-pointer">
                      Sign Up
                    </li>
                  </Link>
                </motion.ul>
              )
            )}
            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart className="h-8 w-8 text-[#1E88E5]" />
                {parseInt(cartCount) > 0 && (
                  <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
            <Link to="/customer/wishlist/">
              <div className="relative">
                <BsSuitHeartFill className="h-8 w-8 text-[#1E88E5]" />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                  {cartCount}
                </span>
              </div>
            </Link>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
