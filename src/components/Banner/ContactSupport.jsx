import React, { useState } from "react";

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can integrate with your backend or email service
    console.log(formData);
    setFormSubmitted(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Contact Support
        </h1>
        <p className="text-center text-lg text-gray-600 mb-12">
          Have questions or need assistance with your warranty or order? We're
          here to help. Fill out the form below or reach us through the provided
          contact information.
        </p>

        {!formSubmitted ? (
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="orderNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Order Number (if applicable)
                </label>
                <input
                  type="text"
                  name="orderNumber"
                  id="orderNumber"
                  value={formData.orderNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Thank you for contacting us!
            </h2>
            <p className="text-gray-600">
              We've received your message and will get back to you within 1-2
              business days.
            </p>
          </div>
        )}

        {/* Contact Information */}
        <div className="mt-12 bg-gray-100 shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Other Ways to Reach Us
          </h2>
          <p className="text-gray-700 mb-4">
            You can also contact us directly using the following methods:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@yourstore.com" className="text-green-600">
                support@yourstore.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a href="tel:+1234567890" className="text-green-600">
                +1 (234) 567-890
              </a>
            </li>
            <li>
              <strong>Working Hours:</strong> Monday - Friday, 9 AM to 6 PM
              (PST)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
