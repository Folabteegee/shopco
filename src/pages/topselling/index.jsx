import MainLayout from "@/layouts/MainLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import Stars from "@/icon/stars";
import Image from "next/image";
import { useRouter } from "next/router";

const TopSelling = () => {
  const router = useRouter();
  const [topSelling, setTopSelling] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=20&sortBy=sales"
        );
        setTopSelling(response.data.products);
      } catch (error) {
        console.error("Error fetching top-selling products:", error);
      } finally {
        setLoading(false); // Hide loader after fetching data
      }
    };

    fetchTopSelling();
  }, []);

  const handleProductClick = (id) => {
    router.push(`/product-details/${id}`);
  };

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="flex font-satoshi mt-24 font-semibold p-6 gap-3">
        <div className="flex items-center gap-1">
          <div>Home</div> <div> &gt; </div>
        </div>
        <div className="flex items-center gap-1">
          <div>Topselling</div>
        </div>
      </div>

      <div className="text-4xl sm:text-4xl mt-8 font-integral font-extrabold flex items-center justify-center text-center px-4">
        TOP SELLING PRODUCTS
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black"></div>
        </div>
      ) : (
        <div className="pt-6 flex overflow-x-auto scrollbar-hide space-x-8 px-4">
          {topSelling.map((product) => {
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
                  <div className="mt-2 bg-green-200 font-satoshi text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                    -{product.discountPercentage}% OFF
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </MainLayout>
  );
};

export default TopSelling;
