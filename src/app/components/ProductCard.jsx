import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Discount } from "../utils/discount";
const ProductCard = ({ data: { attributes: p, id } }) => {
  const discountedPrice = Discount(p?.original_price, p?.price);
  return (
    <>
      <Link
        href={`/product/${p?.slug}`}
        className="transform overflow-hidden  object-fill duration-200 hover:scale-105 cursor-pointer"
      >
        <Image
          width={500}
          height={500}
          src={p?.thumbnail?.data?.attributes?.url}
          alt={p.name}
          className="bg-slate-50 rounded-md"
        />
        <div className="p-4 text-black/[0.9]">
          <h2 className="text-lg font-medium">{p?.name}</h2>
          <div className="flex items-center justify-between text-black/[0.5]">
            <div className="flex">
              <p className="mr-2 text-lg font-semibold">Rs{p?.price}</p>
              <p className="mr-2 text-lg font-semibold line-through">
                {p?.original_price}
              </p>
            </div>
            <div>
              <p className="text-base font-medium text-green-500">
                {discountedPrice}% off
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
