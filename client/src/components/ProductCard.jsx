// ProductCard.jsx
import { motion } from "framer-motion";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const {
    id,
    name,
    category,
    price,
    oldPrice,
    rating,
    image,
    shortDescription,
    badge,
    inStock,
  } = product;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
      },
    },
  };

  // Navigate to product detail page
  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -12,
        scale: 1.02,
        transition: { type: "spring", stiffness: 200 },
      }}
      onClick={handleCardClick}
      className="group relative bg-white rounded-3xl shadow-lg overflow-hidden border border-rose-100/50 hover:shadow-2xl hover:shadow-rose-200/30 transition-all duration-500 cursor-pointer flex flex-col h-[420px]"
    >
      {/* Image Container - fixed height */}
      <motion.div
        className="relative h-56 overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50 flex-shrink-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/20 to-pink-100/20 group-hover:opacity-30 transition-opacity" />

        {/* Rating badge */}
        {rating && (
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-md rounded-full px-3 py-1 text-xs font-semibold text-rose-500 shadow-sm flex items-center gap-1"
          >
            <FaStar className="text-yellow-400 text-[10px]" />
            {rating}
          </motion.div>
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 bg-rose-500/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
            {badge}
          </div>
        )}

        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-lg tracking-widest">OUT OF STOCK</span>
          </div>
        )}
      </motion.div>

      {/* Content - fixed height with flex-grow */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <span className="text-xs text-rose-400 font-medium tracking-wider uppercase">
              {category}
            </span>
            <h3 className="text-lg font-bold text-gray-800 mt-0.5 group-hover:text-rose-500 transition-colors truncate">
              {name}
            </h3>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <span className="text-lg font-semibold text-gray-900">${price}</span>
            {oldPrice && (
              <span className="ml-1 text-xs text-gray-400 line-through block">${oldPrice}</span>
            )}
          </div>
        </div>

        {/* Description with line clamp */}
        <p className="mt-2 text-sm text-gray-500 font-light leading-relaxed line-clamp-2 flex-1">
          {shortDescription}
        </p>

        {/* Button stays at bottom */}
        <motion.button
          whileHover={{ scale: 1.05, x: 4 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation(); // prevent card click from firing twice
            handleCardClick();
          }}
          disabled={!inStock}
          className={`mt-4 w-full py-2.5 rounded-full font-medium flex items-center justify-center gap-2 shadow-md transition-all text-sm ${
            inStock
              ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-500/20 hover:shadow-rose-500/40"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <span>{inStock ? "Shop Now" : "Unavailable"}</span>
          {inStock && <FaArrowRight className="text-xs" />}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;