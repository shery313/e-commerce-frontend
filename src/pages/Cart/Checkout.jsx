import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
// import CartID from '../../components/plugins/CartID';
import apiInstance from '../../axios/axios';
// import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../assets/images';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Checkout() {
    const params = useParams();
    const [order, setOrder] = useState({});
    const [couponCode, setCouponCode] = useState("");
    const [loading, setLoading] = useState(false);
    // const [paymentLoading, setPaymentLoading] = useState(false);
    // const [codLoading, setCodLoading] = useState(false);

    // const axios = apiInstance;
    // let cart_id = CartID();
    // let navigate = useNavigate();

    useEffect(() => {
        apiInstance.get(`checkout/${params?.order_id}/`).then((res) => {
            setOrder(res.data);
        });
    }, [loading, params?.order_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "couponCode":
                setCouponCode(value);
                break;
            default:
                break;
        }
    };

    const appleCoupon = async () => {
        setLoading(true);

        const formdata = new FormData();
        formdata.append("order_oid", order.oid);
        formdata.append("coupon_code", couponCode);

        try {
            const response = await apiInstance.post('coupon/', formdata);
            if (response.data.message === "Coupon Activated") {
                setLoading(false);
                Swal.fire({
                    icon: 'success',
                    title: response.data.message,
                    text: "A new coupon has been applied to your order",
                });
            } else {
                setLoading(false);
                Swal.fire({
                    icon: 'warning',
                    title: response.data.message,
                    text: "This coupon has been already activated!",
                });
            }
            setCouponCode("");
        } catch (error) {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                text: "This coupon does not exist!",
            });
            setCouponCode("");
        }
    };

    const codFormHandling = (event) => {
        // setCodLoading(true);
        event.target.form.submit();
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h1>

            <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Customer Information</h2>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <FaUser className="text-gray-500 mr-2" />
                        <span className="text-gray-700 font-medium">{order.full_name}</span>
                    </div>
                    <div className="flex items-center">
                        <FaEnvelope className="text-gray-500 mr-2" />
                        <span className="text-gray-700 font-medium">{order.email}</span>
                    </div>
                    <div className="flex items-center">
                        <FaPhone className="text-gray-500 mr-2" />
                        <span className="text-gray-700 font-medium">{order.mobile}</span>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipping Address</h2>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <FaMapMarkerAlt className="text-gray-500 mr-2" />
                        <div className="text-gray-700 font-medium">
                            <div>{order.address}</div>
                            <div>{order.city}, {order.state}, {order.country}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Apply Coupon Code</h2>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        name="couponCode"
                        value={couponCode}
                        onChange={handleChange}
                        className="px-4 py-2.5 bg-white text-gray-700 rounded-md border border-gray-300 w-full"
                        placeholder="Enter coupon code"
                    />
                    <button
                        onClick={appleCoupon}
                        type="button"
                        className="px-4 py-2.5 bg-gray-800 text-white rounded-md font-semibold"
                    >
                        Apply
                    </button>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
                <ul className="space-y-2 text-gray-700">
                    <li className="flex justify-between">Subtotal <span className="font-bold">Rs: {order?.sub_total}</span></li>
                    <li className="flex justify-between">Shipping <span className="font-bold">Rs: {order?.shipping_amount}</span></li>
                    <hr className="border-gray-300 my-2" />
                    <li className="flex justify-between text-lg font-bold">Total <span className="font-bold">Rs: {order?.total}</span></li>
                </ul>
            </div>

            <div className="flex justify-end">
                <form method="POST" action={`${API_BASE_URL}cod-checkout/${params?.order_id}/`}>
                    <button
                        type="button"
                        onClick={codFormHandling}
                        className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900"
                    >
                        Confirm your order
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Checkout;
