import React from "react";
import Image from "next/image";
import Aboutimage from "../../../public/images/About.jpg"
import banner from "../../../public/images/banner.svg"
const About = () => {
  return <div>

    <div className="main">
      {/* banner */}
      <div className="w-full top-0  flex justify-center items-center ">
        <div className=" absolute z-4">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-custom-font font-semibold">About</h1>
        </div>
        
        <Image src={banner}  />
        
      </div>
      <div className="section1 w-full flex flex-col md:flex-row px-4 py-[3rem] md:py-[5rem]">

        <div className="w-full md:w-[50%] flex flex-row justify-center items-center">

          <Image src={Aboutimage} alt="About image" className="w-[85%] md:w-[95%] rounded-md"/>

        </div>


        <div className="w-full md:w-[50%] flex flex-col space-y-6 py-4 justify-center items-center">

          

          <div className="w-full flex flex-col items-center justify-center space-y-3 px-2 ">
            <p className="text-sm md:text-[0.9rem] lg:text-lg font-custom-font font-normal ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ullamcorper auctor enim vel vestibulum. Praesent vulputate eros sed venenatis facilisis. Curabitur at urna vitae tortor vestibulum venenatis. Etiam lobortis ornare lorem non ultricies. Fusce nec nisl ultricies, auctor sem nec, viverra leo. Duis molestie leo in nulla tincidunt posuere. Fusce nec elit consectetur, aliquam leo et, consequat urna. Nullam vestibulum scelerisque tempor. Nam eget vehicula leo. Donec nibh leo, posuere id facilisis quis, eleifend at arcu.


    
            </p>
            <p className=" text-sm md:text-[0.9rem] lg:text-lg font-custom-font font-normal">Maecenas ut dui nec quam hendrerit porttitor. Pellentesque consectetur tellus vel nulla blandit, eget placerat tellus lobortis. Proin vitae enim ornare, scelerisque lorem eleifend, rutrum augue. Morbi pellentesque rutrum nibh, ut molestie lectus. Praesent aliquam consequat commodo. Vivamus a finibus justo. Curabitur faucibus turpis et urna porttitor condimentum. Nullam porttitor porttitor dolor sed consectetur. Donec nec sollicitudin odio.</p>
          </div>
        </div>
      </div>

     {/* Section2 */}
      <div className="section2 w-full flex px-8 py-[0.5rem] md:py-[2rem]">

      <div className="w-full  flex flex-col space-y-6 py-8 justify-center items-center">

<div className="flex justify-center items-center">
  <h2 className="text-xl md:text-3xl lg:text-4xl font-custom-font font-semibold md:font-semibold ">Our Mission</h2>
</div>

<div className="w-full md:w-[85%] flex flex-col items-center justify-center space-y-3 ">
  <p className="text-sm md:text-[0.9rem] lg:text-lg font-custom-font font-normal">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ullamcorper auctor enim vel vestibulum. Praesent vulputate eros sed venenatis facilisis. Curabitur at urna vitae tortor vestibulum venenatis. Etiam lobortis ornare lorem non ultricies. Fusce nec nisl ultricies, auctor sem nec, viverra leo. Duis molestie leo in nulla tincidunt posuere. Fusce nec elit consectetur, aliquam leo et, consequat urna. Nullam vestibulum scelerisque tempor. Nam eget vehicula leo. Donec nibh leo, posuere id facilisis quis, eleifend at arcu.



  </p>
  <p className="text-sm md:text-[0.9rem] lg:text-lg font-custom-font font-normal">Maecenas ut dui nec quam hendrerit porttitor. Pellentesque consectetur tellus vel nulla blandit, eget placerat tellus lobortis. Proin vitae enim ornare, scelerisque lorem eleifend, rutrum augue. Morbi pellentesque rutrum nibh, ut molestie lectus. Praesent aliquam consequat commodo. Vivamus a finibus justo. Curabitur faucibus turpis et urna porttitor condimentum. Nullam porttitor porttitor dolor sed consectetur. Donec nec sollicitudin odio.</p>
  <p className="text-sm md:text-[0.9rem] lg:text-lg font-custom-font font-normal">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ullamcorper auctor enim vel vestibulum. Praesent vulputate eros sed venenatis facilisis. Curabitur at urna vitae tortor vestibulum venenatis. Etiam lobortis ornare lorem non ultricies. Fusce nec nisl ultricies, auctor sem nec, viverra leo. Duis molestie leo in nulla tincidunt posuere. Fusce nec elit consectetur, aliquam leo et, consequat urna. Nullam vestibulum scelerisque tempor. Nam eget vehicula leo. Donec nibh leo, posuere id facilisis quis, eleifend at arcu.



  </p>

</div>
</div>
      </div>















    </div>






  </div>;
};

export default About;
