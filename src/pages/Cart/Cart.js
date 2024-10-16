import  { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
// import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
// import ItemCard from "./ItemCard";
import { useContext } from "react";
import { CartContext } from "../../components/plugins/Context";
import GetCurrentAddress from "../../components/plugins/UserCountry";
import { useNavigate } from "react-router-dom";
import CartID from "../../components/plugins/CartID";
import apiInstance from "../../axios/axios";
import Swal from "sweetalert2";
import { addToCart } from "../../components/plugins/AddToCart";
// import { FaCircle } from "react-icons/fa";
import { MdUpdate } from "react-icons/md";
import UserData from "../../components/plugins/UserData";


const Cart = () => {
  const [cart, setCart] = useState([])
  const [cartTotal, setCartTotal] = useState([])
  const [productQuantities, setProductQuantities] = useState({});
  // let [isAddingToCart, setIsAddingToCart] = useState('')
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("pakistan")
  const [country, setCountry] = useState("pakistan")
  const { setCartCount} = useContext(CartContext);
  // const dispatch = useDispatch();
  // const products = useSelector((state) => state.orebiReducer.products);
  // const [totalAmt, setTotalAmt] = useState("");
  // const [shippingCharge, setShippingCharge] = useState("");
  const axios = apiInstance
  const userData = UserData();
  let cart_id = CartID()
  const currentAddress = GetCurrentAddress()
  let navigate = useNavigate();
  const cities = [
    'ISLAMABAD', 'KARACHI', 'LAHORE', 'FAISALABAD', 'MULTAN',
    'PESHAWAR', 'RAWALPINDI', 'QUETTA', 'SIALKOT', 'GUJRANWALA',
    'SARGODHA', 'BAHAWALPUR', 'SHEIKHUPURA', 'JEHLUM', 'MINGORA',
    'ABBOTTABAD', 'SWAT', 'HYDERABAD', 'LARKANA', 'ZAHEDAN',
    'SUKKUR', 'CHAMAN', 'D.G. KHAN', 'SADIQABAD', 'KOHAT',
    'KASUR', 'OKARA', 'GUJRAT', 'MURREE', 'WAZIRABAD'
  ];

  // funtions for handling carts and other important things
  // fetchcartdata  
  const fetchCartData = (cartId, userId) => {
    const url = userId ? `cart-list/${cartId}/${userId}/` : `cart-list/${cartId}/`;

    axios.get(url).then((res) => {
      setCart(res.data);
    });
  };
  // Get Cart Totals
  const fetchCartTotal = async (cartId, userId) => {
    const url = userId ? `cart-detail/${cartId}/${userId}/` : `cart-detail/${cartId}/`
    axios.get(url).then((res) => {
      setCartTotal(res.data);
    });
    // console.log(cartTotal);
  }
  useEffect(() => {
    console.log(cartTotal);
  }, [cartTotal]);

  // if (cart_id !== null || cart_id !== undefined) {
  //     if (userData !== undefined) {
  //         useEffect(() => {
  //             fetchCartData(cart_id, userData.user_id);
  //             fetchCartTotal(cart_id, userData.user_id);
  //         }, []);
  //     } else {
  //         useEffect(() => {
  //             fetchCartData(cart_id, null);
  //             fetchCartTotal(cart_id, null);
  //         }, []);
  //     }
  // } else {
  //     window.location.href("/");
  // }
  useEffect(() => {
    if (cart_id !== null || cart_id !== undefined) {
      if (userData !== undefined || userData !== null) {
        // useEffect(() => {
        fetchCartData(cart_id, userData && userData.user_id);
        fetchCartTotal(cart_id, userData && userData.user_id);
        // }, []);
      } else {
        // useEffect(() => {
        fetchCartData(cart_id, null);
        fetchCartTotal(cart_id, null);
        // }, []);
      }
    } else {
      window.location.href("/");
    }

  })


  useEffect(() => {
    const initialQuantities = {};
    cart.forEach((c) => {
      initialQuantities[c.product.id] = c.qty
    });
    setProductQuantities(initialQuantities);
  }, [productQuantities,cart]);

  const handleQtyChange = (event, product_id) => {
    const quantity = event.target.value;
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product_id]: quantity,
    }));
  };
  const UpdateCart = async (cart_id, item_id, product_id, price, shipping_amount, color, size) => {
    const qtyValue = productQuantities[product_id];

    

    try {
      // Await the addToCart function
      await addToCart(product_id, userData?.user_id, qtyValue, price, shipping_amount, currentAddress.country, color, size, cart_id);

      // Fetch the latest cart data after addToCart is completed
      fetchCartData(cart_id, userData?.user_id)
      fetchCartTotal(cart_id, userData?.user_id)

    } catch (error) {
      // Handle error, e.g., display an error message
      console.log(error);
    }
  };

  // Remove Item From Cart
  const handleDeleteClick = async (cartId, itemId) => {
    const url = userData?.user_id
      ? `cart-delete/${cartId}/${itemId}/${userData.user_id}/`
      : `cart-delete/${cartId}/${itemId}/`;

    try {
      await axios.delete(url);
      // Add any additional logic or state updates after successful deletion
      fetchCartData(cart_id, userData?.user_id)
      fetchCartTotal(cart_id, userData?.user_id)

      const cart_url = userData?.user_id ? `cart-list/${cart_id}/${userData?.user_id}/` : `cart-list/${cart_id}/`;
      const response = await axios.get(cart_url);

      setCartCount(response.data.length);

    } catch (error) {
      console.error('Error deleting item:', error);
      // Handle errors or update state accordingly
    }
  };



  // Shipping Details
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Use computed property names to dynamically set the state based on input name
    switch (name) {
      case 'fullName':
        setFullName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'mobile':
        setMobile(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'state':
        setState(value);
        break;
      case 'country':
        setCountry(value);
        break;
      default:
        break;
    }
  };




  const createCartOrder = async () => {

    if (!fullName || !email || !mobile || !address || !city || !state || !country) {
      // If any required field is missing, show an error message or take appropriate action
      console.log("Please fill in all required fields");
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields!',
        text: "All fields are required before checkout",
      })
      return;
    }

    try {

      const formData = new FormData();
      formData.append('full_name', fullName);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('country', country);
      formData.append('cart_id', cart_id);
      formData.append('user_id', userData ? userData.user_id : 0);

      const response = await axios.post('create-order/', formData)
      console.log(response.data.order_oid);

      navigate(`/checkout/${response.data.order_oid}`);

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="max-w-container mx-auto px-4">
      {/* <Breadcrumbs title="Cart" /> */}
      {cart.length > 0 ? (
        <div className="pb-20">
          <div className="font-sans max-w-5xl max-md:max-w-xl mx-auto bg-white py-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center">Shopping Cart</h1>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="md:col-span-2 space-y-4">
                {
                  cart.map((p, index) => (
                    <div key={index} className="grid grid-cols-3 items-start gap-4">
                      <div className="col-span-2 flex items-start gap-4">
                        <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
                          <img src={p?.product?.image} alt={p?.product?.title} className="w-full h-full object-contain" />
                        </div>

                        <div className="flex flex-col">
                          <h3 className="text-base font-bold text-gray-800">{p?.product?.title}</h3>
                          {p?.size ? <p className="text-xs font-semibold text-gray-500 mt-0.5">Size: {p?.size}</p> : null}
                          {p?.product?.stock_qty ? <p className="text-xs font-semibold text-gray-500 mt-0.5">stock_qty: {p?.product?.stock_qty}</p> : null}
                          {p?.size ? <p className="text-xs font-semibold text-gray-500 mt-0.5">Color: {p?.color}</p> : null}

                          <button onClick={() => handleDeleteClick(cart_id, p.id)} type="button" className="mt-6 font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current inline" viewBox="0 0 24 24">
                              <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000"></path>
                              <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000"></path>
                            </svg>
                            REMOVE
                          </button>
                        </div>
                      </div>

                      <div className="ml-auto">
                        <h4 className="text-lg max-sm:text-base font-bold text-gray-800">Rs: {p?.sub_total}</h4>

                        <div className="flex justify-center items-center content-center">
                          <div className="form-outline">
                            <input
                              type="number"
                              id={`qtyInput-${p.product.id}`}
                              className="w-20 border border-black rounded-lg"
                              onChange={(e) => handleQtyChange(e, p.product.id)}
                              value={productQuantities[p.product.id] || p.qty}
                              min={1}

                            />
                          </div>
                          <button className='mx-1' onClick={() => UpdateCart(cart_id, p.id, p.product.id, p.product.price, p.product.shipping_amount, p.color, p.size)} ><MdUpdate className=' h-10 w-10'/></button>
                        </div>
                      </div>
                      <hr className="border-gray-300" />
                    </div>
                  ))}



              </div>

              <div className="bg-gray-100 rounded-md p-4 h-max">
                <h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">Order Summary</h3>

                {/* <form className="mt-6"> */}
                <div>
                  <h3 className="text-base text-gray-800  font-semibold mb-4">Enter Details</h3>
                  <div className="space-y-3">
                    <div className="relative flex items-center">
                      <input type="text" name="fullName" placeholder="Full Name" value={fullName} onChange={handleChange}
                        className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none" />
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4"
                        viewBox="0 0 24 24">
                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                        <path
                          d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                          data-original="#000000"></path>
                      </svg>
                    </div>

                    <div className="relative flex items-center">
                      <input type="email" name="email" placeholder="Email" onChange={handleChange} value={email}
                        className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none" />
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4"
                        viewBox="0 0 682.667 682.667">
                        <defs>
                          <clipPath id="a" clipPathUnits="userSpaceOnUse">
                            <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                          </clipPath>
                        </defs>
                        <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                          <path fill="none" stroke-miterlimit="10" stroke-width="40"
                            d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                            data-original="#000000"></path>
                          <path
                            d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                            data-original="#000000"></path>
                        </g>
                      </svg>
                    </div>

                    <div className="relative flex items-center">
                      <input type="number" name="mobile" placeholder="Phone No." onChange={handleChange} value={mobile}
                        className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none" />
                      <svg fill="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 64 64">
                        <path
                          d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                          data-original="#000000"></path>
                      </svg>
                    </div>
                    <h3 className="text-base text-gray-800  font-semibold mb-4">Shipping Address</h3>
                    <div className="relative flex items-center">
                      <input type="text" placeholder="Address" name="address" onChange={handleChange} value={address}
                        className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none" />
                      {/* <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> */}
                      <svg fill="#000000" className="w-4 h-4 absolute right-4 text-gray-400" width="800px" height="800px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M49,18.92A23.74,23.74,0,0,0,25.27,42.77c0,16.48,17,31.59,22.23,35.59a2.45,2.45,0,0,0,3.12,0c5.24-4.12,22.1-19.11,22.1-35.59A23.74,23.74,0,0,0,49,18.92Zm0,33.71a10,10,0,1,1,10-10A10,10,0,0,1,49,52.63Z" /></svg>
                    </div>
                    <div className="relative flex items-center">
                      <select
                        name='city'
                        value={city}
                        onChange={handleChange}
                        className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none"
                      >
                        <option value="" disabled>Select a city</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      <svg
                        width="800px"
                        className="w-4 h-4 absolute right-4 text-gray-400"
                        height="800px"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11 1H1V15H3V11H5V15H15V9H11V1ZM5 3H3V5H5V3ZM9 3H7V5H9V3ZM7 7H9V9H7V7ZM11 11H13V13H11V11Z"
                          fill="#000000"
                        />
                      </svg>
                    </div>

                    <div className="relative flex items-center">
                      <input type="hidden" placeholder="State" disabled={true} onChange={handleChange} name='state' value={state}
                        className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none" />
                      {/* <svg width="800px" className="w-4 h-4 absolute right-4 text-gray-400" height="800px" viewBox="0 0 36 36" aria-hidden="true" role="img"  preserveAspectRatio="xMidYMid meet"><path fill="#004600" d="M32 5H9v26h23a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4zm-9.5 20.472a7.5 7.5 0 0 1-7.5-7.5c0-3.72 2.711-6.799 6.263-7.39A6.496 6.496 0 0 0 24 22.972a6.496 6.496 0 0 0 5.89-3.763c-.591 3.553-3.67 6.263-7.39 6.263zm5.11-10.424l-1.213 2.022l-.208-2.349l-2.298-.528l2.17-.924l-.207-2.349l1.548 1.779l2.17-.924l-1.212 2.023l1.548 1.779l-2.298-.529z"></path><path fill="#EEE" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h5V5H4z"></path><path fill="#FFF" d="M29.572 11.775l-2.17.924l-1.548-1.779l.207 2.349l-2.17.924l2.298.528l.208 2.349l1.213-2.022l2.298.529l-1.548-1.779z"></path><path fill="#FFF" d="M24 22.972a6.496 6.496 0 0 1-2.737-12.39c-3.552.592-6.263 3.671-6.263 7.39a7.5 7.5 0 0 0 7.5 7.5c3.72 0 6.799-2.711 7.39-6.263A6.494 6.494 0 0 1 24 22.972z"></path></svg> */}
                    </div>
                    <div className="relative flex items-center">
                      <input type="text" placeholder="Country" disabled={true} onChange={handleChange} name="country" value={country}
                        className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none" />
                      <svg width="800px" className="w-4 h-4 absolute right-4 text-gray-400" height="800px" viewBox="0 0 36 36" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet"><path fill="#004600" d="M32 5H9v26h23a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4zm-9.5 20.472a7.5 7.5 0 0 1-7.5-7.5c0-3.72 2.711-6.799 6.263-7.39A6.496 6.496 0 0 0 24 22.972a6.496 6.496 0 0 0 5.89-3.763c-.591 3.553-3.67 6.263-7.39 6.263zm5.11-10.424l-1.213 2.022l-.208-2.349l-2.298-.528l2.17-.924l-.207-2.349l1.548 1.779l2.17-.924l-1.212 2.023l1.548 1.779l-2.298-.529z"></path><path fill="#EEE" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h5V5H4z"></path><path fill="#FFF" d="M29.572 11.775l-2.17.924l-1.548-1.779l.207 2.349l-2.17.924l2.298.528l.208 2.349l1.213-2.022l2.298.529l-1.548-1.779z"></path><path fill="#FFF" d="M24 22.972a6.496 6.496 0 0 1-2.737-12.39c-3.552.592-6.263 3.671-6.263 7.39a7.5 7.5 0 0 0 7.5 7.5c3.72 0 6.799-2.711 7.39-6.263A6.494 6.494 0 0 1 24 22.972z"></path></svg>
                    </div>



                  </div>
                </div>
                {/* </form> */}

                <ul className="text-gray-800 mt-6 space-y-3">
                  <li className="flex flex-wrap gap-4 text-sm">Subtotal <span className="ml-auto font-bold">Rs: {cartTotal?.sub_total}</span></li>
                  <li className="flex flex-wrap gap-4 text-sm">Shipping <span className="ml-auto font-bold">Rs: {cartTotal?.shipping}</span></li>
                  {/* <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-bold">$4.00</span></li> */}
                  <hr className="border-gray-300" />
                  <li className="flex flex-wrap gap-4 text-sm font-bold">Total <span className="ml-auto">Rs: {cartTotal?.total}</span></li>
                </ul>

                <div className="mt-6 space-y-3">
                  <button onClick={createCartOrder} type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md">Checkout</button>
                  <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md">Continue Shopping  </button>
                </div>
              </div>
            </div>
          </div>



        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
