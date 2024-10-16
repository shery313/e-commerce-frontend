import React, { useState, useEffect, useContext } from "react";
// import { useDispatch } from "react-redux";/
// import { addToCart } from "../../../redux/orebiSlice";
import { useParams } from "react-router-dom";
import apiInstance from "../../../axios/axios";
import { FaHeart } from "react-icons/fa";
import CartID from "../../plugins/CartID";
import GetCurrentAddress from "../../plugins/UserCountry";
import { addToCart } from '../../plugins/AddToCart';
import Swal from "sweetalert2";
import { addToWishlist } from "../../plugins/addToWishList";

import { CartContext } from "../../plugins/Context";
import UserData from "../../plugins/UserData";
import moment from "moment";
import { motion } from "framer-motion";
// import UpdatedStars from "./UpdatedStars";
const ProductInfo = ({ productInfo }) => {


  const params = useParams();
  const cart_id = CartID();
  const [product, setProduct] = useState([]);
  const userData = UserData()
  const query = params._id
  const [qtyValue, setQtyValue] = useState(1)
  const [colorValue, setColorValue] = useState('');
  const [sizeValue, setSizeValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(''); // Default to the first image
  const [isAddingToCart, setIsAddingToCart] = useState('Add To Cart')
  const currentAddress = GetCurrentAddress();
  const [createReview, setCreateReview] = useState({ user_id: 0, product_id: product?.id, review: "", rating: 0, })
  const [reviews, setReviews] = useState([]);
  // let [loading, setLoading] = useState(true);c
  //   const[carCount,setCartCount]=useContext(CartContext)
  const {setCartCount} = useContext(CartContext);
  // const axios = apiInstance
  const handleQtyChange = (event) => {
    event.preventDefault()
    setQtyValue(event.target.value)
  }
  const handleAddToWishlist = () => {
    if (userData) {
      addToWishlist(product.id, userData?.user_id)
      // setWishlistLoading(true)
    }
  }


  const handleAddToCart = async () => {
    try {
      // <SpecialCase cart_id={cart_id} />
      // Assuming addToCart is an async function
      await addToCart(product.id, userData?.user_id, qtyValue, product.price, product.shipping_amount, currentAddress.country, sizeValue, colorValue, cart_id, setIsAddingToCart);

      const url = userData?.user_id ? `cart-list/${cart_id}/${userData?.user_id}/` : `cart-list/${cart_id}/`;
      const response = await apiInstance.get(url);

      setCartCount(response.data.length);
      console.log(response.data.length);
      Swal.fire({
        icon: "success",
        title: "Added To Cart"
      })

    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  const handleReviewSubmit = (e) => {
    e.preventDefault()

    const formdata = new FormData()

    formdata.append('user_id', userData?.user_id)
    formdata.append('product_id', product?.id)
    formdata.append('rating', createReview.rating)
    formdata.append('review', createReview.review)

    apiInstance.post(`create-review/`, formdata).then((res) => {
      const fetchReviewData = async () => {
        await apiInstance.get(`reviews/${product.id}/`).then((res) => {
          setReviews(res.data);
        })
      }
      fetchReviewData()
      Swal.fire({
        icon: "success",
        title: "Review created successfully"
      })
    })
  }
  
  const handleReviewChange = (event) => {
    setCreateReview({
      ...createReview,
      [event.target.name]: event.target.value
    })
  }

 
  useEffect(() => {
    // if (product.id) {
    const fetchReviewData = async () => {
      await apiInstance.get(`reviews/${product.id}/`).then((res) => {
        setReviews(res.data);
      })
    }
    fetchReviewData()
    // }

  }, [product.id])
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiInstance.get(`products/${query}`)
      await setProduct(response.data)
  
  
  
    }
    fetchData();

  }, [query, sizeValue, colorValue])


  return (
    <div classNameName="flex flex-col gap-5">


      <div className="bg-white border  shadow-lg rounded-lg m-2 mx-4 ">
        <div className="pt-6 ">
        <div className="flex flex-col items-center justify-center md:flex-row space-y-6 md:space-y-0 md:space-x-10 shadow-lg p-6 rounded-lg border bg-white">

{/* Main Image with Zoom Animation */}
<motion.div
  className="relative w-full md:w-1/2 h-80 md:h-auto rounded-lg overflow-hidden"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
  whileHover={{ scale: 1.05 }}
>
  <img
    src={selectedImage ? selectedImage : product.image}
    alt="Selected product"
    className="w-full h-full object-cover rounded-lg shadow-lg"
  />
</motion.div>

{/* Thumbnails with Slide-in Animation */}
<motion.div
  className="flex space-x-2 overflow-x-auto w-full md:w-1/3 justify-center p-4"
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
>
  {product?.gallery?.map((p, index) => (
    <motion.button
      key={index}
      onClick={() => setSelectedImage(p.image)}
      className={`relative rounded-lg border-2 overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 ${selectedImage === p.image ? 'border-indigo-600' : 'border-transparent'}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src={p.image}
        alt={`Thumbnail ${index + 1}`}
        className="w-24 h-24 md:w-28 md:h-28 object-cover"
      />
    </motion.button>
  ))}
</motion.div>
</div>

          {/* <!-- Product info --> */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
            </div>

            {/* <!-- Options --> */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="tracking-tight text-xs text-gray-900 underline-offset-0 line-through  inline">Rs: {product?.old_price}</p>
              <p className=" mx-1 text-lg tracking-tight text-gray-900 inline">Rs: {product.price}</p>
              <p className="  mx-1 tracking-tight bg-green-500 text-gray-900 rounded-lg p-1 w-fit inline text-xs">save {product?.get_precentage}%</p>
              {
                product?.in_stock ? <p className="text-green-500 font-bold">In Stock</p> : <p className="text-red-500 font-bold">out of Stock</p>
              }
              {/* <!-- Reviews --> */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                {/* <UpdatedStars value={product.product_rating} /> */}

                  <div className="flex items-center">
                    {/* <!-- Active: "text-gray-900", Default: "text-gray-200" --> */}
                    {product?.product_rating === null &&
                      <>
                      <svg className="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                      <svg className="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                      <svg className="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                      <svg className="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                      <svg className="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    </>
                    
                    }
                    {product?.product_rating >1 && product?.product_rating <2 &&
                    <><svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    </>
                    }
                    {product?.product_rating >2 && product?.product_rating <3 &&
                    <><svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>

                    </>
                    }
                    {product?.product_rating >3 && product?.product_rating <4 &&
                   <> <svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    </>
                    }
                    {product?.product_rating >4 && product?.product_rating <5 &&
                    <>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    </>
                    }
                    {product?.product_rating >  5 && product?.product_rating <6 &&
                    <>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    </>
                    }
                    
                    {/* <svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg> */}
                  </div>
                  <p className="sr-only">{product?.product_rating} out of 5 stars</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">({reviews.length} reviews)</p>
                </div>
              </div>

              {/* <form className="mt-10"> */}
              {/* <!-- Colors --> */}
              {product?.color?.length > 0 &&
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <fieldset aria-label="Choose a color" className="mt-4">
                    <div className="flex items-center space-x-3">
                      {/* <!-- Active and Checked: "ring ring-offset-1" --> */}
                      {
                        product?.color?.map((c) => (
                          <label
                            key={c.name}
                            aria-label={c.name}
                            className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline hover:border"
                          >
                            <input
                              type="radio"
                              name="color-choice"
                              value={c.name}
                              className="sr-only"
                              onChange={() => setColorValue(c.name)}
                            />
                            <button
                              type="button"
                              onClick={() => setColorValue(c.name)}
                              style={{ backgroundColor: `${c.name}` }}
                              className={`h-8 w-8 rounded-full border border-black border-opacity-10      ${colorValue === c.name ? 'ring ring-offset-1 ring-black ' : ''
                                }`}
                            ></button>
                          </label>
                        ))
                      }



                    </div>
                  </fieldset>
                </div>}
              <div className="m-2 ml-0 text-sm">
                <h1>Quantity</h1>
                <input className="border border-gray-200 rounded-md p-2 w-fit " onChange={handleQtyChange} placeholder="0" type="number" defaultValue={1} />
              </div>

              {/* <!-- Sizes --> */}
              {product?.size?.length > 0 &&
                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4 ">
                    <div className="flex gap-2">
                      {product?.size?.map((s, index) => (
                        <button
                          type="button" // Ensure this does not submit a form
                          className={`w-fit h-fit border rounded-md text-center p-2 focus:outline-none ${sizeValue === s.name ? 'bg-black text-white' : ''
                            }`}
                          onClick={() => setSizeValue(s.name)} // Set size value on click
                        >
                          {s.name}
                        </button>

                      ))}




                    </div>
                  </fieldset>
                </div>}
              <div className="flex mt-10 gap-5">
                <button onClick={handleAddToCart} type="button" className=" flex w-fit items-center justify-center rounded-md border border-transparent  bg-black px-8 py-3 text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                  {isAddingToCart === "Add To Cart" &&
                    <i className="fas fa-cart-plus me-2" />
                  }

                  {isAddingToCart === "Processing..." &&
                    <i className="fas fa-spinner fa-spin me-2" />
                  }

                  {isAddingToCart === "Added To Cart" &&
                    <i className="fas fa-check-circle me-2" />
                  }

                  {isAddingToCart === "An Error Occured" &&
                    <i className="fas fa-check-circle me-2" />
                  }

                  {isAddingToCart}
                </button>
                <button type="button" onClick={handleAddToWishlist} className=" h-14 w-14 text-center inline justify-center items-center content-center rounded-md border border-gray-200 "><FaHeart className="inline text-center h-5 w-5" /></button>
              </div>


              {/* </form> */}
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* <!-- Description and details --> */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{product?.description}</p>
                </div>
              </div>



              {
                product?.specification?.map((s, index) => (
                  <div key={index} className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">{s.title}</h2>

                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-600">{s.content}</p>
                    </div>
                  </div>

                ))
              }

            </div>
          </div>
        </div>
      </div>
      {userData&& <div className="md:w-1/2 m-5 ">
        <h2 className="text-xl font-bold mb-4">Create a New Review</h2>
        <form method="POST" onSubmit={handleReviewSubmit}>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-gray-700 mb-2">
              Rating
            </label>
            <select
              onChange={handleReviewChange}
              name="rating"
              className="block w-full p-2 border rounded"
              id="rating"
            >
              <option value="1">★</option>
              <option value="2">★★</option>
              <option value="3">★★★</option>
              <option value="4">★★★★</option>
              <option value="5">★★★★★</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="reviewText" className="block text-gray-700 mb-2">
              Review
            </label>
            <textarea
              className="block w-full p-2 border rounded"
              rows={4}
              placeholder="Write your review"
              onChange={handleReviewChange}
              name="review"
              value={createReview.review}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={!createReview.rating || !createReview.review}
          >
            Submit Review
          </button>
        </form>
      </div>}



      <section class="py-24 relative">
        <div class="w-fit md:w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 class="font-manrope font-bold text-4xl text-black text-center mb-11">People Love Us</h2>
          <div class="grid grid-cols-12 py-6 border-y border-gray-200 mb-11">
            <div class="col-span-12 lg:col-span-10 ">
              <h5 class="font-manrope font-semibold text-2xl leading-9 text-black text-center">Reviews
                <span class="lg:hidden font-manrope font-semibold text-2xl leading-9 text-black text-center"> &
                  Rating</span>
              </h5>
            </div>
            <div class="col-span-12 lg:col-span-2 max-lg:hidden">
              <h5 class="font-manrope font-semibold text-2xl leading-9 text-black text-center">Rating</h5>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-8">
            {reviews.map((r, index) => (



              <div class="grid grid-cols-12 max-w-sm sm:max-w-full mx-auto">
                <div class="col-span-12 lg:col-span-10 ">
                  <div class="sm:flex gap-6">
                    <img src={r.profile.image} alt={r.profile.full_name} class="md:w-32 md:h-32 h-20 w-20 rounded-full" />
                    <div class="text">
                      <p class="font-medium text-lg leading-8 text-gray-900 mb-2">{r.profile.full_name}</p>
                      <div class="flex lg:hidden items-center gap-2 lg:justify-between w-full mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                          fill="none">
                          <g clip-path="url(#clip0_13624_2090)">
                            <path
                              d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                              fill="#FBBF24" />
                          </g>
                          <defs>
                            <clipPath id="clip0_13624_2090">
                              <rect width="30" height="30" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                          fill="none">
                          <g clip-path="url(#clip0_13624_2090)">
                            <path
                              d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                              fill="#FBBF24" />
                          </g>
                          <defs>
                            <clipPath id="clip0_13624_2090">
                              <rect width="30" height="30" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                          fill="none">
                          <g clip-path="url(#clip0_13624_2090)">
                            <path
                              d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                              fill="#FBBF24" />
                          </g>
                          <defs>
                            <clipPath id="clip0_13624_2090">
                              <rect width="30" height="30" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                          fill="none">
                          <g clip-path="url(#clip0_13624_2090)">
                            <path
                              d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                              fill="#FBBF24" />
                          </g>
                          <defs>
                            <clipPath id="clip0_13624_2090">
                              <rect width="30" height="30" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                          fill="none">
                          <g clip-path="url(#clip0_13624_2090)">
                            <path
                              d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                              fill="#FBBF24" />
                          </g>
                          <defs>
                            <clipPath id="clip0_13624_2090">
                              <rect width="30" height="30" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <p class="font-normal text-base leading-7 text-gray-400 mb-4 lg:pr-8">{r.review} </p>
                      <div class="flex items-center justify-between">
                        <div class="cursor-pointers flex items-center gap-2">
                          <a href="/" class="font-semibold text-lg cursor-pointer leading-8 text-indigo-600 whitespace-nowrap">
                            View & Reply</a>
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                            viewBox="0 0 22 22" fill="none">
                            <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#4F46E5"
                              stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </div>
                        <p
                          class="lg:hidden font-medium text-sm leading-7 text-gray-400 lg:text-center whitespace-nowrap">
                          {moment(r.date).format("MM/DD/YYYY")}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="col-span-12 lg:col-span-2 max-lg:hidden flex lg:items-center flex-row lg:flex-col justify-center max-lg:pt-6 ">
                  <div class="flex items-center gap-2 lg:justify-between w-full mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                      fill="none">
                      <g clip-path="url(#clip0_13624_2090)">
                        <path
                          d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                          fill="#FBBF24" />
                      </g>
                      <defs>
                        <clipPath id="clip0_13624_2090">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                      fill="none">
                      <g clip-path="url(#clip0_13624_2090)">
                        <path
                          d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                          fill="#FBBF24" />
                      </g>
                      <defs>
                        <clipPath id="clip0_13624_2090">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                      fill="none">
                      <g clip-path="url(#clip0_13624_2090)">
                        <path
                          d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                          fill="#FBBF24" />
                      </g>
                      <defs>
                        <clipPath id="clip0_13624_2090">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                      fill="none">
                      <g clip-path="url(#clip0_13624_2090)">
                        <path
                          d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                          fill="#FBBF24" />
                      </g>
                      <defs>
                        <clipPath id="clip0_13624_2090">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                      fill="none">
                      <g clip-path="url(#clip0_13624_2090)">
                        <path
                          d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                          fill="#FBBF24" />
                      </g>
                      <defs>
                        <clipPath id="clip0_13624_2090">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <p class="font-medium text-lg leading-8 text-gray-400 lg:text-center whitespace-nowrap">{moment(r.date).format("MM/DD/YYYY")}</p>
                </div>
              </div>))}
            <div class="pb-8 border-b border-gray-100 w-full"></div>

          </div>
        </div>
      </section>


    </div>
  );
};

export default ProductInfo;
