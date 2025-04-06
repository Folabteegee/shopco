import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";
import Dot from "@/icon/Dot";
import Tick from "@/icon/Tick";
import Delete from "@/icon/Delete";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [customReviews, setCustomReviews] = useState([]);
  const [formData, setFormData] = useState({
    reviewerName: "",
    rating: "",
    comment: "",
    date: new Date().toLocaleDateString(),
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`https://dummyjson.com/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  const toggleFAQ = () => setShowFAQ(!showFAQ);
  const toggleReviewForm = () => setShowReviewForm(!showReviewForm);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!formData.reviewerName || !formData.rating || !formData.comment) {
      alert("Please fill in all fields.");
      return;
    }
    setCustomReviews((prev) => [
      ...prev,
      { ...formData, isCustom: true, id: Date.now() }, // Add isCustom flag
    ]);
    setFormData({
      reviewerName: "",
      rating: "",
      comment: "",
      date: new Date().toLocaleDateString(),
    });
    setShowReviewForm(false);
  };

  const deleteReview = (reviewId) => {
    setCustomReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== reviewId)
    );
  };

  const allReviews = product?.reviews
    ? [...product.reviews.slice(0, 2), ...customReviews]
    : customReviews;

  if (!product) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black"></div>
        </div>
      </MainLayout>
    );
  }

  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <MainLayout>
      <div className="container mt-16 font-satoshi mx-auto px-7 pb-10">
        {/* Breadcrumb */}
        <div className="flex pl-2 font-semibold pt-6 gap-3">
          <div className="flex items-center gap-1">
            <div>Home</div> <div> &gt; </div>
          </div>
          <div className="flex items-center gap-1">
            <div>Shop</div> <div> &gt; </div>
          </div>
          <div className="flex items-center gap-1">
            <div>{product.category}</div> <div> &gt; </div>
          </div>
          <div>{product.title}</div>
        </div>

        {/* Product Display */}
        <div className="flex justify-evenly items-center gap-6 max-md:flex-col">
          <div className="pt-8">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={444}
              height={530}
              className="rounded-[20px] border-[1px] border-gray-300"
            />
          </div>

          <div className="pt-6">
            <h1 className="font-integral font-bold text-[40px] max-sm:text-[30px]">
              {product.title}
            </h1>
            <div className="flex gap-4 items-center pt-4 font-satoshi text-[16px]">
              ⭐ {product.rating} / 5
            </div>

            <div className="flex mt-4 items-center font-satoshi gap-3">
              <div className="text-[32px] font-bold">${discountedPrice}</div>

              <>
                <div className="text-[32px] font-bold text-gray-300">
                  <del>${product.price}</del>
                </div>
                <div className="bg-green-200 rounded-[62px] py-[6px] px-[14px] text-green-600">
                  -{product.discountPercentage}%
                </div>
              </>
            </div>

            <div className="border-b-[1px] border-gray-300 pb-4 pt-4 font-satoshi text-gray-600">
              {product.description}
            </div>

            <div className="pt-4 flex justify-around max-md:justify-around">
              <button
                onClick={addToCart}
                className="hover:cursor-pointer items-center bg-black w-60 h-12 rounded-3xl text-white font-satoshi"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Reviews & FAQs Header */}
        <div className="mt-12 font-satoshi border-b-[1px] border-gray-300 pb-4 text-gray-400 flex justify-around">
          <div className="text-black">Ratings & Reviews</div>
          <div onClick={toggleFAQ} className="cursor-pointer hover:underline">
            FAQs
          </div>
        </div>

        {showFAQ && (
          <div className="bg-gray-100 p-6 rounded-lg mt-4 text-sm font-satoshi">
            <h2 className="font-bold text-lg pb-2">
              Frequently Asked Questions
            </h2>
            <p className="pb-2">
              <strong>Q:</strong> How long does delivery take? <br />
              <strong>A:</strong> Standard delivery takes 3-5 business days.
            </p>
            <p className="pb-2">
              <strong>Q:</strong> Can I return the product? <br />
              <strong>A:</strong> Yes, within 14 days of purchase.
            </p>
            <p className="pb-2">
              <strong>Q:</strong> Do you ship internationally? <br />
              <strong>A:</strong> Yes, we ship to over 50 countries.
            </p>
          </div>
        )}

        {/* Write a Review Button */}
        <div className="flex justify-between px-8 mt-4">
          <div className="flex gap-1 font-satoshi items-center">
            <div className="text-lg font-bold">All Reviews</div>
            <div className="text-xs text-gray-400 pt-1">
              ({allReviews.length})
            </div>
          </div>

          <div className="flex gap-4 max-md:pt-4">
            <div
              onClick={toggleReviewForm}
              className="cursor-pointer bg-black text-white rounded-[62px] w-[166px] h-[40px] pt-2 text-center"
            >
              Write a Review
            </div>
          </div>
        </div>

        {showReviewForm && (
          <form
            onSubmit={submitReview}
            className="bg-gray-100 mt-6 p-6 rounded-xl w-[90%] max-w-xl mx-auto"
          >
            <h2 className="text-lg font-semibold pb-2">Leave your review</h2>
            <input
              type="text"
              name="reviewerName"
              placeholder="Your name"
              value={formData.reviewerName}
              onChange={handleChange}
              className="block w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="rating"
              placeholder="Rating (1-5)"
              value={formData.rating}
              onChange={handleChange}
              className="block w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <textarea
              name="comment"
              placeholder="Your comment"
              value={formData.comment}
              onChange={handleChange}
              className="block w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-full"
            >
              Submit Review
            </button>
          </form>
        )}

        {/* Display All Reviews */}
        <div className="flex flex-wrap justify-center gap-6 pt-8">
          {allReviews.map((review, idx) => (
            <div
              key={idx}
              className="rounded-[20px] border-gray-200 border-[2px] w-[300px] h-[200px] px-[20px] py-[20px] max-md:w-[90%]"
            >
              <div className="flex justify-between">
                <div>⭐{review.rating}/5</div>
              </div>
              <div className="flex gap-2 pt-2 items-center">
                <div className="text-[15px] font-bold">
                  {review.reviewerName}
                </div>
                <Tick />
              </div>
              <div className="pt-3 text-xs">
                <div>Hi, I'm {review.reviewerName}</div>
                <div>{review.comment}</div>
              </div>
              <div className="pt-4 text-xs">{review.date}</div>

              {/* Show delete button only for custom reviews */}
              {review.isCustom && (
                <button
                  onClick={() => deleteReview(review.id)}
                  className="mt-2 text-red-500 text-sm"
                >
                  <Delete />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetails;
