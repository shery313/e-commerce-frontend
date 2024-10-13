import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import apiInstance from '../../axios/axios';
import UserData from '../plugins/UserData';
import { Link, useParams } from 'react-router-dom';

function OrderDetail() {
  const [order, setOrder] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const axios = apiInstance;
  const userData = UserData();
  const param = useParams();

  useEffect(() => {
    axios.get(`customer/order/detail/${userData?.user_id}/${param?.order_oid}`).then((res) => {
      setOrder(res.data);
      setOrderItems(res.data.orderitem);
      if (order) {
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="w-full lg:w-3/4 p-4">
        {loading === false ? (
          <main className="bg-white p-6 rounded-lg shadow-lg">
            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 flex items-center text-primary">
                <i className="fas fa-shopping-cart mr-2" /> Order #{param.order_oid}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total', value: `$${order.total}`, color: 'bg-teal-100' },
                  { label: 'Payment Status', value: order.payment_status?.toUpperCase(), color: 'bg-purple-100' },
                  { label: 'Order Status', value: order.order_status, color: 'bg-blue-100' },
                  { label: 'Shipping Amount', value: `$${order.shipping_amount}`, color: 'bg-green-100' },
                  { label: 'Tax Fee', value: `$${order.tax_fee}`, color: 'bg-green-100' },
                  { label: 'Service Fee', value: `$${order.service_fee}`, color: 'bg-purple-200' },
                  { label: 'Discount', value: `-$${order.saved}`, color: 'bg-blue-200' },
                ].map(({ label, value, color }, index) => (
                  <div key={index} className={`${color} rounded-lg shadow p-4`}>
                    <p className="text-sm text-gray-600 mb-1">{label}</p>
                    <h2 className="text-xl font-bold">{value}</h2>
                  </div>
                ))}
              </div>
            </section>

            {/* Order Items Table with responsiveness */}
            <section className="bg-white shadow-md rounded-lg p-4">
              <div className="overflow-x-auto"> {/* Enable horizontal scrolling */}
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left">Product</th>
                      <th className="py-3 px-4 text-left">Price</th>
                      <th className="py-3 px-4 text-left">Qty</th>
                      <th className="py-3 px-4 text-left">Total</th>
                      <th className="py-3 px-4 text-left">Discount</th>
                      <th className="py-3 px-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((order, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-3 px-4 flex items-center">
                          <img
                            src={order?.product?.image}
                            className="w-16 h-16 object-cover rounded-lg"
                            alt=""
                          />
                          <Link to={`/detail/${order.product.slug}`} className="text-gray-700 mr-4 px-3">
                            {order?.product?.title}
                          </Link>
                        </td>
                        <td className="py-3 px-4 md:px-6 whitespace-nowrap">${order.product.price}</td> {/* Added whitespace-nowrap */}
                        <td className="py-3 px-4">{order.qty}</td>
                        <td className="py-3 px-4">${order.sub_total}</td>
                        <td className="py-3 px-4 text-red-500">-${order.saved}</td>
                        <td className="py-3 px-4">
                          {order.tracking_id ? (
                            <a
                              className="bg-green-500 text-white py-1 px-3 rounded-lg"
                              target="_blank"
                              href={`${order.delivery_couriers?.tracking_website}?${order.delivery_couriers?.url_parameter}=${order.tracking_id}`}
                              rel="noopener noreferrer"
                            >
                              Track Item
                            </a>
                          ) : (
                            <button className="bg-gray-300 text-gray-700 py-1 px-3 rounded-lg" disabled>
                              No Tracking Yet
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        ) : (
          <div className="flex justify-center mt-20">
            <img
              src="https://cdn.dribbble.com/users/2046015/screenshots/5973727/06-loader_telega.gif"
              alt="Loading"
              className="w-24 h-24"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderDetail;
