import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import apiInstance from "../../../axios/axios";
import Product from "../Products/Product";

import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";

const NewArrivals = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:3000,
    // speed:500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          autoplay:true,
          autoplaySpeed:3000,
          // speed:500,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          autoplay:true,
          autoplaySpeed:3000,
          speed:500,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay:true,
          autoplaySpeed:3000,
          speed:500,
        },
      },
    ],
  };
  const [data,setData]=useState([]);
  const fetchdata= async ()=>{
    const response=await apiInstance.get('new-arrivals/products/')
    await setData(response.data)
  }
  useEffect(()=>{
    fetchdata();
  },[data])
  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {
          data.length > 0 ? data.map((d)=>(
            <div className="px-2">
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
        </div>

          )):<><div>No Product Found</div></>
              }
        
        
      </Slider>
    </div>
  );
};

export default NewArrivals;
