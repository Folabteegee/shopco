import { useEffect, useState } from "react";
import Image from "next/image";
import Stars from "@/icon/stars";
import axios from "axios";

export default function Newarrival() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/category/mens-shirts") // Fetch men's shirts
      .then((res) => setProducts(res.data.products.slice(0, 4))) // Get first 4 products
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white pb-5 px-4 md:px-20">
      {/* Title */}
      <div className="text-3xl md:text-5xl font-bold font-integral pt-10 md:pt-20 text-center">
        NEW ARRIVALS
      </div>

      {/* Scrollable Products Container */}
      <div className="pt-10 md:pt-20 flex overflow-x-auto scrollbar-hide space-x-8 px-4">
        {/* Product Card */}
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center min-w-[250px] md:min-w-[300px]"
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={300}
              height={200}
              className="rounded-2xl w-full max-w-[300px]"
            />

            <div className="pt-5 text-lg text-center">
              <div className="font-satoshi font-black">{product.title}</div>
              <div className="flex justify-center items-center gap-2 font-satoshi text-sm pt-2">
                <Stars />
                <span>{product.rating}/5</span>
              </div>
              <div className="font-satoshi pt-2 text-2xl font-black">
                ${product.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="border-b border-gray-300 pb-10 md:pb-20 font-satoshi text-center mt-10 md:mt-20">
        <button className="rounded-full border border-gray-400 px-10 md:px-16 py-3 md:py-4 hover:bg-gray-100 transition">
          View All
        </button>
      </div>
    </div>
  );
}
