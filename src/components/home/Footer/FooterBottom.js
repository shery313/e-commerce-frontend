import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";

const FooterBottom = () => {
  return (
    <div className="w-full bg-[#F3E5AB] group text-[#007BFF]"> {/* Changed background color */}
      <div className="max-w-container mx-auto border-t-[1px] border-gray-300 pt-10 pb-20">
        <p className="text-titleFont font-normal text-center flex md:items-center justify-center hover:text-[#C70039] duration-200 text-sm"> {/* Changed text color */}
          <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
            <AiOutlineCopyright />
          </span>
          Copyright 2022 | Vivify Store | All Rights Reserved |
          <a href="https://reactbd.com/" target="_blank" rel="noreferrer">
            <span className="ml-1 font-medium group-hover:text-[#C70039]"> {/* Changed hover color */}
              Powered by ReactBD.com
            </span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
