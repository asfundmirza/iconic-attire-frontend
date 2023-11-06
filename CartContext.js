"use client";
import { createContext, useState } from "react";

// import { getProductsData } from "./ProductStore";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function getProductQuantity(id, productSize) {
    const quantity = cartItems.find(
      (product) => product.id === id && product.size === productSize
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  function addOneToCart(id, productSize, productQuantity) {
    const quantity = getProductQuantity(id, productSize);

    if (quantity === 0) {
      setCartItems([
        ...cartItems,
        {
          id: id,
          size: productSize,
          quantity: productQuantity,
        },
      ]);
    } else {
      setCartItems(
        cartItems.map((product) =>
          product.id === id && product.size === productSize
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  function removeOneFromCart(id, productSize) {
    const quantity = getProductQuantity(id, productSize);
    if (quantity == 1) {
      deleteFromCart(id, productSize);
    } else {
      setCartItems(
        cartItems.map((product) =>
          product.id === id && product.size === productSize
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(id, productSize) {
    setCartItems((cartItems) =>
      cartItems.filter((product) => {
        return product.id != id || product.size != productSize;
      })
    );
  }

  function getTotalCost(cartItems, productsData) {
    let totalCost = 0;
    cartItems.forEach((cartProduct) => {
      const productData = productsData?.data?.find(
        (product) => product.id === cartProduct.product.id
      );

      if (productData) {
        totalCost += productData.attributes.price * cartProduct.quantity;
      }
    });
    return totalCost;
  }

  const contextValue = {
    items: cartItems,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
export default CartProvider;
