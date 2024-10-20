import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaHeart, FaBell, FaCog, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import UseProfileData from '../plugins/UserProfileData';
import UserData from '../plugins/UserData';
import apiInstance from '../../axios/axios';

function Sidebar() {
  const userData = UserData();
  // const axios = apiInstance;
  const [notifications, setNotifications] = useState('');
  const userProfile = UseProfileData();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState('');
  const [wishlist, setWishlist] = useState('');

  const clickSeen = () => {
    apiInstance.put(`customer/notification/update/${userData?.user_id}/`).then((res) => console.log(res.data));
  };

  useEffect(() => {
    apiInstance.get(`customer/orders/${userData?.user_id}/`).then((res) => setOrders(res.data));
  }, [userData?.user_id]);

  useEffect(() => {
    apiInstance.get(`customer/wishlist/${userData?.user_id}/`).then((res) => setWishlist(res.data));
  }, [userData?.user_id]);

  useEffect(() => {
    if (userProfile) {
      apiInstance.get(`un-seen/notification/${userData?.user_id}`).then((res) => {
        setNotifications(res.data);
        if (notifications) {
          setLoading(false);
        }
      });
      setLoading(false);
    }
  }, [userProfile, notifications,userData?.user_id]);

  return (
    <div className="lg:w-1/4 md:w-1/3 w-full md:m-5 hidden md:block">
      {loading === false && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-col items-center justify-center mb-6">
            <img
              src={userProfile?.image}
              className="w-28 h-28 object-cover rounded-full border-4 border-gray-200 shadow-md"
              alt="Profile"
            />
            <div className="text-center mt-3">
              <h3 className="text-xl font-semibold">{userProfile?.full_name}</h3>
              <p className="mt-1 text-sm text-gray-600">
                <Link to="/customer/settings/" className="text-blue-500 hover:underline">
                  <FaEdit className="inline  icon" /> Edit Account
                </Link>
              </p>
            </div>
          </div>

          <ul className="space-y-4">
            <li className="border-b border-gray-200">
              <Link to="/customer/account/" className="flex items-center justify-between text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md transition duration-200">
                <span className="flex items-center">
                  <FaUser className="mr-3 icon" /> Account
                </span>
              </Link>
            </li>

            <li className="border-b border-gray-200">
              <Link to="/customer/orders/" className="flex items-center justify-between text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md transition duration-200">
                <span className="flex items-center">
                  <FaShoppingCart className="mr-3 icon" /> Orders
                </span>
                {orders.length > 0 && (
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                    {orders.length}
                  </span>
                )}
              </Link>
            </li>

            <li className="border-b border-gray-200">
              <Link to="/customer/wishlist/" className="flex items-center justify-between text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md transition duration-200">
                <span className="flex items-center">
                  <FaHeart className="mr-3 text-red-500 icon" /> Wishlist
                </span>
                {wishlist.length > 0 && (
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </li>

            <li className="border-b border-gray-200">
              <Link to="/customer/notifications/" onClick={clickSeen} className="flex items-center justify-between text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md transition duration-200">
                <span className="flex items-center">
                  <FaBell className="mr-3 text-yellow-500 icon" /> Notifications
                </span>
                {notifications.unseen_count > 0 && (
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                    {notifications.unseen_count}
                  </span>
                )}
              </Link>
            </li>

            <li className="border-b border-gray-200">
              <Link to="/customer/settings/" className="flex items-center justify-between text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md transition duration-200">
                <span className="flex items-center">
                  <FaCog className="mr-3 text-gray-500 icon" /> Settings
                </span>
              </Link>
            </li>

            <li className="border-b border-gray-200">
              <Link to="/logout" className="flex items-center justify-between text-red-600 hover:bg-red-100 px-4 py-2 rounded-md transition duration-200">
                <span className="flex items-center">
                  <FaSignOutAlt className="mr-3 icon" /> Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
