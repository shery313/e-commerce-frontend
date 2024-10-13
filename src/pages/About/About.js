import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { logo } from "../../assets/images";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    setPrevLocation(location.state?.data || "Home");
  }, [location]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <Breadcrumbs title="About Us" prevLocation={prevLocation} />
      
      {/* Hero Section */}
      <section className="bg-gray-100 py-16 rounded-lg shadow-md animate-fadeIn">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-8 p-5">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-fadeInUp">
              Welcome to <span className="text-primeColor">Vivify Store</span>
            </h1>
            <p className="text-lg text-gray-600 mb-4 animate-fadeInUp">
              Vivify Store is one of the world's leading ecommerce brands, known for celebrating the essence of classic Worldwide cool style. We are committed to delivering quality products with exceptional customer service.
            </p>
            <Link to="/shop">
              <button className="w-52 h-12 bg-primeColor text-white hover:bg-black transition duration-300 rounded-lg animate-fadeInUp">
                Continue Shopping
              </button>
            </Link>
          </div>

          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img
              src='/vivify.png'// Replace with an actual image path
              alt="About Vivify Store"
              className="w-full h-auto rounded-lg shadow-lg animate-fadeIn"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mt-16 animate-fadeInUp">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-600 mb-4">
          Our mission is to provide high-quality products that enhance your lifestyle and meet your needs. We aim to be the go-to destination for all your shopping needs, offering an unparalleled experience.
        </p>
      </section>

      {/* Meet the Team Section */}
      <section className="mt-16 animate-fadeInUp">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add team member cards here */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center  transition-transform duration-300 hover:scale-105">
            <img src='/jamalkhan.jpg' alt="Team Member" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Jamal Khan</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          {/* Repeat for other team members */}
        </div>
      </section>

      {/* Contact Section */}
      <section className="mt-16 bg-gray-100 py-8 rounded-lg shadow-md animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-4">
            Have any questions or feedback? We'd love to hear from you! Feel free to reach out through our social media channels or email us directly.
          </p>
          <a href="mailto:contact@vivifystore.com" className="text-primeColor hover:underline">
            contact@vivifystore.com
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
