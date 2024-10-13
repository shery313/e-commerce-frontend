import React, { useContext, useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import apiInstance from "../../../axios/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../plugins/AddToCart";
import GetCurrentAddress from "../../plugins/UserCountry";
import CartID from "../../plugins/CartID";
import { CartContext } from "../../plugins/Context";
import UserData from "../../plugins/UserData";
import { addToWishlist } from "../../plugins/addToWishList";

const Product = (props) => {
  const axios = apiInstance;
  const [cartCount, setCartCount] = useContext(CartContext);
  const [isAddingToCart, setIsAddingToCart] = useState("Add To Cart");
  const currentAddress = GetCurrentAddress();
  const [qtyValue, setQtyValue] = useState(1);
  const [colorValue, setColorValue] = useState(props.colors[0]?.name || ""); // Default color
  const [sizeValue, setSizeValue] = useState(props.sizes[0]?.name || ""); // Default size
  const [showOptions, setShowOptions] = useState(false);
  const cart_id = CartID();
  const userData = UserData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productItem = props;

  // Navigate to product details page
  const handleProductDetails = () => {
    navigate(`/product/${props.slug}`, {
      state: { item: productItem },
    });
  };

  // Add to cart with selected size, color, and quantity
  const handleAddToCart = async () => {
    try {
      await addToCart(
        props._id,
        userData?.user_id,
        qtyValue,
        props.price,
        props.shipping_amount,
        currentAddress.country,
        sizeValue,
        colorValue,
        cart_id,
        setIsAddingToCart
      );

      const url = userData?.user_id
        ? `cart-list/${cart_id}/${userData?.user_id}/`
        : `cart-list/${cart_id}/`;
      const response = await axios.get(url);

      setCartCount(response.data.length);
      Swal.fire({
        icon: "success",
        title: "Added To Cart",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Add to wishlist
  const handleAddToWishlist = async (product_id) => {
    try {
      await addToWishlist(product_id, userData?.user_id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="relative group w-full rounded-lg overflow-hidden bg-[#F8F9FA] shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105" // Updated bg color
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div className="relative overflow-hidden rounded-lg transition-transform duration-500 ease-in-out transform group-hover:scale-110">
        <div onClick={handleProductDetails} className="cursor-pointer">
          <Image className="w-full h-full rounded-lg transition-opacity duration-300 hover:opacity-80" imgSrc={props.img} />
        </div>
        {props.badge && (
          <div className="absolute top-4 left-4">
            <Badge text="New" />
          </div>
        )}
      </div>

      {/* Hover Options */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-[#FFFFFF] p-4 shadow-lg rounded-lg transition-transform duration-500 transform ${showOptions ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
      >
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleAddToCart}
            className="text-[#6C757D] hover:text-[#007BFF] text-sm font-normal flex items-center gap-2 cursor-pointer transform transition-transform duration-300 hover:scale-110" // Updated text colors
          >
            Add to Cart
            <FaShoppingCart className="transition-transform duration-300 transform hover:rotate-12" />
          </button>
          <button
            onClick={handleProductDetails}
            className="text-[#6C757D] hover:text-[#007BFF] text-sm font-normal flex items-center gap-2 cursor-pointer transform transition-transform duration-300 hover:scale-110"
          >
            View Details
            <MdOutlineLabelImportant className="transition-transform duration-300 transform hover:rotate-12" />
          </button>
          <button
            onClick={() => handleAddToWishlist(props._id)}
            className="text-[#6C757D] hover:text-[#007BFF] text-sm font-normal flex items-center gap-2 cursor-pointer transform transition-transform duration-300 hover:scale-110"
          >
            Add to Wish List
            <BsSuitHeartFill className="transition-transform duration-300 transform hover:scale-125" />
          </button>

          {/* Conditional Selectors */}
          {(props.colors.length > 0 || props.sizes.length > 0) && (
            <div>
              {props.colors.length > 0 && (
                <div className="mb-2">
                  <label className="text-sm text-gray-600">Select Color:</label>
                  <select
                    value={colorValue}
                    onChange={(e) => setColorValue(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#007BFF] focus:border-[#007BFF] sm:text-sm" // Updated focus colors
                  >
                    {props.colors.map((color, index) => (
                      <option key={index} value={color.name}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {props.sizes.length > 0 && (
                <div className="mb-2">
                  <label className="text-sm text-gray-600">Select Size:</label>
                  <select
                    value={sizeValue}
                    onChange={(e) => setSizeValue(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#007BFF] focus:border-[#007BFF] sm:text-sm"
                  >
                    {props.sizes.map((size, index) => (
                      <option key={index} value={size.name}>
                        {size.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="text-sm text-gray-600">Select Quantity:</label>
                <input
                  type="number"
                  value={qtyValue}
                  onChange={(e) => setQtyValue(e.target.value)}
                  min="1"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#007BFF] focus:border-[#007BFF] sm:text-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="py-6 px-4 border-t border-gray-200 max-w-80 flex flex-col gap-1 transition-all duration-300 ease-in-out hover:shadow-xl rounded-b-lg">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-[#007BFF] font-bold">{props.productName}</h2> {/* Updated product name color */}
          <p className="text-[#6C757D] text-[14px]">Rs: {props.price}</p> {/* Updated price color */}
        </div>
      </div>
    </div>
  );
};

export default Product;
