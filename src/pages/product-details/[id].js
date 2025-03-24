import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";
import Dot from "@/icon/Dot";
import Drop from "@/icon/Drop";
import Fourplusstars from "@/icon/Fourplusstars";
import Sign from "@/icon/Sign";
import Tick from "@/icon/Tick";
// import Reviewsection from "@/components/Reviewsection";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://dummyjson.com/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id]);

  if (!product) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen text-2xl">
          Loading...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container font-satoshi mx-auto px-7 pb-10">
        {/* Breadcrumb */}
        <div className="flex pl-2 pt-6 gap-5">
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
              <div className="text-[32px] font-bold">${product.price}</div>
              {product.discountPercentage && (
                <>
                  <div className="text-[32px] font-bold text-gray-300">
                    <del>
                      $
                      {(
                        product.price /
                        (1 - product.discountPercentage / 100)
                      ).toFixed(2)}
                    </del>
                  </div>
                  <div className="bg-green-200 rounded-[62px] py-[6px] px-[14px] text-green-600">
                    -{product.discountPercentage}%
                  </div>
                </>
              )}
            </div>

            <div className="border-b-[1px] border-gray-300 pb-4 pt-4 font-satoshi text-gray-600">
              {product.description}
            </div>

            <div className="pt-4 flex justify-around max-md:justify-around">
              <div className="bg-gray-200 flex justify-around items-center w-[170px] h-[52px] rounded-3xl">
                <button>-</button>
                <div>1</div>
                <button>+</button>
              </div>

              <button className="hover:cursor-pointer items-center bg-black w-60 h-12 rounded-3xl text-white font-satoshi">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}

        <div className="">
          <div className="mt-12 font-satoshi border-b-[1px] border-gray-300 pb-4 text-gray-400 flex justify-around">
            <div>Product Details</div>
            <div className="text-black">Ratings & Reviews</div>
            <div>FAQs</div>
          </div>

          <div className="flex justify-between max-md:flex-col px-8 mt-4">
            <div className="flex gap-1 font-satoshi items-center">
              <div className="text-lg font-bold">All Reviews</div>
              <div className="text-xs text-gray-400 pt-1">(451)</div>
            </div>

            <div className="flex gap-4">
              <div className="bg-gray-200 rounded-3xl w-[40px] h-[40px] items-center text-center px-[10px] py-[8px]">
                <Sign />
              </div>

              <div className="flex gap-4 bg-gray-200 rounded-[62px] w-[120px] h-[40px] items-center text-center justify-around">
                <div>Latest</div>
                <div>
                  <Drop />
                </div>
              </div>

              <div className="bg-black text-white rounded-[62px] w-[166px] h-[40px] pt-2 text-center justify-around">
                Write a Review
              </div>
            </div>
          </div>

          <div className="flex max-md:flex-col max-md:w-full gap-5 pt-8 justify-between">
            <div className="rounded-[20px] border-gray-200 border-[2px] w-[610px] h-[200px] px-[32px] py-[28px] max-md:w-[400px] ">
              <div className="flex justify-between max-md:justify-between">
                <div className="">⭐{product.reviews[0].rating}/5</div>
                <div className="">
                  <Dot />
                </div>
              </div>
              <div className="flex gap-2 pt-2 items-center">
                <div className="text-[15px] font-bold">
                  {product.reviews[0].reviewerName}
                </div>
                <div className="">
                  <Tick />
                </div>
              </div>

              <div className="pt-3 text-xs">
                <div>Hi, I'm {product.reviews[0].reviewerName}</div>
                <div> {product.reviews[0].comment}</div>
              </div>
              <div className="pt-8 text-xs">{product.reviews[0].date}</div>
            </div>

            <div className="rounded-[20px] border-gray-200 border-[2px] w-[610px] h-[200px] px-[32px] py-[28px] max-md:w-[400px] ">
              <div className="flex justify-between max-md:justify-between">
                <div className="">⭐{product.reviews[1].rating}/5</div>
                <div className="">
                  <Dot />
                </div>
              </div>
              <div className="flex gap-2 pt-2 items-center">
                <div className="text-[15px] font-bold">
                  {product.reviews[1].reviewerName}
                </div>
                <div className="">
                  <Tick />
                </div>
              </div>

              <div className="pt-3 text-xs">
                <div>Hi, this is {product.reviews[1].reviewerName}</div>
                <div> {product.reviews[1].comment}</div>
              </div>
              <div className="pt-8 text-xs">{product.reviews[1].date}</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetails;
