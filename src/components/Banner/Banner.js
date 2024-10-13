import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { motion } from "framer-motion";
import Image from "../designLayouts/Image";

// Custom Slide Component with Framer Motion
const CustomSlide = ({ imgSrc, text, Subtext, buttonLink, buttonText }) => (
  <motion.div
    className="relative w-full h-[500px] flex items-center justify-center overflow-hidden"
    initial={{ opacity: 0, scale: 1.1 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <Image
      imgSrc={imgSrc}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ filter: "brightness(50%)" }} // Darken image for better text visibility
    />
    <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-10">
      <div className="bg-blue-600 bg-opacity-70 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white transition-colors duration-300 hover:text-yellow-300">
          {text}
        </h1>
        <p className="text-lg mb-6 text-white opacity-90 transition-opacity duration-300 hover:opacity-100">
          {Subtext}
        </p>
        <Link to={buttonLink}>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-400 transition duration-300 transform hover:scale-105">
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  </motion.div>
);

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    speed: 500,
    fade: true,
    autoplaySpeed: 3000,
  };

  const slides = [
    {
      imgSrc: '/banner7.avif',
      text: "Hair Oil for Faster Hair Growth",
      Subtext: "Explore our premium hair care products for exceptional results",
      buttonLink: "/offer",
      buttonText: "Shop Now",
    },
    {
      imgSrc: '/organ.jpg',
      text: "Organic Hair Shampoo",
      Subtext: "Discover our natural shampoos for healthy hair growth",
      buttonLink: "/shop",
      buttonText: "About Us",
    },
    {
      imgSrc: '/slider.avif',
      text: "Efficiency Redefined",
      Subtext: "Maximize productivity with our advanced products",
      buttonLink: "/contact",
      buttonText: "Contact Us",
    },
    {
      imgSrc: '/banner4.avif',
      text: "New Arrival: Skincare",
      Subtext: "Explore our latest skincare products",
      buttonLink: "/new-arrivals",
      buttonText: "View Collection",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-gray-900">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
