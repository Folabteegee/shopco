import Visa from "@/icons/visa";
import Mastercard from "@/icons/mastercard";
import Paypal from "@/icons/paypal";
import Pay from "@/icons/pay";
import Gpay from "@/icons/gpay";
import Link from "next/link";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="p-20 max-md:p-10 flex flex-col md:flex-row items-center justify-between bg-gray-100">
      <div>
        <div className="font-integral  max-md:text-center text-3xl px-4 font-bold  md:text-3xl">
          SHOP.CO
        </div>
        <div className=" text-gray-500 font-satoshi p-4">
          We have clothes that suits your style and which <br />
          you're proud to wear. From women to men
        </div>
      </div>
      {/* Copyright Text */}
      <div className="font-satoshi text-gray-500 text-center md:text-left mb-3 md:mb-0">
        Shop.co &copy; 2000-{currentYear}, All Rights Reserved.
        <br />{" "}
        <p className="">
          Built by{" "}
          <Link
            href="https://www.linkedin.com/in/taiwo-afolabi-b5b827227"
            className="text-black underline hover:text-blue-400"
          >
            Taiwo Afolabi{" "}
          </Link>{" "}
          and{" "}
          <Link
            href="https://www.linkedin.com/in/kehinde-afolabi-3bab072b2"
            className="text-black underline hover:text-blue-400"
          >
            Kehinde Afolabi.{" "}
          </Link>
          <br />
        </p>
      </div>

      {/* Payment Icons */}
      <div className="flex flex-wrap justify-center md:justify-end gap-2">
        <div className="p-2 bg-white rounded-md">
          <Visa />
        </div>
        <div className="p-2 bg-white rounded-md">
          <Mastercard />
        </div>
        <div className="p-2 bg-white rounded-md">
          <Paypal />
        </div>
        <div className="p-2 bg-white rounded-md">
          <Pay />
        </div>
        <div className="p-2 bg-white rounded-md">
          <Gpay />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
