import React, { useContext, useEffect, useState } from "react";
import NavTitle from "./NavTitle";
import apiInstance from "../../../../axios/axios";
import { CategoryContext } from "../../../plugins/Context";

const Category = () => {
  const [category, setCategory] = useState([]);
  const { selectedCategory, updateCategory } = useContext(CategoryContext);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await apiInstance.get("category/");
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []);

  const handleToggleCategory = (categoryId) => {
    updateCategory(categoryId); // Update to the new category
  };

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={true} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
        <li
              // key={item.id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              <input
                type="checkbox"
                // id={item.id}
                checked={selectedCategory === ''} // Check if this category is the selected one
                onChange={() => handleToggleCategory('')}
              />
              All
              
            </li>
          {category.map((item) => (
            
            <li
              key={item.id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              <input
                type="checkbox"
                id={item.id}
                checked={selectedCategory === item.title} // Check if this category is the selected one
                onChange={() => handleToggleCategory(item.title)}
              />
              {item.title}
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
