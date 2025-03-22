import Cart from "@/icon/Cart";
import Drop from "@/icon/Drop";
import Person from "@/icon/Person";
import Search from "@/icon/Search";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react"; // Mobile menu icons
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch Products from DummyJSON API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Search Functionality
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setQuery(searchValue);

    if (searchValue === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchValue)
      );
      setFilteredProducts(filtered);
    }
  };

  // Toggle dropdown when clicking the button
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="flex font-satoshi py-4 px-6 md:px-8 items-center justify-between bg-white relative">
      <div className="flex gap-5">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        {/* Logo */}
        <div className="font-integral text-2xl md:text-3xl">SHOP.CO</div>
      </div>

      {/* Navigation Links */}
      <div
        className={`absolute md:static top-16 left-0 w-full md:w-auto max-md:bg-gray-300 md:flex gap-8 p-6 md:p-0 shadow-md md:shadow-none transition-all duration-300 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-6 text-lg md:text-base">
          <a href="/">
            <div>Home</div>
          </a>
          <div className="relative group inline-block">
            {/* Dropdown Button */}
            <div onClick={toggleDropdown} className="flex items-center gap-2">
              <button className="transition">Shop</button>
              <Drop />
            </div>

            {/* Dropdown Content */}
            {isOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-gray-100 rounded-md shadow-lg">
                <a
                  href="/electronics"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Electronics
                </a>
                <a
                  href="/mensclothing"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Men's Clothing
                </a>
                <a
                  href="/womensclothing"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Women's Clothing
                </a>
                <a
                  href="/jewelries"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Jewelries
                </a>
              </div>
            )}
          </div>
          <a href="/onsale">On Sale</a>
          <div>New Arrivals</div>
          <div>Brands</div>
        </div>
      </div>

      {/* Search Bar (Full for Desktop, Toggles on Mobile) */}
      <div className="hidden md:flex bg-gray-100 gap-4 w-full md:w-1/3 h-12 px-4 py-3 rounded-3xl relative">
        <Search />
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={handleSearch}
          className="text-base bg-gray-100 border-none outline-none w-full"
        />

        {/* Search Results Dropdown */}
        {filteredProducts.length > 0 && (
          <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
              >
                {product.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Icons Section */}
      <div className="flex gap-4">
        {/* Search Icon (Opens Input on Mobile) */}
        <button
          className="md:hidden"
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label="Toggle search"
        >
          <Search className="w-6 h-6" />
        </button>
        <a href="/cart">
          <Cart />
        </a>
        <Person />
      </div>

      {/* Mobile Search Input (Only Visible When Search is Open) */}
      {searchOpen && (
        <div className="absolute top-16 left-0 w-full p-4 bg-white shadow-md flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={handleSearch}
            className="text-base border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          {/* Close Search Button */}
          <button
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
