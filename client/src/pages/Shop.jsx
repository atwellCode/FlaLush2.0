// Shop.jsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { products } from "../productData";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const all = products.map((p) => p.category);
    return ["All", ...new Set(all)];
  }, []);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
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
      default:
        // "featured" – keep original order
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const handleShopClick = (product) => {
    // Navigate to product detail
    console.log("Navigate to:", `/product/${product.id}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Our Collection
          </h1>
          <p className="mt-2 text-gray-500 font-light">
            Discover luxury skincare essentials crafted for your natural glow.
          </p>
        </motion.div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-rose-200/50 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all"
            />
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-rose-200/50 rounded-full text-gray-700"
          >
            <FaFilter />
            Filters
          </button>

          {/* Sort & Category (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-rose-200/50 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-rose-200/50 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Mobile Filters (Expandable) */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden mb-6"
            >
              <div className="flex flex-col gap-4 p-4 bg-white/70 backdrop-blur-sm border border-rose-200/50 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Filters</span>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-white border border-rose-200/50 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border border-rose-200/50 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Count */}
        <p className="text-sm text-gray-400 mb-6">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 && "s"}
        </p>

        {/* Product Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onShopClick={handleShopClick}
            />
          ))}
        </motion.div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSortBy("featured");
              }}
              className="mt-4 px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Shop;