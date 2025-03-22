import MainLayout from "@/layouts/MainLayout";
import React from "react";
import Frame32 from "/public/images/Frame 32.png";
import Image from "next/image";
import Delete from "@/icon/Delete";

export default function Cartsection() {
  return (
    <div className="font-satoshi">
      <MainLayout>
        <div className="mx-4 md:mx-10 mb-20">
          {/* Breadcrumb */}
          <div className="flex gap-3 text-sm md:text-base">
            <div>Home</div>
            <div>Cart</div>
          </div>

          {/* Title */}
          <div className="pt-5">
            <div className="font-integral text-xl font-black md:text-3xl">
              YOUR CART
            </div>
          </div>

          {/* Cart Layout */}
          <div className="flex flex-col md:flex-row gap-5 justify-between">
            {/* Left Side: Cart Items */}
            <div className="border-2 w-full md:w-3/5 mt-5 rounded-2xl">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex border-b-2 justify-between p-4">
                  <div className="flex gap-4">
                    <Image
                      src={Frame32}
                      alt="cloth"
                      width={80}
                      height={80}
                      className="rounded-2xl w-[80px] md:w-[100px]"
                    />
                    <div className="text-sm md:text-base">
                      <div className="font-semibold">
                        Gradient Graphic T-Shirt
                      </div>
                      <div className="pt-16 text-lg font-semibold">$145</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end md:items-start">
                    <div className="text-red-500 cursor-pointer">
                      <Delete />
                    </div>
                    <div className="flex gap-3 mt-16 rounded-2xl px-5 py-1 bg-gray-200">
                      <div className="cursor-pointer">-</div>
                      <div>1</div>
                      <div className="cursor-pointer">+</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side: Order Summary */}
            <div className="w-full md:w-2/5">
              <div className="font-satoshi border-2 mt-5 rounded-2xl p-4">
                <div className="font-semibold">Order Summary</div>
                <div className="border-b-2 py-3 ">
                  <div className="flex justify-between text-sm md:text-base">
                    <div className="font-light">Subtotal</div>
                    <div className="font-bold">$565</div>
                  </div>
                  <div className="flex pt-4 justify-between text-sm md:text-base">
                    <div className="font-light">Discount (-20%)</div>
                    <div className="text-red-600 font-bold">-$113</div>
                  </div>
                  <div className="flex pt-4 justify-between text-sm md:text-base">
                    <div className="font-light">Delivery Fee</div>
                    <div className="font-bold">$15</div>
                  </div>
                </div>

                {/* Total */}
                <div className="flex p-4 justify-between text-lg md:text-2xl">
                  <div className="font-light">Total</div>
                  <div className="font-bold">$467</div>
                </div>

                {/* Promo Code */}
                <div className="flex p-4 gap-2 justify-between">
                  <input
                    type="text"
                    placeholder="Add promo code"
                    className="w-2/3 rounded-3xl px-3 py-2 bg-gray-200 text-sm md:text-base"
                  />
                  <button className="w-1/3 rounded-3xl px-4 py-2 text-white bg-black text-sm md:text-base">
                    Apply
                  </button>
                </div>

                {/* Checkout Button */}
                <div className="p-2 md:p-4">
                  <button className="w-full rounded-3xl px-4 py-3 text-white bg-black text-sm md:text-base">
                    Go to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
