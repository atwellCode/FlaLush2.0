// FeaturedCollections.jsx
import { motion } from "framer-motion";
import { FaLeaf, FaShoppingBag } from "react-icons/fa";
import { products } from "../data/data.js";   // your data file
import ProductCard from "./ProductCard";

const FeaturedCollections = () => {
  // You can slice to show only a few, or show all:
  const featuredProducts = products.slice(0, 4); // all 20 (or use .slice(0,4) for a selection)

  const handleShopClick = (product) => {
    console.log("Shop clicked:", product);
    // Navigate to detail page: navigate(`/product/${product.id}`)
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-white via-rose-50/30 to-white overflow-hidden">
      {/* decorative orbs (same as before) */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-rose-200/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-pink-200/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-rose-100/60 backdrop-blur-sm px-5 py-2 rounded-full text-rose-600 text-sm font-medium mb-4"
          >
            <FaLeaf />
            <span>Curated for Radiance</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Luxury Collections</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg font-light">
            Discover our most coveted skincare essentials.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onShopClick={handleShopClick}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-full border-2 border-rose-200 text-rose-600 font-medium hover:bg-rose-50 hover:border-rose-400 transition-all duration-300 inline-flex items-center gap-3"
          >
            View All Products
            <FaShoppingBag className="text-sm" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCollections;