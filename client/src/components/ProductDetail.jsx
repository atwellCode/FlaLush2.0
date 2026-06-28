// src/pages/ProductDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaLeaf,
  FaShoppingBag,
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { products } from "../data/data";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  const [selectedImage, setSelectedImage] = useState(product?.image || "");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Find related products (same category, exclude current)
  useEffect(() => {
    if (product) {
      const related = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [product]);

  // ⚡ RESET STATE WHEN PRODUCT CHANGES ⚡
  useEffect(() => {
    if (product) {
      const firstImage = product.image || (product.images && product.images[0]) || "";
      setSelectedImage(firstImage);
      setQuantity(1);
      setActiveTab("description");
      setShowAddedMessage(false);
      // If you want to keep wishlist per product, you'd need a different approach
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }

  const {
    name,
    category,
    price,
    oldPrice,
    rating,
    images,
    description,
    ingredients,
    howToUse,
    reviews,
    inStock,
    badge,
    shortDescription,
  } = product;

  const imageList = images && images.length > 0 ? images : [product.image];

  const handleAddToCart = () => {
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
    console.log(`Added ${quantity} x ${name} to cart`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Check out ${name} on FluLush!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose prose-rose max-w-none">
            <p className="text-gray-600 leading-relaxed">{description}</p>
            {shortDescription && (
              <p className="text-sm text-gray-400 mt-2 italic">{shortDescription}</p>
            )}
          </div>
        );
      case "ingredients":
        return (
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {ingredients?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      case "how-to-use":
        return <p className="text-gray-600">{howToUse}</p>;
      case "reviews":
        return (
          <div>
            {reviews && reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review, idx) => (
                  <div key={idx} className="border-b border-rose-100 pb-4 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">{review.name}</span>
                      <div className="flex text-yellow-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-1">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No reviews yet. Be the first to review!</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50"
    >
      {/* Mobile sticky cart (same as before) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-rose-200/30 p-4 z-40 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <span className="text-lg font-bold text-gray-900">${price}</span>
            {oldPrice && <span className="ml-2 text-sm text-gray-400 line-through">${oldPrice}</span>}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaShoppingBag />
            <span>{inStock ? "Add to Bag" : "Out of Stock"}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24 lg:pb-8">
        {/* Breadcrumb & Back (unchanged) */}
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-rose-500 transition">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-rose-500 transition">Shop</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">{name}</span>
        </nav>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-600 transition-colors mb-6 group"
        >
          <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg border border-rose-100/30">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  src={selectedImage}
                  alt={name}
                  className="w-full h-auto object-cover aspect-square"
                />
              </AnimatePresence>
              {badge && (
                <div className="absolute top-4 left-4 bg-rose-500/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                  {badge}
                </div>
              )}
              {!inStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl tracking-widest">OUT OF STOCK</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {imageList.map((img, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImage === img
                      ? "border-rose-500 shadow-lg"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`${name} thumbnail ${idx+1}`} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info (unchanged) */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-rose-500 font-medium">
              <FaLeaf className="text-xs" />
              <span>{category}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{name}</h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <span className="text-sm text-gray-500">({rating} ★)</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-500">{reviews?.length || 0} reviews</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">${price}</span>
              {oldPrice && (
                <span className="text-lg text-gray-400 line-through">${oldPrice}</span>
              )}
              {oldPrice && (
                <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">
                  Save ${oldPrice - price}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
              {inStock && (
                <span className="text-sm text-gray-400">Free shipping on orders over $50</span>
              )}
            </div>

            {/* Quick actions */}
            <div className="flex items-center gap-4">
              <button onClick={handleWishlist} className="flex items-center gap-2 text-gray-500 hover:text-rose-500 transition">
                {isWishlisted ? <FaHeart className="text-rose-500" /> : <FaRegHeart />}
                <span className="text-sm">{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
              </button>
              <button onClick={handleShare} className="flex items-center gap-2 text-gray-500 hover:text-rose-500 transition">
                <FaShareAlt />
                <span className="text-sm">Share</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-rose-200/30">
              <div className="flex gap-6 overflow-x-auto">
                {["description", "ingredients", "how-to-use", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 text-sm font-medium transition relative ${
                      activeTab === tab ? "text-rose-500" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab === "description" && "Description"}
                    {tab === "ingredients" && "Ingredients"}
                    {tab === "how-to-use" && "How to Use"}
                    {tab === "reviews" && `Reviews (${reviews?.length || 0})`}
                    {activeTab === tab && (
                      <motion.span layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="py-2 min-h-[120px]">{renderTabContent()}</div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-rose-200/30">
              <div className="flex items-center border border-rose-200 rounded-full overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-rose-500 hover:bg-rose-50 transition">-</button>
                <span className="px-4 py-2 text-gray-700 min-w-[40px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-rose-500 hover:bg-rose-50 transition">+</button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaShoppingBag />
                <span>{inStock ? "Add to Bag" : "Out of Stock"}</span>
              </button>

              {showAddedMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full"
                >
                  <FaCheckCircle />
                  <span className="text-sm">Added to bag!</span>
                </motion.div>
              )}
            </div>

            <div className="text-sm text-gray-400 flex items-center gap-4">
              <span>🚚 Free delivery on orders over $50</span>
              <span>•</span>
              <span>🔄 30-day returns</span>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800 font-['Cormorant']">You May Also Like</h2>
              <Link to="/products" className="text-rose-500 text-sm hover:text-rose-600 transition flex items-center gap-1">
                View All <FaArrowLeft className="rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onShopClick={() => navigate(`/product/${product.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetail;