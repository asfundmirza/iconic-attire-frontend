"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "@/app/components/Wrapper";
import { fetchDataFromUrl } from "@/app/utils/api";
import ProductCard from "@/app/components/ProductCard";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import FilterListIcon from "@mui/icons-material/FilterList";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";

const Category = ({ params }) => {
  const [apiCatData, setApiCatData] = useState(null);
  const [apiProdData, setApiProdData] = useState(null);
  const [inputValue, setinputValue] = useState("");

  const [value, setValue] = useState([1000, 5000]);
  const [age, setAge] = useState("desc");
  const [state, setState] = useState({
    left: false,
  });

  const fetchData = async () => {
    const category = await fetchDataFromUrl(
      `/api/categories?filters[slug][$eq]=${params.slug}`
    );
    const products = await fetchDataFromUrl(
      `/api/products?populate=*&sort=publishedAt:${age}&[filters][categories][slug][$eq]=${params.slug}&[filters][slug][$contains]=${inputValue}&[filters][price][$gte]=${value[0]}&[filters][price][$lte]=${value[1]}`
    );

    setApiCatData(category);
    setApiProdData(products);
  };
  useEffect(() => {
    fetchData();
  }, [inputValue, value, age]);

  const valuetext = (value) => {
    return value;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSortChange = (event) => {
    setAge(event.target.value);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <Wrapper>
        <div className="text-center max-w-[700px] mx-auto mt-8 md:mt-5">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {apiCatData ? (
              apiCatData.data?.[0]?.attributes?.name
            ) : (
              <div className="flex justify-center items-center">
                <Skeleton
                  width={100}
                  height={50}
                  sx={{ bgcolor: "gray.100" }}
                />
              </div>
            )}

            <div className="md:hidden flex gap-2 justify-between mt-6 px-5 items-center">
              <div
                onClick={toggleDrawer("left", true)}
                className=" flex justify-start gap-1"
              >
                <FilterListIcon />
                <div className="text-[18px]">filters</div>
              </div>
              <div className="flex justify-end">
                <input
                  type="text"
                  placeholder="Search"
                  value={inputValue}
                  onChange={(e) => setinputValue(e.target.value)}
                  className="bg-slate-100 border-primary-color focus:border-primary-color outline-none text-sm p-3 rounded-md min-w-[200px]"
                />
              </div>
            </div>
          </div>
          <Drawer
            anchor="left"
            open={state.left}
            onClose={toggleDrawer("left", false)}
          >
            <Box
              sx={{
                width: 270,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "1rem",
                marginTop: "3rem",
              }}
              role="presentation"
              onClick={toggleDrawer("left", false)}
              onKeyDown={toggleDrawer("left", false)}
            >
              {/* mobile filtering  */}
              <div className="flex flex-col gap-3">
                <p className="text-xl font-custom-font text-gray-600 font-semibold">
                  Filter By Price
                </p>
                <div
                  style={{
                    borderTop: "4px solid",
                    width: "50px",
                    color: "#2A72B5",
                  }}
                ></div>
                <div style={{ width: 230 }}>
                  <Slider
                    getAriaLabel={() => "Price range"}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={1000}
                    max={5000}
                    step={500}
                    marks
                    disableSwap
                    sx={{ color: "#2A72B5" }}
                  />
                </div>
                <p className="flex justify-end">
                  Price : {value[0]}-{value[1]}
                </p>
              </div>

              <Divider />

              {/* mobile sorting */}
              <div className="flex flex-col gap-3">
                <p className="text-xl font-custom-font text-gray-600 font-semibold">
                  Sort By
                </p>
                <div
                  className="mb-2"
                  style={{
                    borderTop: "4px solid",
                    width: "50px",
                    color: "#2A72B5",
                  }}
                ></div>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Sort"
                      onChange={handleSortChange}
                    >
                      <MenuItem value="asc">oldest</MenuItem>
                      <MenuItem value="desc">latest</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </Box>
          </Drawer>
        </div>
        {/* products grid start */}
        <div className="flex md:justify-normal justify-center">
          <div className="hidden md:flex justify-start flex-col gap-8 my-14 mr-8">
            {/* input search field */}
            <div className="flex flex-col gap-3 ">
              <p className="text-xl font-custom-font text-gray-600 font-semibold">
                Search
              </p>
              <div
                style={{
                  borderTop: "4px solid",
                  width: "50px",
                  color: "#2A72B5",
                }}
              ></div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setinputValue(e.target.value)}
                className="bg-slate-100 border-primary-color focus:border-primary-color p-2 rounded-md w-60 "
              />
            </div>
            <Divider />
            {/* filter by price */}
            <div className="flex flex-col gap-3 ">
              <p className="text-xl font-custom-font text-gray-600 font-semibold">
                Filter By Price
              </p>
              <div
                style={{
                  borderTop: "4px solid",
                  width: "50px",
                  color: "#2A72B5",
                }}
              ></div>
              <div style={{ width: 230 }}>
                <Slider
                  getAriaLabel={() => "Price range"}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  min={1000}
                  max={5000}
                  step={500}
                  marks
                  disableSwap
                  sx={{ color: "#2A72B5" }}
                />
              </div>
              <p className="flex justify-end">
                Price : {value[0]}-{value[1]}
              </p>
            </div>
            <Divider />
            {/* sorting */}
            <div className="flex flex-col gap-3 ">
              <p className="text-xl font-custom-font text-gray-600 font-semibold">
                Sort By
              </p>
              <div
                className="mb-2"
                style={{
                  borderTop: "4px solid",
                  width: "50px",
                  color: "#2A72B5",
                }}
              ></div>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Sort"
                    onChange={handleSortChange}
                  >
                    <MenuItem value="asc">oldest</MenuItem>
                    <MenuItem value="desc">latest</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 md:my-14 my-6 px-5 md:px-0  ">
            {apiProdData
              ? apiProdData.data.length > 0
                ? apiProdData.data.map((product) => (
                    <ProductCard key={product.id} data={product} />
                  ))
                : null
              : Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={375}
                    height={420}
                    sx={{ bgcolor: "gray.100" }}
                  />
                ))}
          </div>
          <div
            className={`md:h-screen md:w-full flex items-center justify-center my-32 md:my-0 ${
              apiProdData?.data?.length === 0 ? "" : "hidden"
            }`}
          >
            {apiProdData && apiProdData.data.length === 0 && (
              <p className="text-center font-semibold text-3xl">
                No data found!
              </p>
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Category;

// {searchFilterData
//   ? searchFilterData.data?.map((product) => (
//       <ProductCard key={product.id} data={product} />
//     ))
//   : !searchFilterData
//   ? priceFilterData?.data?.map((product) => (
//       <ProductCard key={product.id} data={product} />
//     ))
//   : !searchFilterData && !priceFilterData
//   ? apiProdData?.data.map((product) => (
//       <ProductCard key={product.id} data={product} />
//     ))
//   : ""}

// api for the filtering and sorting
//api/products?populate=*&sort=publishedAt:asc&[filters][categories][slug][$eq]=shirts&[filters][slug][$contains]=n&[filters][price][$gte]=1500&[filters][price][$lte]=5000
