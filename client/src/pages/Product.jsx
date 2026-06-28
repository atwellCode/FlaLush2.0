// Product.jsx
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { products } from "../data/data.js";
import ProductCard from "../components/ProductCard";

const ITEMS_PER_PAGE = 9;

const Product = () => {
  // ----- Filter States -----
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [selectedRating, setSelectedRating] = useState(0); // 0 = all, 4 = 4+ stars, etc.
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // ----- Derived Data -----
  const categories = useMemo(() => {
    const cats = products.map((p) => p.category);
    return [...new Set(cats)];
  }, []);

  // ----- Filter & Sort Logic -----
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Price
    filtered = filtered.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );

    // Rating
    if (selectedRating > 0) {
      filtered = filtered.filter((p) => p.rating >= selectedRating);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // featured – keep original order
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategories, priceRange, selectedRating, sortBy]);

  // ----- Pagination -----
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, priceRange, selectedRating, sortBy]);

  // ----- Handlers -----
  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 200 });
    setSelectedRating(0);
    setSortBy("featured");
    setCurrentPage(1);
  };

  const handleShopClick = (product) => {
    // Navigate to product detail page
    console.log("Navigate to:", `/product/${product.id}`);
  };

  // ----- Render -----
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 font-['Cormorant']">
            Our Collection
          </h1>
          <p className="text-gray-500 mt-1">
            {filteredProducts.length} product{filteredProducts.length !== 1 && "s"} found
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          {/* Search */}
          <div className="relative w-full md:max-w-sm">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 shadow-sm"
            >
              <FaFilter />
              Filters
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-auto px-4 py-2 bg-white/70 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300 shadow-sm"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-rose-200/30 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-4">Filters</h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Category</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                        className="accent-rose-500"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Price Range</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: Number(e.target.value) })
                    }
                    className="w-20 px-2 py-1 border border-rose-200/50 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-rose-300"
                    min={0}
                  />
                  <span className="text-gray-400">—</span>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: Number(e.target.value) })
                    }
                    className="w-20 px-2 py-1 border border-rose-200/50 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-rose-300"
                    min={0}
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Minimum Rating</h4>
                <div className="space-y-2">
                  {[0, 4, 3, 2].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(rating)}
                        className="accent-rose-500"
                      />
                      {rating === 0 ? "All" : `${rating}+ stars`}
                      {rating > 0 && (
                        <span className="flex text-yellow-400 text-xs">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"} />
                          ))}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleClearFilters}
                className="w-full py-2 text-rose-500 border border-rose-200 rounded-xl hover:bg-rose-50 transition text-sm"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {currentProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products match your criteria.</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      onShopClick={handleShopClick}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-full bg-white/60 border border-rose-200/50 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-rose-50 transition"
                    >
                      <FaChevronLeft />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-9 h-9 rounded-full text-sm font-medium transition ${
                          currentPage === i + 1
                            ? "bg-rose-500 text-white shadow-md"
                            : "bg-white/60 text-gray-600 hover:bg-rose-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-full bg-white/60 border border-rose-200/50 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-rose-50 transition"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-2xl z-50 md:hidden p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Category</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                        className="accent-rose-500"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Price Range</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: Number(e.target.value) })
                    }
                    className="w-20 px-2 py-1 border border-rose-200/50 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-rose-300"
                    min={0}
                  />
                  <span className="text-gray-400">—</span>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: Number(e.target.value) })
                    }
                    className="w-20 px-2 py-1 border border-rose-200/50 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-rose-300"
                    min={0}
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Minimum Rating</h4>
                <div className="space-y-2">
                  {[0, 4, 3, 2].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-rating"
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(rating)}
                        className="accent-rose-500"
                      />
                      {rating === 0 ? "All" : `${rating}+ stars`}
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  handleClearFilters();
                  setShowMobileFilters(false);
                }}
                className="w-full py-2 text-rose-500 border border-rose-200 rounded-xl hover:bg-rose-50 transition text-sm"
              >
                Clear All Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Product;