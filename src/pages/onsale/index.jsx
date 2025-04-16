import MainLayout from "@/layouts/MainLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import Stars from "@/icon/stars";
import Image from "next/image";
import { useRouter } from "next/router";

const categories = [
  "fragrances",
  "groceries",
  "home-decoration",
  "furniture",
  "laptops",
  "smartphones",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "sunglasses",
  "womens-dresses",
  "womens-shoes",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
];

const OnSale = () => {
  const router = useRouter();
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = categories.map((category) =>
          axios.get(`https://dummyjson.com/products/category/${category}`)
        );
        const responses = await Promise.all(requests);

        const newProducts = {};
        responses.forEach((res, index) => {
          newProducts[categories[index]] = res.data.products;
        });

        setProducts(newProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Hide loader after fetching data
      }
    };

    fetchData();
  }, []);

  const handleProductClick = (id) => {
    router.push(`/product-details/${id}`);
  };

  const renderProducts = (title, products) => (
    <div key={title}>
      <h2 className="text-3xl mt-12 font-integral font-bold text-center">
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
                <div className="mt-2 bg-green-200 text-green-800 text-xs font-satoshi font-bold px-2 py-1 rounded-full">
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
      {/* breadcrumb */}
      <div className="flex font-satoshi mt-24 font-semibold p-6 gap-3">
        <div className="flex items-center gap-1">
          <div>Home</div> <div> &gt; </div>
        </div>
        <div className="flex items-center gap-1">
          <div>On Sale</div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-center p-9 font-integral mb-6">
        ON SALE
      </h1>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black"></div>
        </div>
      ) : (
        Object.entries(products).map(([category, items]) =>
          renderProducts(category.replace("-", " ").toUpperCase(), items)
        )
      )}
    </MainLayout>
  );
};

export default OnSale;
