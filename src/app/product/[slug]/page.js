"use client";
import React, { useEffect, useState, useContext } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import Wrapper from "@/app/components/Wrapper";
import ProductDetailsCarousel from "@/app/components/ProductDetailsCarousel";
import RelatedProducts from "@/app/components/RelatedProducts";
import { fetchDataFromUrl } from "@/app/utils/api";
import { Discount } from "@/app/utils/discount";
import CircularProgress from "@mui/material/CircularProgress";
import { CartContext } from "../../../../CartContext";

import ReactMarkdown from "react-markdown";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ params }) => {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const [apiProductData, setApiProductData] = useState(null);
  const [apiProductsData, setApiProductsData] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);

  const cart = useContext(CartContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const product = await fetchDataFromUrl(
      `/api/products?populate=*&filters[slug][$eq]=${params.slug}`
    );
    const products = await fetchDataFromUrl(
      `/api/products?populate=*&[filters][slug][$ne]=${params.slug}`
    );

    setApiProductData(product);
    setApiProductsData(products);
  };

  const p = apiProductData?.data?.[0]?.attributes;
  const productId = apiProductData?.data?.[0]?.id;
  const discountedPrice = Discount(p?.original_price, p?.price);

  const notify = () => {
    toast.success("Success. Check your cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        {p ? (
          <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
            {/* left column start */}
            <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
              <ProductDetailsCarousel images={p?.images?.data} />
            </div>
            {/* left column end */}

            {/* right column start */}
            <div className="flex-[1] py-3">
              {/* PRODUCT TITLE */}
              <div className="text-[34px] font-semibold mb-2 leading-tight">
                {p?.name}
              </div>

              {/* PRODUCT PRICE */}
              <div className="flex items-center">
                <p className="mr-2 text-lg font-semibold">Rs : {p?.price}</p>
                {p?.original_price && (
                  <>
                    <p className="text-base  font-medium line-through">
                      {p?.original_price}
                    </p>
                    <p className="ml-auto text-base font-medium text-green-500">
                      {discountedPrice}% off
                    </p>
                  </>
                )}
              </div>

              <div className="text-md font-medium text-black/[0.5]">
                incl. of taxes
              </div>
              <div className="text-md font-medium text-black/[0.5] mb-20">
                {`(Also includes all applicable duties)`}
              </div>

              {/* PRODUCT SIZE RANGE START */}
              <div className="mb-10">
                {/* HEADING START */}
                <div className="flex justify-between mb-2">
                  <div className="text-md font-semibold">Select Size</div>
                  <div
                    className="text-sm font-medium text-black/[0.5] hover:cursor-pointer"
                    onClick={() => {
                      setSelectedSize(null);
                      setShowError(false);
                    }}
                  >
                    Clear
                  </div>
                </div>
                {/* HEADING END */}

                {/* SIZE START */}
                <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                  {p?.size?.data.map((item, i) => (
                    <div
                      key={i}
                      className={`border rounded-md text-center py-3 font-medium ${
                        item.quantity > 0
                          ? "hover:border-primary-color cursor-pointer"
                          : "cursor-not-allowed bg-black/[0.1] opacity-50"
                      } ${
                        selectedSize === item.size
                          ? "border-btn-color bg-btn-color text-white"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedSize(item.size);
                        setShowError(false);
                      }}
                    >
                      {item.size}
                    </div>
                  ))}
                </div>
                {/* SIZE END */}

                {/* SHOW ERROR START */}
                {showError && (
                  <div className="text-red-600 mt-1">
                    Size selection is required
                  </div>
                )}
                {/* SHOW ERROR END */}
              </div>
              {/* PRODUCT SIZE RANGE END */}

              {/* quantiy */}

              <div className="flex mb-4 items-center">
                <p className="text-md font-semibold">Quantity : </p>
                <div className="flex ml-2">
                  <button
                    onClick={() =>
                      setProductQuantity(
                        productQuantity - 1 >= 1 ? productQuantity - 1 : 1
                      )
                    }
                    className="w-8 h-8 text-black rounded-md flex text-2xl items-center justify-center"
                  >
                    -
                  </button>
                  <div className="w-8 h-8 flex items-center justify-center">
                    {productQuantity}
                  </div>
                  <button
                    onClick={() => setProductQuantity(productQuantity + 1)}
                    className="w-8 h-8 text-black flex rounded-md text-2xl items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ADD TO CART BUTTON START */}
              <button
                className="w-full py-4 rounded-full bg-btn-color mb-12 text-white text-lg font-medium transition-transform active:scale-95  hover:opacity-75"
                onClick={() => {
                  if (!selectedSize) {
                    setShowError(true);
                    document.getElementById("sizesGrid").scrollIntoView({
                      block: "center",
                      behavior: "smooth",
                    });
                  } else {
                    cart.addOneToCart(productId, selectedSize, productQuantity);

                    notify();
                  }
                }}
              >
                Add to Cart
              </button>
              {/* ADD TO CART BUTTON END */}

              {/* WHISHLIST BUTTON START */}
              {/* <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                Whishlist
                <IoMdHeartEmpty size={20} />
              </button> */}
              {/* WHISHLIST BUTTON END */}

              <div>
                <div className="text-lg font-bold mb-5">Product Details</div>
                <div className="markdown text-md mb-5">
                  <ReactMarkdown>{p?.description}</ReactMarkdown>
                </div>
              </div>
            </div>
            {/* right column end */}
          </div>
        ) : (
          <div className="flex w-full h-screen justify-center items-center">
            <CircularProgress />
          </div>
        )}

        {apiProductsData && <RelatedProducts products={apiProductsData} />}
      </Wrapper>
    </div>
  );
};

export default ProductDetails;
