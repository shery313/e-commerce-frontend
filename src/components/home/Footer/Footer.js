import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import { paymentCard } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import apiInstance from "../../../axios/axios";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = async () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email!");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please provide a valid Email!");
    } else {
      try {
        const response = await apiInstance.post("newsletter/", {
          email: emailInfo,
        });
        if (response.status === 201) {
          setSubscription(true);
          setErrMsg("");
          setEmailInfo("");
        } else {
          setErrMsg("Subscription failed. Please try again.");
        }
      } catch (error) {
        setErrMsg("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="w-full bg-[#F3E5AB] py-20"> {/* Changed background color */}
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 px-4 gap-10">
        <div className="col-span-2">
          <FooterListTitle title="More about Vivify Store" />
          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[80%] text-[#007BFF]"> {/* Changed text color */}
              Discover a variety of products that cater to your lifestyle needs at Vivify Store. Explore our range of electronics, fashion, home appliances, and more.
            </p>
            <ul className="flex items-center gap-2">
              <a href="https://www.youtube.com/@reactjsBD" target="_blank" rel="noreferrer" aria-label="Youtube">
                <li className="w-7 h-7 bg-[#FF5733] text-[#007BFF] hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-[#C70039] duration-300">
                  <FaYoutube />
                </li>
              </a>
              <a href="https://github.com/noorjsdivs" target="_blank" rel="noreferrer" aria-label="Github">
                <li className="w-7 h-7 bg-[#FF5733] text-[#007BFF] hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-[#C70039] duration-300">
                  <FaGithub />
                </li>
              </a>
              <a href="https://www.facebook.com/Noorlalu143/" target="_blank" rel="noreferrer" aria-label="Facebook">
                <li className="w-7 h-7 bg-[#FF5733] text-[#007BFF] hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-[#C70039] duration-300">
                  <FaFacebook />
                </li>
              </a>
              <a href="https://www.linkedin.com/in/noor-mohammad-ab2245193/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <li className="w-7 h-7 bg-[#FF5733] text-[#007BFF] hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-[#C70039] duration-300">
                  <FaLinkedin />
                </li>
              </a>
            </ul>
          </div>
        </div>

        {/* Shop Section */}
        <div>
          <FooterListTitle title="Shop" />
          <ul className="flex flex-col gap-2">
            {["Accessories", "Clothes", "Electronics", "Home appliances", "New Arrivals"].map((item) => (
              <li key={item} className="font-titleFont text-base text-[#007BFF] hover:text-[#C70039] hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Account Section */}
        <div>
          <FooterListTitle title="Your account" />
          <ul className="flex flex-col gap-2">
            {["Profile", "Orders", "Addresses", "Account Details", "Payment Options"].map((item) => (
              <li key={item} className="font-titleFont text-base text-[#007BFF] hover:text-[#C70039] hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="col-span-2 flex flex-col items-center w-full px-4">
          <FooterListTitle title="Subscribe to our newsletter." />
          <div className="w-full">
            <p className="text-center mb-4 text-[#007BFF]">
              Stay updated with the latest trends and offers from Vivify Store.
            </p>
            {subscription ? (
              <motion.p
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center text-base font-titleFont font-semibold text-green-600"
              >
                Subscribed Successfully!
              </motion.p>
            ) : (
              <div className="w-full flex-col xl:flex-row flex justify-between items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-[#FF5733] text-lg placeholder:text-base outline-none" // Changed text color
                    type="email"
                    placeholder="Insert your email ...*"
                  />
                  {errMsg && (
                    <p className="text-red-600 text-sm font-semibold font-titleFont text-center animate-bounce mt-2">
                      {errMsg}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscription}
                  className="bg-[#FF5733] text-lightText w-full xl:w-auto h-10 px-6 hover:bg-[#C70039] duration-300 text-base tracking-wide"
                >
                  Subscribe
                </button>
              </div>
            )}

            <Image
              className={`w-[80%] lg:w-[60%] mx-auto ${subscription ? "mt-2" : "mt-6"}`}
              imgSrc={paymentCard}
              alt="Payment Options"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
