"use client";
import MainLayout from "@/layouts/MainLayout";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        // Extract unique brands, filtering out undefined values
        const uniqueBrands = [
          ...new Set(data.products.map((p) => p.brand)),
        ].filter((brand) => brand && brand.trim() !== "");
        setBrands(uniqueBrands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="text-center font-satoshi font-semibold text-xl py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black"></div>
        </div>
        Loading Brands...
      </div>
    );
  }

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="flex font-satoshi mt-24 font-semibold p-6 gap-3">
        <div className="flex items-center gap-1">
          <div>Home</div> <div> &gt; </div>
        </div>
        <div className="flex items-center gap-1">
          <div>Brands</div>
        </div>
      </div>

      <div className="container font-satoshi mx-auto p-6">
        <h1 className="text-3xl font-bold text-center font-integral mb-6">
          Shop by Brand
        </h1>
        {brands.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brands.map((brand, index) => (
              <Link
                key={index}
                href={`/brands/${encodeURIComponent(brand)}`}
                className="block bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition"
              >
                <div className="text-center font-semibold text-lg">{brand}</div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-500 mt-6">
            No brands available.
          </p>
        )}
      </div>
    </MainLayout>
  );
}
