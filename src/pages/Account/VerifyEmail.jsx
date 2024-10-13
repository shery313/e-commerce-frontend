import React, { useState } from 'react';
import apiInstance from '../../axios/axios';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await apiInstance.post('/api/verify-otp/', { otp });
      if (response.data.success) {
        setSuccessMessage('Your email has been verified successfully!');
      } else {
        setErrorMessage('Invalid OTP or OTP expired.');
      }
    } catch (error) {
      setErrorMessage('Something went wrong, please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 p-10">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Verify Your Email</h2>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700">Enter OTP</label>
            <input 
              type="text" 
              id="otp" 
              value={otp} 
              onChange={handleOtpChange} 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          <button 
            type="submit" 
            className={`w-full py-2 px-4 text-white bg-indigo-600 rounded-md ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
