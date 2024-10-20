import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import apiInstance from '../../axios/axios';
import UserData from '../plugins/UserData';
import { Link } from 'react-router-dom';
import { addToWishlist } from '../plugins/addToWishList';
// import { addToWishlist } from '../plugin/addToWishlist';

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);

    // const axios = apiInstance;
    const userData = UserData();

    // const fetchWishlist = async () => {
    //     try {
    //         const response = await apiInstance.get(`customer/wishlist/${userData?.user_id}/`);
    //         setWishlist(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await apiInstance.get(`customer/wishlist/${userData?.user_id}/`);
                setWishlist(response.data);
            } catch (error) {
                console.log(error);
            }
        };
       fetchWishlist();
    }, [userData?.user_id]);

    const handleAddToWishlist = async (product_id) => {
        try {
            await addToWishlist(product_id, userData?.user_id);
            const fetchWishlist = async () => {
                try {
                    const response = await apiInstance.get(`customer/wishlist/${userData?.user_id}/`);
                    setWishlist(response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchWishlist();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="md:flex-row flex  flex-col">
            <Sidebar />
            <main className="flex-1 mt-5">
                <div className="container mx-auto px-4">
                    <section>
                        <h3 className="text-2xl font-bold mb-6">
                            <i className="fas fa-heart text-red-500"></i> Wishlist
                        </h3>

                        {wishlist.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                                {wishlist.map((w, index) => (
                                    <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden m-3">
                                        <Link to={`/product/${w.product.slug}`} className="block relative group">
                                            <img
                                                src={w.product.image}
                                                alt={w.product.title}
                                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                                New
                                            </span>
                                        </Link>
                                        <div className="p-4">
                                            <Link to={`/product/${w.product.slug}`} className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                                                {w.product.title.slice(0, 30)}...
                                            </Link>
                                            <p className="text-sm text-gray-500 mt-2">{w.product?.brand.title}</p>
                                            <div className="mt-3">
                                                <span className="text-lg font-bold text-gray-800">${w.product.price}</span>
                                            </div>
                                            <button
                                                onClick={() => handleAddToWishlist(w.product.id)}
                                                className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                                            >
                                                <i className="fas fa-heart"></i> Remove from Wishlist
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <h6 className="text-xl font-semibold text-gray-600">Your wishlist is empty.</h6>
                                <Link to="/shop" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                    Continue Shopping
                                </Link>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Wishlist;
