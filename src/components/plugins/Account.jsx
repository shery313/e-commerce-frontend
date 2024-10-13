import React from 'react';
import Sidebar from '../customer/SideBar';
import UseProfileData from './UserProfileData';
import { Link } from 'react-router-dom';

function Account() {
    const userProfile = UseProfileData();

    return (
        <div className="flex flex-col lg:flex-row">
            <Sidebar />
            <main className="flex-1 mt-5 mb-40 px-4 lg:px-8">
                <div className="container mx-auto">
                    {/* User Profile Section */}
                    <section className="mb-8">
                        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-center mb-4">
                                <img
                                    src={userProfile?.image || '/default-profile.png'}
                                    alt="Profile"
                                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mb-4 sm:mb-0 sm:mr-4"
                                />
                                <div className="text-center sm:text-left">
                                    <h2 className="text-2xl font-bold mb-2">Hi {userProfile?.full_name},</h2>
                                    <p className="text-sm sm:text-lg">
                                        From your account dashboard, you can easily check & view your{' '}
                                        <Link to="#" className="text-blue-500 hover:underline">orders</Link>, manage your{' '}
                                        <Link to="#" className="text-blue-500 hover:underline">shipping address</Link>,{' '}
                                        <Link to="#" className="text-blue-500 hover:underline">change password</Link>, and{' '}
                                        <Link to="#" className="text-blue-500 hover:underline">edit account information</Link>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Account Details Section */}
                    <section className="mb-8">
                        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Account Details</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="font-medium">Email:</span>
                                    <span>{userProfile?.user?.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Phone:</span>
                                    <span>{userProfile?.user?.phone || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Address:</span>
                                    <span>{userProfile?.address || 'N/A'}</span>
                                </div>
                                <Link to="/customer/settings" className="text-blue-500 hover:underline">Edit Profile</Link>
                            </div>
                        </div>
                    </section>

                    {/* Recent Activities Section */}
                    <section className="mb-8">
                        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
                            <ul className="list-disc list-inside">
                                <li className="mb-2">Ordered Product XYZ on {new Date().toLocaleDateString()}</li>
                                <li className="mb-2">Updated shipping address on {new Date().toLocaleDateString()}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Notification Settings Section */}
                    <section className="mb-8">
                        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
                            <div>
                                <div className="flex items-center mb-4">
                                    <input type="checkbox" id="emailNotifications" className="mr-2" />
                                    <label htmlFor="emailNotifications">Email Notifications</label>
                                </div>
                                <div className="flex items-center mb-4">
                                    <input type="checkbox" id="smsNotifications" className="mr-2" />
                                    <label htmlFor="smsNotifications">SMS Notifications</label>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Security Settings Section */}
                    <section className="mb-8">
                        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
                            <Link to="#" className="text-blue-500 hover:underline">Change Password</Link>
                        </div>
                    </section>

                    {/* Account Actions */}
                    <section>
                        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Account Actions</h3>
                            <Link to="#" className="text-red-500 hover:underline">Logout</Link>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Account;
