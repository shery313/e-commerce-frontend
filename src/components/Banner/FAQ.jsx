import React, { useState } from "react";

const faqs = [
  {
    question: "What is your return policy?",
    answer: "You can return any item within 30 days of purchase. The item must be in its original condition and packaging. For more details, please visit our Returns & Exchanges page."
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes, we offer free shipping on all orders over $50. For orders under $50, a standard shipping fee applies."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order has shipped, you will receive a tracking number via email. You can use this number to track your order on our Shipping page."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, including Visa, MasterCard, American Express, and Discover. We also accept payments via PayPal and Apple Pay."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can contact our customer support team via email at support@yourstore.com or by calling +1 (234) 567-890. Our support team is available 24/7."
  }
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-lg text-gray-600 mb-12">
          Find answers to commonly asked questions below. If you have any other questions, feel free to contact us.
        </p>
        
        <div className="bg-white shadow-lg rounded-lg">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <div
                className="px-4 py-6 cursor-pointer hover:bg-gray-100"
                onClick={() => handleToggle(index)}
              >
                <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-between">
                  {faq.question}
                  <span className="text-gray-500">
                    {openIndex === index ? (
                      <i className="fas fa-chevron-up"></i>
                    ) : (
                      <i className="fas fa-chevron-down"></i>
                    )}
                  </span>
                </h2>
              </div>
              {openIndex === index && (
                <div className="px-4 py-6">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
