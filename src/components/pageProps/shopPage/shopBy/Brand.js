import React, { useState,useEffect, useContext } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleBrand } from "../../../../redux/orebiSlice";
import apiInstance from "../../../../axios/axios";
import { BrandContext } from "../../../plugins/Context";


const Brand = () => {
  const [showBrands, setShowBrands] = useState(true);
  const {selectedBrand,updateBrand}=useContext( BrandContext);
  
  // const checkedBrands = useSelector(
  //   (state) => state.orebiReducer.checkedBrands
  // );
  const dispatch = useDispatch();
  const [brands,setBrands]=useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await apiInstance.get("brand/");
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []); 
  // const brands = [
  //   {
  //     _id: 900,
  //     title: "Pantum",
  //   },
  //   {
  //     _id: 901,
  //     title: "Hp",
  //   },
  //   {
  //     _id: 902,
  //     title: "Epson",
  //   },

  //   {
  //     _id: 903,
  //     title: "Ricoh",
  //   },
  // ];

  const handleToggleBrand = (brand) => {
    dispatch(toggleBrand(brand));
  };

  return (
    <div>
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Brand" icons={true} />
      </div>
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          <li
                // key={item.id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                <input
                  type="checkbox"
                  // id={}
                  checked={selectedBrand===''}
                  onChange={() => updateBrand('')}
                />
                All
              </li>
            {brands.map((item) => (
              <li
                key={item.id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                <input
                  type="checkbox"
                  id={item.id}
                  checked={selectedBrand===item.title}
                  onChange={() => updateBrand(item.title)}
                />
                {item.title}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Brand;
