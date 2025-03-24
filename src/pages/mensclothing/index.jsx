import MainLayout from "@/layouts/MainLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import Stars from "@/icon/stars";
import Image from "next/image";
import { useRouter } from "next/router";

const MensClothing = () => {
  const router = useRouter();
  const [shirts, setShirts] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [watches, setWatches] = useState([]);
  const [sunglasses, setSunglasses] = useState([]);

  useEffect(() => {
    // Fetch all men's related products
    const fetchData = async () => {
      try {
        const [shirtsRes, shoesRes, watchesRes, sunglassesRes] =
          await Promise.all([
            axios.get("https://dummyjson.com/products/category/mens-shirts"),
            axios.get("https://dummyjson.com/products/category/mens-shoes"),
            axios.get("https://dummyjson.com/products/category/mens-watches"),
            axios.get("https://dummyjson.com/products/category/sunglasses"),
          ]);

        setShirts(shirtsRes.data.products);
        setShoes(shoesRes.data.products);
        setWatches(watchesRes.data.products);
        setSunglasses(sunglassesRes.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleProductClick = (id) => {
    router.push(`/product-details/${id}`);
  };

  const renderProducts = (title, products) => (
    <div>
      <h2 className="text-3xl mt-12 font-satoshi font-bold text-center">
        {title}
      </h2>
      <div className="pt-6 flex overflow-x-auto scrollbar-hide space-x-8 px-4">
        {products.map((product) => {
          const discountedPrice = (
            product.price *
            (1 - product.discountPercentage / 100)
          ).toFixed(2);
          return (
            <div
              key={product.id}
              className="flex flex-col items-center min-w-[250px] md:min-w-[300px] cursor-pointer"
              onClick={() => handleProductClick(product.id)}
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
                <div className="font-satoshi pt-2 text-2xl font-black text-black">
                  ${discountedPrice}{" "}
                  <span className="text-red-600 line-through text-lg">
                    ${product.price}
                  </span>
                </div>
                <div className="mt-2 bg-green-200 text-green-800 font-satoshi text-xs font-bold px-2  py-1 rounded-full">
                  -{product.discountPercentage}% OFF
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="text-5xl mt-8 font-satoshi font-extrabold flex justify-center">
        MEN'S COLLECTION
      </div>
      {renderProducts("Shirts", shirts)}
      {renderProducts("Shoes", shoes)}
      {renderProducts("Watches", watches)}
      {renderProducts("Sunglasses", sunglasses)}
    </MainLayout>
  );
};

export default MensClothing;
