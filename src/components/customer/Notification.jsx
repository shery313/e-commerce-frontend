import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import apiInstance from '../../axios/axios';
import UserData from '../plugins/UserData';
import moment from 'moment';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    // const [loading, setLoading] = useState(true);

    // const axios = apiInstance;
    const userData = UserData();

    useEffect(() => {
        apiInstance.get(`customer/notification/${userData?.user_id}/`).then((res) => {
            setNotifications(res.data);
            
        });
    }, [userData?.user_id]);

    return (
        <div>
            <main className="mt-5 mb-20">
                <div className="container ">
                    <section className="flex flex-col md:flex-row">
                        <SideBar />
                        <div className="w-full lg:w-3/4 mt-4">
                            <section>
                                <div className="bg-white shadow-md rounded-lg p-6 ">
                                    <h3 className="text-2xl font-semibold mb-4 flex items-center">
                                        <i className="fas fa-bell mr-2" /> Notifications
                                    </h3>
                                    <div className="space-y-4">
                                        {notifications.length > 0 ? (
                                            notifications.map((noti, index) => (
                                                <div key={index} className="border-b py-4">
                                                    <div className="flex justify-between">
                                                        <h5 className="text-lg font-medium">New Order!</h5>
                                                        <small className="text-gray-500">{moment(noti.date).format('MM-DD-YYYY')}</small>
                                                    </div>
                                                    <p className="text-gray-700">Your order #{noti?.order?.oid} was successful</p>
                                                    <div className="text-sm text-gray-600">
                                                        <p>Total: ${noti?.order?.total}</p>
                                                        <p>Shipping: ${noti?.order?.shipping_amount}</p>
                                                        <p>Tax: ${noti?.order?.tax_fee}</p>
                                                        <p>Service Fee: ${noti?.order?.service_fee}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <h6 className="text-gray-500 text-center">No notifications yet</h6>
                                        )}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Notifications;
