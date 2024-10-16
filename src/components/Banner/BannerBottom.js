import React from "react";
// import { CgAdd } from "react-icons/cg";
// import { CgRedo } from "react-icons/cg";
import { FaShippingFast } from "react-icons/fa";
import { MdContactSupport, MdShield } from "react-icons/md";
import { Link } from "react-router-dom";

const BannerBottom = () => {
  return (
    <div className="w-full border-b-[1px] py-4 border-b-gray-300 bg-gray-50 px-4">
      <div className="max-w-container mx-auto h-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Warranty Section */}
        <Link to='/warranty'>
          <div className="flex items-center gap-2 w-full md:w-72 shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 bg-white rounded-lg">
            <span className="font-bold w-12 h-12 flex items-center justify-center">
              <MdShield className="w-10 h-10 text-blue-600" />
            </span>
            <p className="text-gray-800 text-sm md:text-base">Two years warranty</p>
          </div>
        </Link>

        {/* Free Shipping Section */}
        <Link to='/free-shipping'>
          <div className="flex items-center gap-2 w-full md:w-72 shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 bg-white rounded-lg">
            <span className="w-12 h-12 text-orange-500 flex items-center justify-center">
              <FaShippingFast className="w-10 h-10" />
            </span> 
            <p className="text-gray-800 text-sm md:text-base">
              Free shipping <br />
              <span className="text-xs text-gray-600">Free Shipping Worldwide</span>
            </p>
          </div>
        </Link>

        {/* Support Section */}
        <Link to='/support'>
          <div className="flex items-center gap-2 w-full md:w-72 shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 bg-white rounded-lg">
            <span className="w-12 h-12 flex items-center justify-center">
              <MdContactSupport className="w-10 h-10 text-green-500" />
            </span>
            <p className="text-gray-800 text-sm md:text-base">
              24/7 Support <br />
              <span className="text-xs text-gray-600">Online and Phone Support</span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BannerBottom;
