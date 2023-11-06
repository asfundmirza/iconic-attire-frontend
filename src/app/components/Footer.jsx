import React from "react";
import Wrapper from "./Wrapper";
import Image from "next/image";
import sitelogo from "../../../public/images/sitelogo.svg";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaCcPaypal, FaCcMastercard } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="w-full  bg-footer-color text-black py-8">
      <Wrapper className="w-full  md:flex-col">
        <div className="Sitecontent flex flex-col md:flex-row ">
          {/* Site Logo and info */}

          <div className="info w-full px-1  py-4">
            <div className="sitedata w-full flex flex-col items-center  gap-y-4">
              <Image src={sitelogo} alt="site logo" width={150} />
              <p className=" w-full md:w-full text-[1rem]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
                quasi magni reiciendis esse explicabo perferendis ipsam,
                voluptates, ad unde veritatis possimus odit officia commodi
                perspiciatis minus omnis corrupti. Veritatis commodi dolorum
                porro suscipit eius eaque voluptatibus odit eveniet recusandae
                cum!
              </p>
            </div>
          </div>

          {/* Useful Links */}
          <div className="w-full flex flex-row py-4 mb-4">
            <div className="w-full md:w-[80%] gap-y-6  flex flex-col items-center  md:items-center">
              <h1 className=" text-black text-md">Useful Links</h1>

              <Link href="/" className=" hover:text-[#3782C7] text-sm">
                Home
              </Link>

              <Link
                href="/about"
                className=" hover:text-[#3782C7] text-sm"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="hover:text-[#3782C7] text-sm"
              >
                Contact
              </Link>
              <Link href="/" className=" hover:text-[#3782C7] text-sm">
                Terms
              </Link>
            </div>

            {/* product range */}

            <div className="w-full md:w-[80%] gap-y-6  flex flex-col items-center  md:items-center">
              <h1 className=" text-black text-md">Product Range</h1>

              <Link
                href="/category/jackets"
                className=" hover:text-[#3782C7] text-sm"
              >
                Jackets
              </Link>

              <Link
                href="/category/shirts"
                className=" hover:text-[#3782C7] text-sm"
              >
                Shirts
              </Link>

              <Link
                href="/category/pants"
                className=" hover:text-[#3782C7] text-sm"
              >
                Pants
              </Link>
              <Link
                href="/category/shorts"
                className=" hover:text-[#3782C7] text-sm"
              >
                Shorts
              </Link>
            </div>
          </div>

          {/* Form */}
          <div className="form w-full mb-4 space-y-4  md:space-y-2 ">
            {/* UserName */}

            <div className="mb-2 hidden md:flex md:flex-col">
              <label
                htmlFor="website-admin"
                className="block mb-2 text-sm font-medium text-black"
              >
                Username
              </label>

              <input
                type="text"
                className="rounded-md bg-field-color border border-gray-300 text-slate-800 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="User Name"
              ></input>
            </div>

            {/* Email */}

            <div className="mb-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black"
              >
                Your email
              </label>
              <input
                type="email"
                className="  border border-gray-300 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-field-color  dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="name@.com"
                required
              ></input>
            </div>

            {/* Message */}

            <div className="mb-4 hidden md:flex md:flex-col">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-black"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-white bg-field-color rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="text-white bg-[#2A72B5] hover:bg-[#3782C7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center   dark:focus:ring-blue-800"
            >
              Send
            </button>
          </div>
        </div>

        {/* Payment method */}

        <div className="payment w-full py-2">
          <div className="icons w-full flex justify-center gap-x-6">
            <h3>Pay with</h3>

            <FaCcPaypal className="cursor-pointer hover:text-[#3782C7]  text-[22px] md:text-[28px]" />
            <FaCcMastercard className="cursor-pointer hover:text-[#3782C7]  text-[22px] md:text-[28px]" />
            <SiAmericanexpress className="cursor-pointer hover:text-[#3782C7]  text-[22px] md:text-[28px]" />
          </div>
        </div>

        {/* Social icons */}

        <div className="social py-4 px-[6rem] md:px-0">
          <div className="icons w-full flex justify-between  md:justify-center align-middle gap-x-6">
            <Image width={80} src={sitelogo} alt="site logo" />

            <div className="flex flex-row gap-x-6">
              <FaFacebookF className="cursor-pointer hover:text-[#3782C7] " />
              <FaTwitter className="cursor-pointer hover:text-[#3782C7]" />
              <FaInstagram className="cursor-pointer hover:text-[#3782C7] " />
            </div>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
