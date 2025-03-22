import Visa from "@/icons/visa";
import Mastercard from "@/icons/mastercard";
import Paypal from "@/icons/paypal";
import Pay from "@/icons/pay";
import Gpay from "@/icons/gpay";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-5 py-5 flex flex-col md:flex-row items-center justify-between bg-gray-100">
      {/* Copyright Text */}
      <div className="font-satoshi text-gray-500 text-center md:text-left mb-3 md:mb-0">
        Shop.co &copy; 2000-{currentYear}, All Rights Reserved
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
