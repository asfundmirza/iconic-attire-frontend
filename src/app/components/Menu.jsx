import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import { fetchDataFromUrl } from "../utils/api";

const data = [
  { id: 1, name: "Tops", subMenu: true },
  { id: 3, name: "Bottoms", subMenu: true },
  { id: 2, name: "About", url: "/about" },
  { id: 4, name: "Contact", url: "/contact" },
];

// const subMenuDataTops = [
//   { id: 1, name: "Shirts", doc_count: 11 },
//   { id: 2, name: "Jackets", doc_count: 8 },
// ];
// const subMenuDataBottoms = [
//   { id: 1, name: "Shorts", doc_count: 11 },
//   { id: 2, name: "Pants", doc_count: 8 },
// ];

const Menu = ({ categoryData }) => {
  const [showSubMenu, setShowSubMenu] = useState(null);

  const filterCategoriesByMenu = (menuName) => {
    return categoryData?.data?.filter((category) => {
      if (
        menuName === "Tops" &&
        (category.attributes.name === "Shirts" ||
          category.attributes.name === "Jackets")
      ) {
        return true;
      } else if (
        menuName === "Bottoms" &&
        (category.attributes.name === "Shorts" ||
          category.attributes.name === "Pants")
      ) {
        return true;
      }
      return false;
    });
  };

  return (
    <ul className="hidden md:flex items-center gap-8 font-custom-font font-medium text-black">
      {data.map((item) => (
        <li
          key={item.id}
          className="relative"
          onMouseEnter={() => setShowSubMenu(item.id)}
          onMouseLeave={() => setShowSubMenu(null)}
        >
          {item.subMenu ? (
            <div
              className={` ${
                showSubMenu === item.id ? "block" : "hidden"
              } absolute top-full left-0 bg-white rounded-lg w-48 py-3 shadow-lg px-3`}
            >
              {filterCategoriesByMenu(item.name)?.map((subItem, index) => (
                <Link
                  key={subItem.id}
                  href={`/category/${subItem.attributes.slug}`}
                  onClick={() => setShowSubMenu(null)}
                  className={`text-black py-3  flex justify-between hover:bg-gray-50 items-center ${
                    index !== filterCategoriesByMenu(item.name).length - 1
                      ? "border-b border-gray-300"
                      : ""
                  }`}
                >
                  <span>{subItem.attributes.name}</span>
                  <span className="text-black">
                    {`(${subItem?.attributes?.products?.data?.length})`}
                  </span>
                </Link>
              ))}
            </div>
          ) : null}
          <div className="cursor-pointer flex items-center">
            {item.url ? (
              <Link href={item.url}>
                <span className="flex items-center">
                  {item.name}{" "}
                  {item.subMenu && <BsChevronDown className="ml-2" />}
                </span>
              </Link>
            ) : (
              <>
                {item.name} {item.subMenu && <BsChevronDown className="ml-2" />}
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
