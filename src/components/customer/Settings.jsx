import React, { useState, useEffect } from 'react'
import Sidebar from './SideBar';
import apiInstance from '../../axios/axios';
import UserData from '../plugins/UserData';
// import UseProfileData from '../plugins/UserProfileData';
import Swal from 'sweetalert2'


function Settings() {
    const [profileData, setProfileData] = useState({
        'full_name': '',
        'mobile': '',
        'email': '',
        'about': '',
        'country': '',
        'city': '',
        'state': '',
        'address': '',
        'p_image': '',
    });
    const [loading, setLoading] = useState(false)
    

    // const axios = apiInstance
    const userData = UserData()

    useEffect(() => {
        // Fetch existing profile data
        const fetchProfileData = async () => {
            try {
                apiInstance.get(`user/profile/${userData?.user_id}/`).then((res) => {
                    // setProfileData(res.data);
                    setProfileData({
                        'full_name': res.data?.full_name,
                        'email': res.data.user.email,
                        'phone': res.data.user.phone,
                        'about': res.data.about,
                        'country': res.data.country,
                        'city': res.data.city,
                        'state': res.data.state,
                        'address': res.data.address,
                        'p_image': res.data.image,
                    })
                })
            } catch (error) {
                console.error('Error fetching profile data: ', error);
            }
        };

        fetchProfileData();
    }, [userData?.user_id]);


    const handleInputChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value
        })
    };

    const handleFileChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.files[0]
        })
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const res = await apiInstance.get(`user/profile/${userData?.user_id}/`);

        const formData = new FormData();
        if (profileData.p_image && profileData.p_image !== res.data.image) {
            formData.append('image', profileData.p_image);
        }
        formData.append('full_name', profileData.full_name);
        formData.append('about', profileData.about);
        formData.append('country', profileData.country);
        formData.append('city', profileData.city);
        formData.append('state', profileData.state);
        formData.append('address', profileData.address);

        try {
            await apiInstance.patch(`customer/setting/${userData?.user_id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            Swal.fire({
                icon: 'success',
                title: "Profile updated successfully",
            })
            setLoading(false)

        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row mt-5">
            <Sidebar />
            <main className="lg:w-3/4 w-full px-6 lg:px-10">
                <div className="container">
                    <h3 className="text-2xl font-semibold mb-5">
                        <i className="fas fa-gear fa-spin mr-2" /> Settings
                    </h3>
                    <form onSubmit={handleFormSubmit} method="POST" encType="multipart/form-data">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">Profile Image</label>
                                <input
                                    type="file"
                                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleFileChange}
                                    name="p_image"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={profileData.full_name  } // Ensure a default value
                                    onChange={handleInputChange}
                                    name="full_name"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={profileData.email } // Ensure a default value
                                    name="email"
                                    readOnly
                                    
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Mobile</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={profileData.phone } // Ensure a default value
                                    name="phone"
                                    onChange={handleInputChange}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Address</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={profileData.address } // Ensure a default value
                                    name="address"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">City</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={profileData.city } // Ensure a default value
                                    name="city"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">State</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={profileData.state } // Ensure a default value
                                    name="state"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Country</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={profileData.country } // Ensure a default value
                                    name="country"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <button
                                type="submit"
                                className={`w-full md:w-auto px-6 py-2 rounded-md text-white ${
                                    loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-600'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        Saving... <i className="fas fa-spinner fa-spin ml-2"></i>
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Settings;
