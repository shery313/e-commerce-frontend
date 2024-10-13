import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiInstance from '../../axios/axios';
import Swal from 'sweetalert2';

function EmailVerify() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const axios = apiInstance;
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const otp = searchParams.get('otp');
    const uidb64 = searchParams.get('uidb64');
    const reset_token = searchParams.get('token');
    const formData = new FormData();

    formData.append('otp', otp);
    formData.append('uidb64', uidb64);
    formData.append('token', reset_token);

    useEffect(() => {
        axios.post(`user/email-verify/`, formData)
            .then(res => {
                console.log(res.data)
                Swal.fire({
                    icon: 'success',
                    title: 'Email verified successfully',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Go to Login'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login');
                    }
                });
                setLoading(false);
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Verification failed',
                    text: 'Invalid or expired link.',
                    confirmButtonColor: '#d33',
                });
                setError('Verification failed. Invalid or expired link.');
                setLoading(false);
            });
    }, [axios, formData, navigate]);

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-blue-500">
            <div className="bg-white shadow-md rounded-lg p-8 text-center">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">
                    {loading ? 'Verifying your email...' : 'Email Verification'}
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center">
                        <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                    </div>
                ) : error ? (
                    <div>
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={() => navigate('/resend-verification')}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                        >
                            Resend Verification Link
                        </button>
                    </div>
                ) : (
                    <p className="text-green-600">Email has been successfully verified. Redirecting to login...</p>
                )}
            </div>
        </div>
    );
}

export default EmailVerify;
