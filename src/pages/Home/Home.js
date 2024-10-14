import React, { Suspense } from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // For lazy load effects

// Lazy loading sections for better performance
const BestSellers = React.lazy(() => import("../../components/home/BestSellers/BestSellers"));
const NewArrivals = React.lazy(() => import("../../components/home/NewArrivals/NewArrivals"));
const Sale = React.lazy(() => import("../../components/home/Sale/Sale"));
const SpecialOffers = React.lazy(() => import("../../components/home/SpecialOffers/SpecialOffers"));
const YearProduct = React.lazy(() => import("../../components/home/YearProduct/YearProduct"));

const Home = () => {
  return (
    <div className="w-full mx-auto bg-[#E3F2FD]"> {/* Changed background color */}
      {/* Banner */}
      <Banner />

      {/* Banner Bottom */}
      <BannerBottom />

      {/* Main Container for Products and Offers */}
      <div className="max-w-container mx-auto px-4 py-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] my-6 text-center"> {/* Updated text color */}
          Explore Our Collections
        </h2>

        <Suspense fallback={<div className="text-center py-4 text-gray-600">Loading Sale Section...</div>}>
          <Sale />
        </Suspense>

        <Suspense fallback={<div className="text-center py-4 text-gray-600">Loading New Arrivals...</div>}>
          <NewArrivals />
        </Suspense>

        <Suspense fallback={<div className="text-center py-4 text-gray-600">Loading Best Sellers...</div>}>
          <BestSellers />
        </Suspense>

        <Suspense fallback={<div className="text-center py-4 text-gray-600">Loading Product of the Year...</div>}>
          <YearProduct />
        </Suspense>

        <Suspense fallback={<div className="text-center py-4 text-gray-600">Loading Special Offers...</div>}>
          <SpecialOffers />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
