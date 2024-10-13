import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { LazyLoadImage } from 'react-lazy-load-image-component'; // For lazy loading images
import 'react-lazy-load-image-component/src/effects/blur.css'; // Lazy load image effects
import Skeleton from 'react-loading-skeleton'; // Skeleton loading

const Journal = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [journalEntries, setJournalEntries] = useState([]); // Assuming data comes from API

  useEffect(() => {
    setPrevLocation(location.state?.data || "Home");

    // Simulate API call
    setTimeout(() => {
      setJournalEntries([
        { id: 1, title: "Entry Title 1", description: "Description of the entry 1.", image: "path_to_entry_image1.jpg" },
        { id: 2, title: "Entry Title 2", description: "Description of the entry 2.", image: "path_to_entry_image2.jpg" },
        // More entries...
      ]);
      setLoading(false);
    }, 2000); // Simulate loading time
  }, [location]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <Breadcrumbs title="Journals" prevLocation={prevLocation} />

      {/* Hero Section */}
      <section className="bg-gray-200 py-16 rounded-lg shadow-lg mb-8 animate-fadeIn">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-8 p-5">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="text-primeColor">Vivify</span> Journals
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Dive into our curated articles on technology, lifestyle, and travel. Stay updated with the latest trends and insights crafted to inspire and inform. 
            </p>
            <Link to="/shop">
              <button className="w-52 h-12 bg-primeColor text-white hover:bg-black transition duration-300 rounded-lg">
                Continue Shopping
              </button>
            </Link>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <LazyLoadImage
              src="/vivify.png" // Replace with actual image
              alt="Journal Hero"
              effect="blur"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured Entries Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Featured Entries</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <Skeleton height={150} />
                <Skeleton count={3} />
              </div>
            ))
          ) : (
            journalEntries.map(entry => (
              <div key={entry.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <LazyLoadImage
                  src='/vivify.png' // Replace with actual image
                  alt={entry.title}
                  effect="blur"
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{entry.title}</h3>
                <p className="text-gray-600 mb-4">{entry.description}</p>
                <Link to={`/journal/${entry.id}`} className="text-primeColor hover:underline">Read More</Link>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Categories</h2>
        <ul className="list-disc pl-5">
          <li><Link to="/journal/category/tech" className="text-primeColor hover:underline">Technology</Link></li>
          <li><Link to="/journal/category/lifestyle" className="text-primeColor hover:underline">Lifestyle</Link></li>
          <li><Link to="/journal/category/travel" className="text-primeColor hover:underline">Travel</Link></li>
          {/* More categories can be added dynamically */}
        </ul>
      </section>

      {/* Search Functionality Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Search Journals</h2>
        <input
          type="text"
          placeholder="Search journals..."
          className="w-full h-12 px-4 border rounded-lg shadow-md focus:ring focus:ring-primeColor transition-all"
        />
      </section>

      {/* Author Information Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Meet the Authors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CEO Profile */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
            <LazyLoadImage
              src='/jamalkhan.jpg' // Replace with actual image
              alt="CEO Jamal Khan"
              effect="blur"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Jamal Khan</h3>
            <p className="text-gray-600">
              Jamal Khan, the CEO of Vivify Store, is a visionary leader with a passion for innovative technology solutions. He has spearheaded various successful projects and continues to inspire with his commitment to excellence and growth.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Journal;
