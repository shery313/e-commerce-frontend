import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Privacy Policy
        </h1>
        <p className="text-center text-lg text-gray-600 mb-12">
          We are committed to protecting your privacy and ensuring the security
          of your personal information. This Privacy Policy explains how we
          collect, use, and share your data.
        </p>

        {/* Section 1: Introduction */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 mb-6">
            We collect personal information that you provide directly to us,
            such as when you create an account, place an order, subscribe to our
            newsletter, or contact us for customer support. This information may
            include your name, email address, phone number, shipping address,
            payment details, and any other relevant information.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            a. Automatically Collected Information
          </h3>
          <p className="text-gray-700 mb-6">
            We automatically collect certain information about your device and
            browsing activity when you visit our website, such as your IP
            address, browser type, and operating system. This data helps us
            understand how you use our website and improve your experience.
          </p>
        </div>

        {/* Section 2: How We Use Your Information */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 mb-6">
            We use the personal information we collect for various purposes,
            including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>To process and fulfill your orders</li>
            <li>To send you order confirmations and shipping updates</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To personalize your experience on our website</li>
            <li>To send you marketing and promotional communications</li>
            <li>To improve our website, services, and overall user experience</li>
          </ul>
        </div>

        {/* Section 3: Sharing Your Information */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            3. Sharing Your Information
          </h2>
          <p className="text-gray-700 mb-6">
            We do not sell, trade, or rent your personal information to third
            parties. However, we may share your information in the following
            situations:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              With trusted third-party service providers who assist us in
              operating our business (e.g., payment processors, shipping
              companies)
            </li>
            <li>
              To comply with legal obligations, such as responding to a
              subpoena or request from law enforcement
            </li>
            <li>
              If our business is involved in a merger, acquisition, or sale of
              assets, your information may be transferred as part of that
              transaction
            </li>
          </ul>
        </div>

        {/* Section 4: Cookies and Tracking */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            4. Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-700 mb-6">
            We use cookies and similar tracking technologies to enhance your
            browsing experience. Cookies are small files that are stored on your
            device and allow us to recognize your preferences. You can manage
            your cookie preferences through your browser settings.
          </p>
        </div>

        {/* Section 5: Your Rights */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            5. Your Rights
          </h2>
          <p className="text-gray-700 mb-6">
            Depending on your location, you may have certain rights regarding
            your personal information, including the right to access, correct,
            or delete your data. You may also have the right to object to the
            processing of your information or request that we restrict its use.
            To exercise any of these rights, please contact us at the details
            provided below.
          </p>
        </div>

        {/* Section 6: Security */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            6. Security of Your Information
          </h2>
          <p className="text-gray-700 mb-6">
            We take reasonable measures to protect your personal information
            from unauthorized access, use, or disclosure. However, no method of
            transmission over the internet is 100% secure, and we cannot
            guarantee absolute security.
          </p>
        </div>

        {/* Section 7: Changes to This Policy */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            7. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 mb-6">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal obligations. Any updates will be
            posted on this page, and we encourage you to review it periodically.
          </p>
        </div>

        {/* Section 8: Contact Us */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            8. Contact Us
          </h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about this Privacy Policy or our handling
            of your personal information, please reach out to us:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:privacy@yourstore.com" className="text-green-600">
                privacy@yourstore.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a href="tel:+1234567890" className="text-green-600">
                +1 (234) 567-890
              </a>
            </li>
            <li>
              <strong>Address:</strong> 123 Main St, Anytown, USA
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
