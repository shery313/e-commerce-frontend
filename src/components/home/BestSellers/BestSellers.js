import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";

import apiInstance from "../../../axios/axios";
const BestSellers = () => {
const [data,SetData]=useState([]);
const fetchData= async ()=>{
  const response=await apiInstance.get('best-seller/products/')
  await SetData(response.data)
}
useEffect(()=>{
  fetchData();
},[data]
  
)

  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      
        
<div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
{data?.length > 0 ? data?.map((d)=>(
        <Product
        _id={d.id}
        img={d.image}
        productName={d.title}
        price={d.price}
        // color={item.color}
        badge={true}
        des={d.description}
        slug={d.slug}
        oldPrice={d.old_price}
        saved={d.get_precentage}
        shipping_amount={d.shipping_amount}
        sizes={d.size}
        colors={d.color}
        />
      )):<><div>No Product Found</div></>}
      </div>
      
    </div>
  );
};

export default BestSellers;
