import React, { useState, useEffect } from 'react';
import apiInstance from '../../axios/axios';
import { useParams, Link } from 'react-router-dom';

function OrderSuccess() {
    const [loading, setIsLoading] = useState(true);
    const [order, setOrder] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const param = useParams();
    const axios = apiInstance;

    useEffect(() => {
        axios.get(`checkout/${param?.order_oid}/`).then((res) => {
            setOrder(res.data);
            setOrderItems(res.data.orderitem);
        });
    }, [param]);

    useEffect(() => {
        const formData = new FormData();
        formData.append('order_oid', param?.order_oid);

        setIsLoading(true);

        axios.post(`order-success/`, formData).then((res) => {
            if (res.data.message === "Payment Successfull") {
                setIsLoading(false);
            }
            if (res.data.message === "Already Paid") {
                setIsLoading(false);
            }
        });
    }, [param?.order_oid]);

    const getProgressWidth = () => {
        if (order?.status === 'Placed') return '25%';
        if (order?.status === 'Shipped') return '50%';
        if (order?.status === 'Delivered') return '100%';
        return '0%';
    };

    const getStatusColor = (status) => {
        if (order?.status === status) return 'text-blue-600';
        return 'text-gray-500';
    };

    return (
        <div>
            <section className="py-24 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
                    <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
                        Order Confirmed
                    </h2>
                    <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
                        Thanks for making an order. You can check our order summary below.
                    </p>
                    <div className="flex justify-between font-bold mb-5">
                        <p className={getStatusColor('Placed')}>Placed</p>
                        <p className={getStatusColor('Shipped')}>Shipped</p>
                        <p className={getStatusColor('Delivered')}>Delivered</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-5">
                        <div className={`bg-blue-600 h-2.5 rounded-full`} style={{ width: getProgressWidth() }}></div>
                    </div>

                    <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                            <div className="data">
                                <p className="font-semibold text-base leading-7 text-black">
                                    Order Id: <span className="text-indigo-600 font-medium">#{order?.oid}</span>
                                </p>
                            </div>
                            <Link to={`/invoice/${param.order_oid}`}>
                                <button className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                                    Invoice
                                </button>
                            </Link>
                        </div>

                        <div className="w-full px-3 min-[400px]:px-6">
                            {orderItems.map((o, index) => (
                                <div key={index} className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                                    <div className="img-box max-lg:w-full">
                                        <img src={o?.product?.image} alt={o?.product?.title} className="aspect-square w-full lg:max-w-[140px] rounded-xl" />
                                    </div>
                                    <div className="flex flex-row items-center w-full">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                            <div className="flex items-center">
                                                <div>
                                                    <h2 className="font-semibold text-xl leading-8 text-black mb-3">{o?.product?.title}</h2>
                                                    <div className="flex items-center">
                                                        {o?.size && <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">Size: <span className="text-gray-500">{o?.size}</span></p>}
                                                        {o?.qty && <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">Qty: <span className="text-gray-500">{o?.qty}</span></p>}
                                                        {o?.color && <p className="font-medium text-base leading-7 text-black">Color: <span className="text-gray-500">{o?.color}</span></p>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-5">
                                                <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                                    <div className="flex gap-3 lg:block">
                                                        <p className="font-medium text-sm leading-7 text-black">Price</p>
                                                        <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">Rs: {o?.total}</p>
                                                    </div>
                                                </div>
                                                <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                                    <div className="flex gap-3 lg:block">
                                                        <p className="font-medium text-sm leading-7 text-black">Status</p>
                                                        <p className={`font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 ${getStatusColor(o?.delivery_status)}`}>
                                                            {o?.delivery_status}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                                    {order?.expected_delivery_date_from && order?.expected_delivery_date_to &&
                                                        <div className="flex gap-3 lg:block">
                                                            <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">Expected Delivery Time</p>
                                                            <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                                                From {order?.expected_delivery_date_from} to {order?.expected_delivery_date_to}
                                                            </p>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between">
                            <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                                <button className="flex outline-0 py-6 sm:pr-6 sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600">
                                    <svg className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <path d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                    </svg>
                                    Cancel Order
                                </button>
                            </div>
                            <p className="font-semibold text-lg text-black py-6">Shipping Price: <span className="text-indigo-600">Rs: {order.shipping_amount}</span></p>
                            <p className="font-semibold text-lg text-black py-6">Discount Price: <span className="text-indigo-600">Rs: {order.saved}</span></p>
                            <p className="font-semibold text-lg text-black py-6">Total Price: <span className="text-indigo-600">Rs: {order.total}</span></p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default OrderSuccess;
