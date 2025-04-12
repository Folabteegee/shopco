import Cart from "@/icon/Cart";
import Drop from "@/icon/Drop";
import Person from "@/icon/Person";
import Search from "@/icon/Search";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch all products from DummyJSON API (pagination handled)
  useEffect(() => {
    const fetchAllProducts = async () => {
      let allProducts = [];
      let skip = 0;
      let limit = 30;
      let hasMore = true;

      while (hasMore) {
        try {
          const res = await fetch(
            `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
          );
          const data = await res.json();
          allProducts = [...allProducts, ...data.products];
          skip += limit;
          hasMore = data.products.length > 0;
        } catch (error) {
          console.error("Error fetching products:", error);
          break;
        }
      }
      setProducts(allProducts);
    };
    fetchAllProducts();
  }, []);

  // Search Functionality
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setQuery(searchValue);
    if (searchValue === "") {
      setFilteredProducts([]);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(searchValue)
        )
      );
    }
  };

  // Navigate to product details page
  const handleProductClick = (id) => {
    setQuery("");
    setFilteredProducts([]);
    router.push(`/product-details/${id}`);
  };

  return (
    <div className="flex font-satoshi shadow-lg fixed top-0 left-0 w-full z-10 px-9 py-7 items-center justify-between bg-white">
      <div className="flex gap-2">
        <button
          className="md:hidden pt-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
        <div className="font-integral text-3xl font-bold  md:text-3xl">
          SHOP.CO
        </div>
      </div>

      <div
        className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:flex gap-8 p-6 md:p-0 shadow-md md:shadow-none transition-all ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-6 text-lg md:text-base">
          <Link href="/">Home</Link>
          <div className="relative group inline-block">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <button>Shop</button>
              <Drop />
            </div>
            {isOpen && (
              <div className="absolute left-0 mt-2 w-60 bg-gray-100 rounded-md shadow-lg">
                <Link
                  href="/electronics"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Electronics
                </Link>
                <Link
                  href="/mensclothing"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Men's Clothing
                </Link>
                <Link
                  href="/womensclothing"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Women's Clothing
                </Link>
                <Link
                  href="/jewelries"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Jewelry
                </Link>
              </div>
            )}
          </div>
          <Link href="/onsale">On Sale</Link>
          <Link href="/newarrivals">New Arrivals</Link>
          <Link href="/Brandspage">Brands</Link>
        </div>
      </div>

      <div className="hidden md:flex bg-gray-100 gap-4 w-1/3 h-12 px-4 py-3 rounded-3xl relative">
        <Search />
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={handleSearch}
          className="bg-gray-100 border-none outline-none w-full"
        />
        {filteredProducts.length > 0 && (
          <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {product.title}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          className="md:hidden"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <Search className="w-6 h-6" />
        </button>
        <div className="gap-0">
          <Link
            className="font-integral  p-1 shadow-2xl rounded-lg text-xs transition-all duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white"
            href="/login"
          >
            Login
          </Link>

          <Link
            className="font-integral  p-1 shadow-2xl text-xs rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white"
            href="/signup"
          >
            Signup
          </Link>
        </div>

        <Link href="/cart">
          <Cart />
        </Link>
        <a href="profile">
          <Person />
        </a>
      </div>

      {searchOpen && (
        <div className="absolute top-16 left-0 w-full p-4 bg-white shadow-md flex flex-col gap-3 items-center">
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          {filteredProducts.length > 0 && (
            <div className="w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {product.title}
                </button>
              ))}
            </div>
          )}
          <button onClick={() => setSearchOpen(false)}>
            <X size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
