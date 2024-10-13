import React from "react";
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <div className="bg-white py-10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 lg:space-x-12">
        
        {/* Left Section: Contact Information */}
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="flex items-center lg:mr-10">
            <i className="fas fa-headset text-5xl text-blue-600 mr-6"></i>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">24/7 Customer Support</h3>
              <p className="text-gray-600 text-base">We are here for you anytime, anywhere!</p>
            </div>
          </div>
          
          {/* Contact Details */}
          <div className="mt-4 lg:mt-0">
            <p className="text-lg text-gray-700"><i className="fas fa-phone-alt text-blue-500"></i> +1-800-123-4567</p>
            <p className="text-lg text-gray-700"><i className="fas fa-envelope text-blue-500"></i> support@example.com</p>
          </div>
        </div>

        {/* Right Section: Support Actions */}
        <div className="flex space-x-4">
          {/* Live Chat Button */}
          <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300">
            Live Chat Now
          </button>

          {/* Contact Us & FAQs */}
          <Link
            to="/contact"
            className="text-blue-600 border-2 border-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
          >
            Contact Us
          </Link>
          <Link
            to="/faq"
            className="text-blue-600 py-3 px-6 font-semibold hover:text-blue-800 transition duration-300"
          >
            FAQs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Support;
