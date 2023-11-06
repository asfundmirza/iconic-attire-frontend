"use client";
import React, { useState, useEffect, useContext } from "react";
import Wrapper from "./Wrapper";

import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import Sitelogo from "../../../public/images/sitelogo.svg";

import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { fetchDataFromUrl } from "../utils/api";
import { CartContext } from "../../../CartContext";
import CartMenu from "./CartMenu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Header = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [productsData, setProductsData] = useState(null);
  const [isCartHovered, setCartHovered] = useState(false);
  const [mobileMenu, setMobileMenu] = useState({
    right: false,
  });
  const [topsMobileMenu, setTopsMobileMenu] = useState(true);
  const [bottomsMobileMenu, setBottomsMobileMenu] = useState(true);
  const TopsMobileMenuHandler = () => {
    setTopsMobileMenu(!topsMobileMenu);
  };
  const BottomsMobileMenuHandler = () => {
    setBottomsMobileMenu(!bottomsMobileMenu);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  const cart = useContext(CartContext);
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const res = await fetchDataFromUrl("/api/categories?populate=*", {
        cache: "force-cache",
      });
      const products = await fetchDataFromUrl("/api/products?populate=*");
      setCategoryData(res);
      setProductsData(products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const productQuantity = productsData?.data?.map((product) => {
    const sizes = product.attributes?.size?.data || [];
    const cartItems = sizes.map((sizeItem) => {
      const cartItem = cart.getProductQuantity(product.id, sizeItem.size);
      return cartItem;
    });
    return cartItems;
  });

  const flattenedProductQuantity = productQuantity?.flat();
  const totalCartItems = flattenedProductQuantity?.reduce(
    (total, quantity) => total + quantity,
    0
  );

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

  const subTotal = cart.getTotalCost(productsInCart, productsData);

  return (
    <header className="w-full h-[50px] md:h-[80px] bg-white flex items-center shadow-lg justify-between top-0 z-50 sticky">
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href="/">
          <Image
            src={Sitelogo}
            alt="site logo"
            className="w-40px md:w-[140px]"
          />
        </Link>

        <Menu categoryData={categoryData} />

        <div className="flex items-center gap-2 text-black">
          {/* Icon start */}

          <div
            onMouseEnter={() => setCartHovered(true)}
            onMouseLeave={() => setCartHovered(false)}
            className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center   relative"
          >
            <Link href="/cart">
              <BsCart
                onClick={() => setCartHovered(false)}
                className="text-[15px] md:text-[20px] cursor-pointer"
              />
            </Link>
            {isCartHovered && (
              <div className="absolute top-full right-0 bg-white hidden md:block rounded-xl w-[300px] p-5 py-9 shadow-lg  ">
                {totalCartItems === 0 ? (
                  <p className="flex justify-center">No Products Found</p>
                ) : (
                  <>
                    {productsInCart?.map((item) => (
                      <CartMenu key={item?.product?.id} data={item} />
                    ))}
                    <div className="flex w-ful justify-center py-5 border-b">
                      SubTotal : {subTotal}
                    </div>
                    <div className="flex w-full justify-center mt-5">
                      <Link href="/cart">
                        <button className="flex py-2 px-4 text-center font-bold text-white bg-btn-color hover:bg-btnhover-color rounded-xl cursor-pointer">
                          View Cart
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}

            {totalCartItems > 0 ? (
              <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                {totalCartItems}
              </div>
            ) : null}
          </div>

          {/* Icon end */}

          {/* Mobile icon start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
            <BiMenuAltRight
              onClick={toggleDrawer("right", true)}
              className="text-[20px]"
            />
          </div>
          {/* mobile menu drawer */}
          <Drawer
            anchor="right"
            open={mobileMenu.right}
            onClose={toggleDrawer("right", false)}
          >
            <List
              sx={{ width: "100%", width: 270, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Menu
                </ListSubheader>
              }
            >
              <ListItemButton onClick={TopsMobileMenuHandler}>
                <ListItemText primary="Tops" />
                {topsMobileMenu ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={topsMobileMenu} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link href="/category/shirts">
                    <ListItemButton
                      onClick={toggleDrawer("right", false)}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary="Shirts" />
                    </ListItemButton>
                  </Link>
                  <Divider />
                  <Link href="/category/jackets">
                    <ListItemButton
                      onClick={toggleDrawer("right", false)}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary="Jackets" />
                    </ListItemButton>
                  </Link>
                </List>
              </Collapse>
              <Divider />
              <ListItemButton onClick={BottomsMobileMenuHandler}>
                <ListItemText primary="Bottoms" />
                {bottomsMobileMenu ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={bottomsMobileMenu} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link href="/category/shorts">
                    <ListItemButton
                      onClick={toggleDrawer("right", false)}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary="Shorts" />
                    </ListItemButton>
                  </Link>
                  <Divider />
                  <Link href="/category/pants">
                    <ListItemButton
                      onClick={toggleDrawer("right", false)}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary="Pants" />
                    </ListItemButton>
                  </Link>
                </List>
              </Collapse>
              <Divider />
              <ListItem disablePadding>
                <Link href="/about">
                  <ListItemButton onClick={toggleDrawer("right", false)}>
                    <ListItemText primary="About" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <Link href="/contact">
                  <ListItemButton onClick={toggleDrawer("right", false)}>
                    <ListItemText primary="Contact" />
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          </Drawer>
          {/* Mobile icon end */}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
