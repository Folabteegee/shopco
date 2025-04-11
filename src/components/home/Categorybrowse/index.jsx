import Image from "next/image";
import gadgets from "../../../../public/images/gadgets.png";
import men from "../../../../public/images/men.png";
import women2 from "../../../../public/images/women2.png";
import jewelries from "../../../../public/images/jewelries.png";

export default function Categorybrowse() {
  return (
    <div className="bg-[#F0F0F0] mx-4 md:mx-20 my-10 md:my-20 rounded-3xl p-6 md:p-10">
      {/* Title */}
      <div className="font-integral text-center font-black text-3xl md:text-5xl pt-6 md:pt-10">
        BROWSE BY CATEGORIES
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8 px-4 md:px-20 pt-10 md:pt-20">
        {/* Category Card */}
        <a href="/electronics">
          <div className="relative">
            <p className="absolute text-black font-satoshi text-xl md:text-2xl font-black top-4 left-4 bg-white/70 px-3 py-1 rounded">
              Electronics
            </p>
            <Image
              src={gadgets}
              alt="Electronics"
              width={500}
              height={300}
              className="rounded-2xl w-full"
            />
          </div>
        </a>
        <a href="/mensclothing">
          <div className="relative">
            <p className="absolute text-white font-satoshi text-xl md:text-2xl font-black top-4 left-4 bg-black/50 px-3 py-1 rounded">
              Men's Clothing
            </p>
            <Image
              src={men}
              alt="Men's Clothing"
              width={500}
              height={300}
              className="rounded-2xl w-full"
            />
          </div>
        </a>
        <a href="/womensclothing">
          <div className="relative">
            <p className="absolute text-black font-satoshi text-xl md:text-2xl font-black top-4 left-4 bg-white/70 px-3 py-1 rounded">
              Women's Clothing
            </p>
            <Image
              src={women2}
              alt="Women's Clothing"
              width={500}
              height={300}
              className="rounded-2xl w-full"
            />
          </div>
        </a>
        <a href="/jewelries">
          <div className="relative">
            <p className="absolute text-white font-satoshi text-xl md:text-2xl font-black top-4 left-4 bg-black/50 px-3 py-1 rounded">
              Jewelries
            </p>
            <Image
              src={jewelries}
              alt="Jewelries"
              width={500}
              height={300}
              className="rounded-2xl w-full"
            />
          </div>
        </a>
      </div>
    </div>
  );
}
