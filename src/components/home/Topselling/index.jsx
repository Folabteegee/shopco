import Image from "next/image";
import Stars from "@/icon/stars";

export default function Topselling() {
  return (
    <div className="bg-white pb-10 px-4 md:px-20">
      {/* Title */}
      <div className="text-3xl md:text-5xl font-bold font-integral pt-10 md:pt-20 text-center">
        TOP SELLING
      </div>

      {/* Scrollable Products Container */}
      <div className="pt-10 md:pt-20 flex overflow-x-auto scrollbar-hide space-x-8 px-4">
        {/* Product Card List */}
        {[
          {
            img: "/images/Frame 32.png",
            name: "Vertical Striped Shirt",
            rating: "5.0",
            price: "$120",
            oldPrice: "$232",
            discount: "-20%",
          },
          {
            img: "/images/Frame 33.png",
            name: "Casual Hoodie",
            rating: "4.8",
            price: "$140",
            oldPrice: "$280",
            discount: "-30%",
          },
          {
            img: "/images/Frame 34.png",
            name: "Classic Jeans",
            rating: "4.6",
            price: "$99",
            oldPrice: "$180",
            discount: "-45%",
          },
          {
            img: "/images/Frame 35.png",
            name: "Slim Fit Chinos",
            rating: "4.7",
            price: "$110",
            oldPrice: "$200",
            discount: "-40%",
          }, // Example extra product
        ].map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[250px] md:min-w-[300px]"
          >
            <Image
              src={product.img}
              alt={product.name}
              width={300}
              height={200}
              className="rounded-2xl w-full max-w-[300px]"
            />

            <div className="pt-5 text-lg text-center">
              <div className="font-satoshi font-black">{product.name}</div>
              <div className="flex justify-center items-center gap-2 font-satoshi text-sm pt-2">
                <Stars />
                <span>{product.rating}/5</span>
              </div>

              {/* Price and Discount */}
              <div className="pt-2 flex items-center justify-center gap-3 text-2xl">
                <div className="font-satoshi font-black">{product.price}</div>
                <div className="font-satoshi font-bold text-slate-400 line-through">
                  {product.oldPrice}
                </div>
                <div className="rounded-full bg-pink-200 font-satoshi text-xs py-1 px-4 text-red-500">
                  {product.discount}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="pb-10 md:pb-20 font-satoshi text-center mt-10 md:mt-20">
        <button className="rounded-full border border-gray-400 px-10 md:px-16 py-3 md:py-4 hover:bg-gray-100 transition">
          View All
        </button>
      </div>
    </div>
  );
}
