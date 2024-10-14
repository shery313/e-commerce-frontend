import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCity, FaMapMarkerAlt, FaReceipt, FaPrint } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import apiInstance from '../../axios/axios';
// import print from './print.css'
function Invoice() {
  const [order, setOrder] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  // const apiInstance = apiInstance;
  const param = useParams();

  useEffect(() => {
    apiInstance.get(`checkout/${param?.order_oid}/`).then((res) => {
      setOrder(res.data);
      setOrderItems(res.data.orderitem);
    });
  }, [param?.order_oid]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-100 p-4 md:p-8 print-container">
      <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-lg invoice-content">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row  justify-between items-start">
          {/* Logo and Store Info */}
          <div className="flex items-center mb-6 lg:mb-0">
            <img className="h-24 w-24 rounded-full" alt="Logo" src='/vivify.png' />
            <div className="ml-4">
              <h2 className="text-xl font-bold">Vivify Store</h2>
              <p className="text-sm text-gray-600">+92 314 8295966</p>
              <p className="text-sm text-gray-600">khushakbatain@gmail.com</p>
              <p className="text-sm text-gray-600">G6, Islamabad</p>
            </div>
          </div>

          {/* Customer Details */}
          <div className="ml-0 lg:ml-4 flex flex-col  items-start">
            <h4 className="text-lg font-semibold">Customer Details</h4>
            <p className="flex items-center text-sm">
              <FaUser className="mr-2" /> <strong>Name:</strong> {order.full_name}
            </p>
            <p className="flex items-center text-sm">
              <FaEnvelope className="mr-2" /> <strong>Email:</strong> {order.email}
            </p>
            <p className="flex items-center text-sm">
              <FaPhone className="mr-2" /> <strong>Phone:</strong> {order.mobile}
            </p>
            <p className="flex items-center text-sm">
              <FaCity className="mr-2" /> <strong>City:</strong> {order.city}
            </p>
            <p className="flex items-center text-sm">
              <FaMapMarkerAlt className="mr-2" /> <strong>Address:</strong> {order.address}
            </p>
            <p className="flex items-center text-sm mt-4">
              <FaReceipt className="mr-2" /> <strong>Invoice ID:</strong> #{order.oid}
            </p>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-left text-sm text-gray-600 uppercase">
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Qty</th>
                <th className="px-4 py-2">Sub Total</th>
                <th className="px-4 py-2">Discount</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((orderItem, index) => (
                <tr key={index} className="text-sm border-b border-gray-300">
                  <td className="px-4 py-2">{orderItem?.product?.title}</td>
                  <td className="px-4 py-2">PKR {orderItem?.price}</td>
                  <td className="px-4 py-2">{orderItem?.qty}</td>
                  <td className="px-4 py-2">PKR {orderItem?.sub_total}</td>
                  <td className="px-4 py-2">PKR {orderItem?.saved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className="flex flex-col md:flex-row justify-between mt-6">
          <div className="mt-4 md:mt-0">
            <h4 className="text-lg font-semibold mb-2">Summary</h4>
            <p className="text-sm"><strong>Sub Total:</strong> PKR {order.sub_total}</p>
            <p className="text-sm"><strong>Shipping:</strong> PKR {order.shipping_amount}</p>
            <p className="text-sm"><strong>Tax:</strong> PKR {order.tax_fee}</p>
            <p className="text-sm"><strong>Service Fee:</strong> PKR {order.service_fee}</p>
            <p className="text-lg font-bold mt-2"><strong>Total:</strong> PKR {order.total}</p>
          </div>
        </div>

        <hr className="my-6" />

        {/* Print Button */}
        <div className="flex justify-center no-print">
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Print <FaPrint className='inline h-5 w-5'/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
