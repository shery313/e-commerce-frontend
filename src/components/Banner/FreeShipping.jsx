import React from "react";
import { Link } from "react-router-dom";

const FreeShipping = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Free Shipping Details
        </h1>
        <p className="text-center text-lg text-gray-600 mb-12">
          Enjoy our fast, free shipping services on orders over $50! Learn more
          about our shipping policies and how you can take advantage of our
          offer.
        </p>

        {/* Free Shipping Policy Details */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Eligibility for Free Shipping
          </h2>
          <p className="text-gray-700 mb-6">
            Free shipping is available for all orders with a total value of over{" "}
            <strong>$50</strong> (excluding taxes and discounts). Orders under
            $50 will have a standard shipping charge based on your location and
            shipping method chosen.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Shipping Locations
          </h2>
          <p className="text-gray-700 mb-6">
            We offer free shipping within the United States, Canada, and select
            international countries. Shipping rates will apply to locations not
            eligible for free shipping. Please check the shipping rate at
            checkout.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Delivery Time
          </h2>
          <p className="text-gray-700 mb-6">
            Orders qualifying for free shipping will be delivered within{" "}
            <strong>5-7 business days</strong> in the U.S. and Canada. For
            international orders, delivery times may vary between{" "}
            <strong>7-14 business days</strong>.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Tracking Your Order
          </h2>
          <p className="text-gray-700 mb-6">
            Once your order has shipped, you will receive a confirmation email
            with your tracking number. You can track the status of your
            shipment directly through the carrier’s website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Express Shipping Options
          </h2>
          <p className="text-gray-700 mb-6">
            If you need your items sooner, we also offer expedited shipping
            options at checkout. Please note that additional charges apply for
            express shipping, and delivery times will vary depending on the
            selected method.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Shipping Restrictions
          </h2>
          <p className="text-gray-700 mb-6">
            Please note that free shipping is not available for oversized items
            or items shipped to Alaska, Hawaii, and U.S. territories. For these
            destinations, regular shipping fees will apply.
          </p>

          <div className="mt-8">
            <Link to="/shop">
              <button className="w-48 h-12 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">
                Shop Now
              </button>
            </Link>
          </div>
        </div>

        {/* Additional Contact Section */}
        <div className="mt-12 bg-gray-100 shadow-lg rounded-lg p-8 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Need More Information?
          </h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about our free shipping policy or need
            help with your order, please don’t hesitate to contact our customer
            support team.
          </p>

          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@yourstore.com" className="text-green-600">
                support@yourstore.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a href="tel:+1234567890" className="text-green-600">
                +1 (234) 567-890
              </a>
            </li>
            <li>
              <strong>Working Hours:</strong> Monday - Friday, 9 AM to 6 PM
              (PST)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FreeShipping;
