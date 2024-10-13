import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import { useState,useEffect } from "react";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "./components/plugins/Context";
import apiInstance from "./axios/axios";
import CartID from "./components/plugins/CartID";
import Checkout from "./pages/Cart/Checkout";
import OrderSuccess from "./pages/Cart/OrderSuccess";
import { PriceContext,SizeContext,CategoryContext,ColorContext,BrandContext } from "./components/plugins/Context";
import Invoice from "./pages/Cart/Invoice";
// import Profile from "./components/customer/Profile";
import OrderHistory from "./components/customer/Orders";
import Notification from "./components/customer/Notification";
import Settings from "./components/customer/Settings";
import Wishlist from "./components/customer/Wishlist";
import Orders from "./components/customer/Orders";
import OrderDetail from "./components/customer/OrderDetail";
import Account from "./components/plugins/Account";
import MainWrapper from "./components/Layouts/MainWrapper"
import PrivateRoute from "./components/Layouts/PrivateRoute"
import Logout from "./pages/Account/Logout";
import Support from "./components/Banner/Support";
import FreeShipping from "./components/Banner/FreeShipping";
import WarrantyDetails from "./components/Banner/WarrantyDetails";
import ContactSupport from "./components/Banner/ContactSupport";
import PrivacyPolicy from "./components/Banner/PrivacyPolicy";
import FAQs from "./components/Banner/FAQ";
import VerifyEmail from "./pages/Account/VerifyEmail";
import EmailVerify from "./pages/Account/EmailVerify";
// import { FaQq } from "react-icons/fa";
// import { useState } from "react";
const Layout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        
          <Route index element={<Home />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/journal" element={<Journal />}></Route>
          {/* ==================== Header Navlink End here ===================== */}
          <Route path="/category/:category" element={<Offer />}></Route>
          <Route path="/product/:_id" element={<ProductDetails />}></Route>
          <Route path="/checkout/:order_id" element={<Checkout />}></Route>
          <Route path="/order-success/:order_oid" element={<OrderSuccess />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/paymentgateway" element={<Payment />}></Route>
          <Route path="/customer/account" element={<PrivateRoute><Account /></PrivateRoute>}></Route>
          <Route path="/customer/orders" element={<PrivateRoute><Orders /></PrivateRoute>}></Route>
          <Route path="/customer/notifications" element={<PrivateRoute><Notification /></PrivateRoute>}></Route>
          <Route path="/customer/settings" element={<PrivateRoute><Settings /></PrivateRoute>}></Route>
          <Route path="/customer/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/free-shipping" element={<FreeShipping />}></Route>
          <Route path="/support" element={<Support />}></Route>
          <Route path="/warranty" element={<WarrantyDetails/>}></Route>
          <Route path="/contact-support" element={<ContactSupport/>}></Route>
          <Route path="/privacy-policy" element={<PrivacyPolicy/>}></Route>
          <Route path="/faq" element={<FAQs/>}></Route>
          <Route path="/customer/order/detail/:order_oid/" element={<OrderDetail/>}></Route>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/email-verify" element={<EmailVerify />}></Route>
        {/* </CartContext.Provider>   */}
      </Route>
      <Route path="/invoice/:order_oid" element={<Invoice />}></Route>
      {/* <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
       */}
    </Route>
  )
);

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedColors, setSelectedColors] = useState('');
  const [selectedSizes, setSelectedSizes] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const updatePriceRange = (range) => {
    setSelectedPriceRange(range);
  };

  const updateColors = (colors) => {
    setSelectedColors(colors);
  };
  const updateSizes = (size) => {
    setSelectedSizes(size);
  };

  const updateCategory = (category) => {
    setSelectedCategory(category); // Set the selected category
  };
  
  
  const updateBrand = (brand) => {
    setSelectedBrand(brand);
  };
    const userData = null;
    let cart_id = CartID()
    const axios = apiInstance


    useEffect(() => {
        const url = userData?.user_id ? `cart-list/${cart_id}/${userData?.user_id}/` : `cart-list/${cart_id}/`;
        axios.get(url).then((res) => {
            setCartCount(res.data.length)
        });
    }, [])
  
  return (
    <div className="font-bodyFont bg-[#E3F2FD] text-[#007BFF]">
      <CartContext.Provider value={[cartCount, setCartCount]}>
        <PriceContext.Provider value={{ selectedPriceRange, updatePriceRange }}>
          <SizeContext.Provider value={{ selectedSizes, updateSizes }}>
            <ColorContext.Provider value={{ selectedColors, updateColors }}>
            <BrandContext.Provider value={{ selectedBrand, updateBrand }}>
              <CategoryContext.Provider  value={{ selectedCategory, updateCategory }}>
                <MainWrapper>
                <RouterProvider router={router} />
                </MainWrapper>
               
              </CategoryContext.Provider>
            </BrandContext.Provider>
              
            </ColorContext.Provider>
          </SizeContext.Provider>
        </PriceContext.Provider>
      </CartContext.Provider>
    </div>
  );
}

export default App;
