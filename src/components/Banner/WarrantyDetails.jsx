import React from "react";
import { Link } from "react-router-dom";

const WarrantyDetails = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Two-Year Warranty Details
        </h1>
        <p className="text-center text-lg text-gray-600 mb-12">
          We stand behind the quality of our products. Here’s everything you need to know about our two-year warranty policy.
        </p>
      </div>

      {/* Warranty Breakdown */}
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8 lg:flex lg:space-x-12 mb-10">
        {/* Coverage Section */}
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What's Covered</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li><strong>Manufacturing Defects:</strong> Any defects in materials or workmanship.</li>
            <li><strong>Faulty Parts:</strong> Free replacement for any malfunctioning parts.</li>
            <li><strong>Mechanical Issues:</strong> All essential mechanical and electronic components.</li>
            <li><strong>Free Repairs:</strong> Our technicians will repair any defects for free.</li>
          </ul>
        </div>

        {/* Exclusions Section */}
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What’s Not Covered</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li><strong>Normal Wear and Tear:</strong> Wear and tear from everyday use.</li>
            <li><strong>Accidental Damage:</strong> Damage caused by improper handling or accidents.</li>
            <li><strong>Third-Party Repairs:</strong> Unauthorized repairs or modifications.</li>
            <li><strong>Cosmetic Issues:</strong> Scratches, dents, or surface wear that does not affect performance.</li>
          </ul>
        </div>
      </div>

      {/* Customer Process Section */}
      <div className="max-w-7xl mx-auto bg-gray-100 shadow-lg rounded-lg p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Claim Your Warranty</h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-700">
          <li>Contact our support team via email or phone with your order number and a description of the issue.</li>
          <li>Send the product back to us using the provided return label.</li>
          <li>Our technicians will inspect the product and verify the warranty claim.</li>
          <li>We will repair or replace the product and ship it back to you at no extra cost.</li>
        </ol>
      </div>

      {/* Additional Info Section */}
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Information</h2>
        <p className="text-gray-700 mb-6">
          This warranty is applicable only to products purchased directly from our store or authorized resellers. Warranty claims must be made within two years from the date of purchase. The warranty is non-transferable and is only valid for the original purchaser.
        </p>
        <div className="text-center">
          <Link to="/contact" className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-green-700 transition duration-300">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WarrantyDetails;
