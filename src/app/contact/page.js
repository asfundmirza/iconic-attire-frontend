import React from "react";
import Image from "next/image";
import banner from "../../../public/images/banner.svg"

const Contact = () => {
  return (
    <div>
      {/* banner */}
      <div className="w-full top-0  flex justify-center items-center ">
        <div className=" absolute z-4">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-custom-font font-semibold">Contact</h1>
        </div>
        
        <Image src={banner}  />
        
      </div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0"
              frameborder="0"
              title="map"
              marginheight="0"
              marginwidth="0"
              scrolling="no"
              src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=Lahore,+Pakistan&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
              style={{
                filter: "none",
                contrast: "1.2",
                opacity: "0.4",
              }}
            ></iframe>
            <div className="bg-white relative flex flex-wrap py-6 gap-2 rounded shadow-md ">
              <div className="lg:w-1/2 px-6 mr-1">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  EMAIL
                </h2>
                <p className="mt-1 text-indigo-500 leading-relaxed">
                  iconicattire@gmail.com
                </p>
              </div>
              <div className="lg:w-1/2 px-6 sm:mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  PHONE
                </h2>
                <p className="leading-relaxed mt-1">123-456-7890</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <div className="flex justify-center">
            <h2 className="text-gray-900 text-2xl mb-1 font-medium title-font">
              Contact Us
            </h2>
            </div>

            <div className="relative mb-4">
              <label for="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-primary-color focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label for="email" className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-primary-color focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label for="message" className="leading-7 text-sm text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full bg-white rounded border border-gray-300 focus:border-primary-color focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button className="text-white bg-btn-color hover:bg-btnhover-color border-0 py-2 px-6 focus:outline-none  rounded text-lg">
              Send
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
