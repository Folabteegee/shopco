"use client";
import MainLayout from "@/layouts/MainLayout";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const BrandProductsPage = () => {
  const { brand } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrandProducts = async () => {
      try {
        let allProducts = [];
        let limit = 30;
        let skip = 0;
        let total = 1;

        while (skip < total) {
          const res = await fetch(
            `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
          );
          const data = await res.json();

          if (skip === 0) total = data.total;
          allProducts = [...allProducts, ...data.products];
          skip += limit;
        }

        const filteredProducts = allProducts.filter((p) => p.brand === brand);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching brand products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (brand) {
      fetchBrandProducts();
    }
  }, [brand]);

  const handleProductClick = (id) => {
    router.push(`/product-details/${id}`);
  };

  return (
    <MainLayout>
      <div className="container font-satoshi mx-auto mt-16 p-6">
        <h1 className="text-3xl font-bold text-center font-integral mb-6">
          Products from {brand}
        </h1>
        {loading ? (
          <div className="text-center text-xl py-10">Loading Products...</div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found for this brand.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded"
                />
                <div className="text-center font-semibold text-lg mt-2">
                  {product.title}
                </div>
                <p className="text-center text-gray-600">${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default BrandProductsPage;
