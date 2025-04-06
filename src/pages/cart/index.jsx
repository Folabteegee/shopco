import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";
import Delete from "@/icon/Delete";
import { useRouter } from "next/router"; // Importing useRouter

export default function Cartsection() {
  const [cart, setCart] = useState([]);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (id, amount) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate the subtotal, total discount, and the total price
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalDiscount = cart.reduce(
    (acc, item) =>
      acc + ((item.price * item.discountPercentage) / 100) * item.quantity,
    0
  );

  const discount = totalDiscount; // total discount applied to all items in the cart
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  // Calculate the average discount percentage across all products
  const averageDiscountPercentage =
    cart.length > 0
      ? (
          cart.reduce(
            (acc, item) => acc + item.discountPercentage * item.quantity,
            0
          ) / subtotal
        ).toFixed(2)
      : 0;

  return (
    <MainLayout>
      <div className="mx-4 mt-16 md:mx-10 font-satoshi mb-20">
        {/* Breadcrumb */}
        <div className="flex font-semibold p-6 gap-3 text-sm md:text-base">
          <div>Home</div>
          <div> &gt;</div>
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
            {cart.length === 0 ? (
              <div className="p-5 text-center">Your cart is empty.</div>
            ) : (
              cart.map((item) => {
                const discountedPrice = (
                  item.price *
                  (1 - item.discountPercentage / 100)
                ).toFixed(2);

                return (
                  <div
                    key={item.id}
                    className="flex border-b-2 justify-between p-4"
                  >
                    <div className="flex gap-4">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={150}
                        height={150}
                        className="rounded-2xl"
                      />
                      <div className="text-sm md:text-base">
                        <div className="font-semibold">{item.title}</div>
                        <div className="text-lg line-through text-gray-500 pt-5 font-bold">
                          {" "}
                          ${item.price}
                        </div>
                        <div className="pt-16 text-3xl font-semibold">
                          ${discountedPrice}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end md:items-start">
                      <div
                        className="text-red-500 cursor-pointer"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Delete />
                      </div>
                      <div className="flex gap-3 mt-16 rounded-2xl px-5 py-1 bg-gray-200">
                        <div
                          className="cursor-pointer"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          -
                        </div>
                        <div>{item.quantity}</div>
                        <div
                          className="cursor-pointer"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Order Summary */}
          <div className="w-full md:w-2/5 border-2 mt-5 rounded-2xl p-4">
            <div className="font-semibold text-2xl">Order Summary</div>
            <div className="py-3">
              <div className="border-b-2 p-4">
                <div className="flex justify-between">
                  <div>Subtotal</div>
                  <div>${subtotal.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div>Discount ({averageDiscountPercentage}%)</div>
                  <div className="text-red-600">-${discount.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div>Delivery Fee</div>
                  <div>${deliveryFee}</div>
                </div>
              </div>
              <div className="flex justify-between text-3xl p-4 font-bold">
                <div>Total</div>
                <div>${total.toFixed(2)}</div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="p-2 md:p-4">
              <button
                onClick={() => router.push("/checkout")} // Navigate to the checkout page
                className="w-full rounded-3xl px-4 py-3 text-white bg-black text-sm md:text-base"
              >
                Go to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
