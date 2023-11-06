import React from "react";
import Image from "next/image";
import { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CartContext } from "../../../CartContext";
const CartMenu = ({ data }) => {
  const cart = useContext(CartContext);

  return (
    <div className="flex py-3 justify-between border-b">
      <div className="flex justify-start gap-3">
        <div className="shrink-0 aspect-square w-[50px] bg-gray-50/20 rounded-md ">
          <Image
            src={data?.product?.attributes?.thumbnail?.data?.attributes?.url}
            alt={data?.product?.attributes?.slug}
            width={120}
            height={120}
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="text-sm font-semibold text-black">
            {data?.product?.attributes?.name}
          </div>
          <div className="flex gap-5">
            <div className="flex items-center">
              {/* <div className="font-semibold text-sm text-gray-400">Size:</div> */}
              <div className="text-xs text-gray-400 ">{data?.size}</div>
            </div>
            <div className="flex items-center">
              {/* <div className="font-semibold text-sm text-gray-400">Price:</div> */}
              <div className="text-xs text-gray-400 ">
                {`${data?.quantity} * ${data?.product?.attributes?.price} `}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <RiDeleteBin6Line
          onClick={() => cart.deleteFromCart(data?.product?.id, data?.size)}
          className="cursor-pointer text-black text-[16px] "
        />
      </div>
    </div>
  );
};

export default CartMenu;
