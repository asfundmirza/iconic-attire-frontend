import Image from "next/image";
import React, { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CartContext } from "../../../CartContext";
const CartItem = ({ data }) => {
  const cart = useContext(CartContext);
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image
          src={data?.product?.attributes?.thumbnail?.data?.attributes?.url}
          alt={data?.product?.attributes?.slug}
          width={120}
          height={120}
        />
      </div>
      {/* IMAGE END */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <div className="flex justify-between">
            <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
              {data?.product?.attributes?.name}
            </div>
            <RiDeleteBin6Line
              onClick={() => cart.deleteFromCart(data?.product?.id, data?.size)}
              className="md:hidden cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
            />
          </div>

          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            Rs : {data?.product?.attributes?.price * data?.quantity}
          </div>
        </div>

        {/* PRODUCT SUBTITLE */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          {data?.product?.attributes?.slug}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <p className="text-xs md:text-sm">{data?.size}</p>
            </div>

            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>

              <div className="flex gap-1  md:gap-3">
                <button
                  onClick={() =>
                    cart.removeOneFromCart(data?.product?.id, data?.size)
                  }
                  className="bg-btn-color hover:bg-btnhover-color w-6 h-6 rounded-lg flex items-center justify-center text-center  text-white"
                >
                  -
                </button>
                <p>{data?.quantity}</p>
                <button
                  onClick={() =>
                    cart.addOneToCart(
                      data?.product?.id,
                      data?.size,
                      data?.quantity
                    )
                  }
                  className="bg-btn-color hover:bg-btnhover-color w-6 h-6 rounded-lg flex items-center justify-center  text-center text-white"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <RiDeleteBin6Line
            onClick={() => cart.deleteFromCart(data?.product?.id, data?.size)}
            className="hidden md:flex cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
