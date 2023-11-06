"use client";
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../../CartContext";
import { fetchDataFromUrl } from "../utils/api";
import Wrapper from "../components/Wrapper";
import Link from "next/link";
import Image from "next/image";
import CartItem from "../components/CartItem";
import CircularProgress from "@mui/material/CircularProgress";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../utils/api";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState(null);

  const cart = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const products = await fetchDataFromUrl("/api/products?populate=*");

      setProductsData(products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const productsInCart = [];

  cart?.items?.forEach((cartItem) => {
    const product = productsData?.data?.find(
      (product) => product.id === cartItem.id
    );

    if (product) {
      productsInCart.push({
        product,
        size: cartItem.size,
        quantity: cartItem.quantity,
      });
    }
  });

  const totalCost = cart.getTotalCost(productsInCart, productsData);

  // const productName = productsInCart[0]?.product?.attributes?.name;
  // console.log(productsInCart);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      const res = await makePaymentRequest("/api/orders", {
        products: productsInCart,
      });
      await stripe.redirectToCheckout({
        sessionId: res.stripeSession.id,
      });
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
  };
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {productsData ? (
          productsInCart.length > 0 ? (
            <>
              {/* HEADING AND PARAGRAPH START */}
              <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                  Shopping Cart
                </div>
              </div>
              {/* HEADING AND PARAGRAPH END */}

              {/* CART CONTENT START */}
              <div className="flex flex-col lg:flex-row gap-12 py-10">
                {/* CART ITEMS START */}
                <div className="flex-[2]">
                  <div className="text-lg font-bold">Cart Items</div>
                  {productsInCart?.map((item) => (
                    <CartItem key={item?.product?.id} data={item} />
                  ))}
                </div>
                {/* CART ITEMS END */}

                {/* SUMMARY START */}
                <div className="flex-[1]">
                  <div className="text-lg font-bold">Summary</div>

                  <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                    <div className="flex justify-between items-center">
                      <div className="uppercase text-md md:text-lg font-medium text-black">
                        Subtotal
                      </div>
                      <div className="text-md md:text-lg font-medium text-black">
                        {totalCost}
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-5 border-t mt-5">
                      <div className="uppercase text-md md:text-lg  font-medium text-black">
                        Shipping
                      </div>
                      <div className="text-md md:text-lg font-medium text-black">
                        {totalCost > 0 ? "200" : "0"}
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-5 border-t ">
                      <div className="uppercase text-md md:text-lg font-medium text-black">
                        Total
                      </div>
                      <div className="text-md md:text-lg font-medium text-black">
                        {totalCost > 0 ? totalCost + 200 : "0"}
                      </div>
                    </div>
                  </div>

                  {/* BUTTON START */}
                  <button
                    className="w-full py-4 rounded-full bg-btn-color hover:bg-btnhover-color text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                    onClick={handlePayment}
                  >
                    Checkout
                    {loading && <CircularProgress />}
                  </button>
                  {/* BUTTON END */}
                </div>
                {/* SUMMARY END */}
              </div>
              {/* CART CONTENT END */}
            </>
          ) : (
            <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
              <Image
                src="/empty-cart.jpg"
                width={300}
                height={300}
                className="w-[300px] md:w-[400px]"
              />
              <span className="text-xl font-bold">Your cart is empty</span>
              <span className="text-center mt-4">
                Looks like you have not added anything in your cart.
                <br />
                Go ahead and explore top categories.
              </span>
              <Link
                href="/"
                className="py-4 px-8 rounded-full bg-primary-color text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
              >
                Continue Shopping
              </Link>
            </div>
          )
        ) : (
          <div className="flex w-full h-screen justify-center items-center">
            <CircularProgress />
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
