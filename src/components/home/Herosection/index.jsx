import { useState, useEffect } from "react";
import Calvinklein from "@/icon/Calvinklein";
import Gucci from "@/icon/Gucci";
import Prada from "@/icon/Prada";
import Zara from "@/icon/Zara";
import Versace from "@/icon/Versace";
import Star from "@/icon/Star";
import StarII from "@/icon/StarII";
import Image from "next/image";
import Heroimage2 from "../../../../public/images/Heroimage2.png";

export default function Herosection() {
  const [brandsCount, setBrandsCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);

  useEffect(() => {
    const animateCount = (setter, finalValue, duration, step = 1) => {
      let start = 0;
      const stepTime = Math.abs(Math.floor(duration / (finalValue / step)));
      const timer = setInterval(() => {
        start += step;
        setter(start);
        if (start >= finalValue) {
          setter(finalValue);
          clearInterval(timer);
        }
      }, stepTime);
    };

    animateCount(setBrandsCount, 200, 2000, 2);
    animateCount(setProductsCount, 2000, 2000, 50);
    animateCount(setCustomersCount, 30000, 2000, 100); // Increase by 500 per step
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row mt-28 justify-between items-center  bg-[#F2F0F1] px-6 md:px-0">
        {/* Left Section */}
        <div className="w-full md:w-1/2 text-center md:text-left py-10 md:py-0">
          <div className="font-integral font-black text-8xl max-md:text-5xl md:text-6xl px-4 md:px-20">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </div>
          <div className="pt-6 md:pt-8 px-4 md:px-20 font-satoshi text-gray-500 text-sm md:text-base">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </div>
          <div className="pt-6 md:pt-8 items-center px-4 md:px-20">
            <a href="/onsale">
              <button className="font-satoshi  hover:bg-slate-500 hover:text-black rounded-full bg-black text-white px-10 py-3">
                Shop Now
              </button>
            </a>
          </div>

          {/* Stats Section */}
          <div className="pt-10 md:pt-16 px-4 md:px-16 flex flex-col md:flex-row justify-center items-center md:items-start gap-5">
            <div className="max-md:flex-row gap-5 flex flex-row">
              <div className="flex flex-col items-center md:items-start border-r-2 border-gray-300 pr-5">
                <div className="font-black text-3xl md:text-4xl font-satoshi">
                  {brandsCount}+
                </div>
                <div className="font-satoshi text-gray-500 pt-2 text-sm md:text-base">
                  International Brands
                </div>
              </div>

              <div className="flex flex-col items-center md:items-start border-r-2 border-gray-300 pr-5 max-md:border-none">
                <div className="font-black text-3xl md:text-4xl font-satoshi">
                  {productsCount}+
                </div>
                <div className="font-satoshi text-gray-500 pt-2 text-sm md:text-base">
                  High-Quality Products
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <div className="font-black text-3xl md:text-4xl font-satoshi">
                {customersCount}+
              </div>
              <div className="font-satoshi text-gray-500 pt-2 text-sm md:text-base">
                Happy Customers
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 relative flex justify-center mt-8 md:mt-0">
          {/* Decorative Stars */}
          <div className="absolute top-10 left-5 md:top-60">
            <Star />
          </div>
          <div className="absolute top-10 right-20 max-md:top-[-70px] max-md:right-[10px]">
            <StarII />
          </div>

          <Image
            src={Heroimage2}
            alt="Hero Image"
            width={350}
            height={200}
            className="w-72 md:w-[500px]"
          />
        </div>
      </div>

      {/* Brands Section */}
      <div className="bg-black text-white py-12 px-6 max-md:max-w-max  flex flex-wrap justify-evenly gap-8">
        <Versace />
        <Zara />
        <Gucci />
        <Prada />
        <Calvinklein />
      </div>
    </div>
  );
}
