import React from "react";
import { Link } from "react-router-dom";
import { organic } from "../../../assets/images";
import ShopNow from "../../designLayouts/buttons/ShopNow";
import Image from "../../designLayouts/Image";
import { motion } from "framer-motion";

const YearProduct = () => {
  return (
    <Link to="/shop">
      <motion.div
        className="w-full h-auto bg-[#f3f3f3] md:bg-transparent relative font-titleFont p-4 mt-10 flex flex-col md:flex-row items-center justify-center md:justify-start gap-6 hover:bg-[#ebebeb] transition-colors duration-500"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }} // Slightly scale the whole container on hover
      >
        {/* Image Section with Hover Effect */}
        <motion.div
          className="block"
          whileHover={{ scale: 1.1 }} // Scale image on hover
          transition={{ duration: 0.4 }}
        >
          <Image
            className="h-[250px] w-[300px] lg:h-[300px] lg:w-[350px] object-cover rounded-lg shadow-lg transform hover:scale-105 transition duration-500"
            imgSrc='/sneakers.avif'
          />
        </motion.div>

        {/* Text and Button Section */}
        <div className="w-full md:w-2/3 xl:w-1/2 flex flex-col items-start gap-4 justify-center px-4">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#007BFF]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ color: "#ff7f50" }} // Change color on hover
          >
            Product of The Year
          </motion.h1>

          <motion.p
            className="text-sm md:text-base lg:text-lg font-normal text-[#007BFF] max-w-[600px]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            whileHover={{ color: "#ff6347" }} // Change color on hover
          >
            Organic hair oil and shampoo
          </motion.p>

          {/* Shop Now Button with Hover Effect */}
          <motion.div
            whileHover={{ scale: 1.05 }} // Scale button on hover
            transition={{ duration: 0.4 }}
          >
            <ShopNow />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default YearProduct;
