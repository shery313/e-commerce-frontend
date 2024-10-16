import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Image from "../../designLayouts/Image";
import {  Banner2 } from "../../../assets/images/index";
const banners = ['/banner5.avif', Banner2, '/banner3.avif', '/banner6.avif'];

const Sale = () => {
  return (
    <div className="py-10 md:py-20 flex flex-col md:flex-row items-stretch justify-between gap-4">
      {banners.map((banner, index) => (
        <motion.div
          key={index}
          className="w-full md:w-1/2 lg:w-1/4 flex flex-col group" // added group for hover
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          <Link to="/shop" className="w-full h-full">
            <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
              <Image
                className="w-full h-full object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75" // Hover scaling and brightness
                imgSrc={banner}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-lg"></div> {/* Optional dark overlay */}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default Sale;
