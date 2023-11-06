import React from "react";

// const discount = (original_price, price) => {
//   const discountedPrice = ((original_price - price) / original_price) * 100;
//   return discountedPrice;
// };

// export default discount;

export const Discount = (original_price, price) => {
  const discountedPrice = ((original_price - price) / original_price) * 100;
  const exact_price = discountedPrice.toFixed(2);
  return exact_price;
};
