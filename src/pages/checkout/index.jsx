import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [orderComplete, setOrderComplete] = useState(false); // Track order completion

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalDiscount = cart.reduce(
    (acc, item) =>
      acc + ((item.price * item.discountPercentage) / 100) * item.quantity,
    0
  );

  const discount = totalDiscount;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderComplete(true); // Set order complete when form is submitted
    localStorage.removeItem("cart"); // Clear cart after order is complete (optional)
  };

  return (
    <MainLayout>
      <div className="mx-4 md:mx-10 font-satoshi mt-28 mb-20">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <p>Please review your order and enter your shipping details.</p>

        {/* Cart Summary */}
        <div className="border-2 mt-5 rounded-2xl p-4">
          <h2 className="font-semibold text-xl">Order Summary</h2>
          <div className="py-3">
            <div className="flex justify-between">
              <div>Subtotal</div>
              <div>${subtotal.toFixed(2)}</div>
            </div>
            <div className="flex justify-between">
              <div>Discount</div>
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

        {/* Shipping Form */}
        <div className="border-2 mt-5 rounded-2xl p-4">
          <h2 className="font-semibold text-xl">Shipping Details</h2>
          {!orderComplete ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4 pt-5">
                <label className="block">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">Address</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">City</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">Postal Code</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="p-2">
                <button
                  type="submit"
                  className="w-full rounded-3xl px-4 py-3 text-white bg-black text-sm md:text-base"
                >
                  Complete Purchase
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center p-6">
              <h2 className="text-2xl font-semibold">
                Your order is complete!
              </h2>
              <p>Thank you for your purchase.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
