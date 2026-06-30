// src/components/Navbar.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useCart } from "../context/CartContext";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const { getCartCount } = useCart();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close search/dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
        setDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-rose-600/95 to-rose-700/95 backdrop-blur-xl shadow-2xl"
          : "bg-gradient-to-r from-rose-600 to-rose-700 shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink
            to="/"
            className="relative text-3xl font-extrabold tracking-wide text-white font-['Cormorant'] group"
          >
            <span className="relative z-10">
              Flu<span className="text-rose-100">Lush</span>
            </span>
            <motion.span
              className="absolute -inset-2 rounded-full bg-rose-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-['Manrope']">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative font-medium text-white transition-colors duration-300 ${
                    isActive ? "text-rose-100" : "hover:text-rose-100"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 bg-rose-200 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? "100%" : "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    {!isActive && (
                      <motion.span
                        className="absolute -bottom-1 left-0 h-0.5 bg-rose-200/50 rounded-full"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-4 text-white">
            {/* Search Toggle */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-xl transition hover:text-rose-100"
                aria-label="Search"
              >
                <FaSearch />
              </button>
              <AnimatePresence>
                {searchOpen && (
                  <motion.form
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    onSubmit={handleSearchSubmit}
                    className="absolute right-0 top-full mt-3 w-72 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-rose-200/30 p-2 overflow-hidden"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-4 py-2 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
                      autoFocus
                    />
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Icon – links to /cart */}
            <NavLink
              to="/cart"
              className="relative text-xl transition hover:text-rose-100"
            >
              <FaShoppingCart />
              <motion.span
                key={getCartCount()}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-amber-300 text-[10px] font-bold text-rose-600"
              >
                {getCartCount()}
              </motion.span>
            </NavLink>

            {/* Profile Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-xl transition hover:text-rose-100"
                aria-label="User menu"
              >
                <FaUser />
                <FaChevronDown className="text-xs" />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-3 w-48 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-rose-200/30 overflow-hidden"
                  >
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-rose-50 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      to="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-rose-50 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Orders
                    </NavLink>
                    <hr className="border-rose-100" />
                    <button
                      className="block w-full text-left px-4 py-2 text-rose-500 hover:bg-rose-50 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-white md:hidden transition-transform duration-300"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-40"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-rose-600 to-rose-700 shadow-2xl md:hidden z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-rose-400/30">
                <span className="text-2xl font-bold text-white font-['Cormorant']">
                  Flu<span className="text-rose-100">Lush</span>
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl text-white hover:text-rose-100 transition"
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>
              <nav className="flex flex-col gap-4 px-6 py-8 flex-1 overflow-y-auto">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-lg font-medium transition text-white ${
                        isActive ? "text-rose-100" : "hover:text-rose-100"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                <hr className="border-rose-400/30 my-2" />
                {/* Cart link in mobile */}
                <NavLink
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-white transition hover:text-rose-100"
                >
                  <FaShoppingCart /> Cart ({getCartCount()})
                </NavLink>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-white transition hover:text-rose-100"
                >
                  <FaUser /> Login
                </NavLink>
              </nav>
              <div className="p-6 border-t border-rose-400/30">
                <p className="text-rose-200/60 text-sm">© FluLush 2025</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;