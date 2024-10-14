import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import apiInstance from '../../axios/axios';
import UserData from '../plugins/UserData';
import moment from 'moment';
import { Link } from 'react-router-dom';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [fullfilled, setFullfilled] = useState([]);
    const [pending, setPending] = useState([]);

    // const axios = apiInstance;
    const userData = UserData();

    useEffect(() => {
        if (userData?.user_id) {
            apiInstance.get(`customer/orders/${userData?.user_id}/`).then((res) => {
                setOrders(res.data);
            });
            apiInstance.get(`fullfilled/${userData?.user_id}/`).then((res) => {
                setFullfilled(res.data);
            });
            apiInstance.get(`pending/${userData?.user_id}/`).then((res) => {
                setPending(res.data);
            });
        }
    }, [userData?.user_id]);

    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar />
            <main className="flex-1 mt-5 mb-40 px-4">
                <div className="container mx-auto">
                    {/* Order Summary Section */}
                    <section className="mb-8">
                        <h3 className="text-2xl font-bold mb-6">
                            <i className="fas fa-shopping-cart text-blue-500"></i> Orders
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Total Orders */}
                            <div className="bg-teal-200 p-4 sm:p-6 rounded-lg shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Total Orders</p>
                                        <h2 className="text-2xl font-bold">{orders.length}</h2>
                                    </div>
                                    <div className="bg-teal-600 p-2 sm:p-3 rounded-full">
                                        <i className="fas fa-shopping-cart text-white text-xl"></i>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Pending Orders */}
                            <div className="bg-purple-200 p-4 sm:p-6 rounded-lg shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Pending Orders</p>
                                        <h2 className="text-2xl font-bold">{pending.length}</h2>
                                    </div>
                                    <div className="bg-purple-600 p-2 sm:p-3 rounded-full">
                                        <i className="fas fa-clock text-white text-xl"></i>
                                    </div>
                                </div>
                            </div>

                            {/* Fulfilled Orders */}
                            <div className="bg-blue-200 p-4 sm:p-6 rounded-lg shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Fulfilled Orders</p>
                                        <h2 className="text-2xl font-bold">{fullfilled.count}</h2>
                                    </div>
                                    <div className="bg-blue-600 p-2 sm:p-3 rounded-full">
                                        <i className="fas fa-check-circle text-white text-xl"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Order Table Section */}
                    <section>
                        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-2 sm:px-6 py-3 text-left text-sm font-medium text-gray-600">Order ID</th>
                                        <th className="px-2 sm:px-6 py-3 text-left text-sm font-medium text-gray-600">Payment Status</th>
                                        <th className="px-2 sm:px-6 py-3 text-left text-sm font-medium text-gray-600">Order Status</th>
                                        <th className="px-2 sm:px-6 py-3 text-left text-sm font-medium text-gray-600">Total</th>
                                        <th className="px-2 sm:px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((o, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="px-2 sm:px-6 py-4 text-sm font-medium">
                                                <p>#{o.oid}</p>
                                                <p className="text-gray-500">{moment(o.date).format('MM/DD/YYYY')}</p>
                                            </td>
                                            <td className="px-2 sm:px-6 py-4 text-sm">Unpaid</td>
                                            <td className="px-2 sm:px-6 py-4 text-sm">{o.order_status}</td>
                                            <td className="px-2 sm:px-6 py-4 text-sm">PKR {o.total}</td>
                                            <td className="px-2 sm:px-6 py-4 text-sm">
                                                <Link
                                                    to={`/customer/order/detail/${o.oid}/`}
                                                    className="text-blue-500 hover:text-blue-600 transition-colors"
                                                >
                                                    View <i className="fas fa-eye"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {orders.length === 0 && (
                                <p className="text-center text-gray-500 mt-4">No orders found.</p>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Orders;
