import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";
import { paginationItems } from "../../../constants";
import apiInstance from "../../../axios/axios";
import { BrandContext, CategoryContext, ColorContext, PriceContext } from "../../plugins/Context";


const items = paginationItems;

function Items() {
  const { selectedPriceRange } = useContext(PriceContext);
  const { selectedCategory } = useContext(CategoryContext);
  const { selectedColors } = useContext(ColorContext);
  const { selectedBrand } = useContext(BrandContext);
  const [data,setItems]=useState([]);
  const fetchData= async ()=>{
    const response = await apiInstance.get('products/', {
      params: {
        category:selectedCategory,
        brand:selectedBrand,
        min_price: selectedPriceRange[0],
        max_price: selectedPriceRange[1],
        color:selectedColors,
      }})
    await setItems(response.data)
  }
  useEffect(()=>{
    fetchData();
  })
  const filteredItems=data
  

  return (
    <>
      {filteredItems.map((item) => (
        <div key={item.id} className="w-full">
          <Product
            _id={item.id}
            img={item.image}
            productName={item.title}
            price={item.price}
            // color={item.color}
            badge={true}
            des={item.description}
            slug={item.slug}
            oldPrice={item.old_price}
            saved={item.get_precentage}
            shipping_amount={item.shipping_amount}
            sizes={item.size}
            colors={item.color}
            // color={item.color}


            // pdf={item.}
            // ficheTech={item.ficheTech}
          />
        </div>
      ))}
    </>
  );
}

const Pagination = ({ itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const selectedBrands = useSelector(
    (state) => state.orebiReducer.checkedBrands
  );
  const selectedCategories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    const newStart = newOffset + 1; // Adjust the start index

    setItemOffset(newOffset);
    setItemStart(newStart);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items
          currentItems={currentItems}
          selectedBrands={selectedBrands}
          selectedCategories={selectedCategories}
        />{" "}
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {Math.min(endOffset, items.length)} of{" "}
          {items.length}
        </p>
        <button onClick={() => console.log(selectedBrands)}> test</button>
      </div>
    </div>
  );
};

export default Pagination;
