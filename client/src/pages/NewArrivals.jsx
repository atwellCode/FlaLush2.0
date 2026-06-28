// src/pages/NewArrivals.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaLeaf } from "react-icons/fa";
import { products } from "../data/data";
import ProductCard from "../components/ProductCard";

const NewArrivals = () => {
  // Filter products that have the "New" badge
  const newProducts = products.filter((product) => product.badge === "New");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* ===== HERO BANNER ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 text-white py-20 px-6">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            >
              <span className="text-yellow-300">✨</span>
              <span>Fresh from the lab</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              New Arrivals
            </h1>
            <p className="mt-4 text-lg text-rose-100 max-w-lg">
              Discover the latest additions to our collection – crafted with love, science, and the finest natural ingredients.
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-8">
              <span className="flex items-center gap-2 text-sm text-rose-200">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                {newProducts.length} new products
              </span>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-2.5 rounded-full text-sm font-medium transition border border-white/20"
              >
                Shop All <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="flex-shrink-0"
          >
            <div className="relative w-40 h-40 md:w-56 md:h-56 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
              <span className="text-5xl md:text-7xl font-bold">✨</span>
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-rose-800 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                NEW
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 text-5xl opacity-20 pointer-events-none"
        >
          <FaLeaf />
        </motion.div>
      </section>

      {/* ===== PRODUCT GRID ===== */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {newProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">No new products at the moment. Check back soon!</p>
            <Link
              to="/products"
              className="mt-6 inline-block px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition"
            >
              Explore All Products
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Fresh Picks</h2>
                <p className="text-sm text-gray-400 mt-1">
                  {newProducts.length} new product{newProducts.length > 1 && "s"} just landed
                </p>
              </div>
              <Link
                to="/products"
                className="text-rose-500 hover:text-rose-600 text-sm flex items-center gap-1 transition"
              >
                View All Products <FaArrowRight className="text-xs" />
              </Link>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {newProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;