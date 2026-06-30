// src/pages/Cart.jsx
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import {
  FaTrashAlt,
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaArrowLeft,
  FaArrowRight,
  FaTag,
  FaTruck,
  FaLock,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { products } from "../data/data";

// Related products (for "You May Also Like" section)
const relatedProducts = products.filter((p) => p.badge === "Bestseller").slice(0, 4);

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToCart,
    getCartTotal,
  } = useCart();

  // Local state for promo and wishlist
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState({});

  // Calculate totals
  const subtotal = useMemo(() => getCartTotal(), [cartItems, getCartTotal]);

  const shipping = subtotal > 50 ? 0 : 6;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax - discount;

  // Apply promo code
  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "beauty20") {
      setDiscount(subtotal * 0.2);
      setPromoApplied(true);
    } else {
      alert("Invalid promo code. Try 'BEAUTY20' for 20% off!");
    }
  };

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    setIsWishlisted((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Proceed to checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/checkout");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-8 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-100/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
              <p className="text-gray-400 text-sm font-light mt-1">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-2 text-rose-500 hover:text-rose-600 transition"
            >
              <FaArrowLeft className="text-sm" />
              <span className="text-sm font-medium">Continue Shopping</span>
            </Link>
          </div>
        </motion.div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-12 text-center max-w-2xl mx-auto"
          >
            <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingBag className="text-4xl text-rose-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Your Cart is Empty</h3>
            <p className="text-gray-400 font-light mt-2 max-w-sm mx-auto">
              Looks like you haven't added any products to your cart yet. Start exploring our collection!
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition"
            >
              Start Shopping <FaArrowRight />
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* ===== CART ITEMS ===== */}
            <div className="lg:col-span-2 space-y-4">
              {/* Clear cart button */}
              <div className="flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-400 hover:text-rose-500 transition flex items-center gap-1"
                >
                  <FaTrashAlt className="text-xs" />
                  Clear Cart
                </button>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 p-4 sm:p-5 hover:shadow-xl transition"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-rose-50 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p className="text-xs text-rose-400 font-medium uppercase tracking-wider">
                              {item.category || "Product"}
                            </p>
                            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-800">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-gray-400">
                                ${item.price.toFixed(2)} × {item.quantity}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-rose-200/50 rounded-full overflow-hidden bg-white/50">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-500 hover:bg-rose-50 transition"
                            >
                              <FaMinus className="text-xs" />
                            </button>
                            <span className="px-3 py-1 text-gray-700 font-medium min-w-[30px] text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-500 hover:bg-rose-50 transition"
                            >
                              <FaPlus className="text-xs" />
                            </button>
                          </div>

                          {/* Wishlist Button */}
                          <button
                            onClick={() => toggleWishlist(item.productId)}
                            className="p-2 text-gray-400 hover:text-rose-500 transition"
                          >
                            {isWishlisted[item.productId] ? (
                              <FaHeart className="text-rose-500" />
                            ) : (
                              <FaRegHeart />
                            )}
                          </button>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-gray-400 hover:text-rose-500 transition"
                          >
                            <FaTrashAlt className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ===== ORDER SUMMARY ===== */}
            <div className="lg:col-span-1">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-light">Subtotal</span>
                    <span className="text-gray-700 font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-light">Shipping</span>
                    <span className="text-gray-700 font-medium">
                      {shipping === 0 ? (
                        <span className="text-emerald-500">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-light">Tax (8%)</span>
                    <span className="text-gray-700 font-medium">${tax.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-emerald-600">
                      <span className="font-light">Discount (20%)</span>
                      <span className="font-medium">-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="border-t border-rose-200/30 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-rose-500">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    {subtotal < 50 && (
                      <p className="text-xs text-gray-400 mt-1">
                        🚚 Add ${(50 - subtotal).toFixed(2)} more for free shipping
                      </p>
                    )}
                    {subtotal >= 50 && (
                      <p className="text-xs text-emerald-500 mt-1">
                        ✅ You qualify for free shipping!
                      </p>
                    )}
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mt-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="flex-1 px-4 py-2.5 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition disabled:opacity-50"
                    />
                    <button
                      onClick={handleApplyPromo}
                      disabled={promoApplied}
                      className="px-4 py-2.5 bg-rose-500 text-white rounded-xl font-medium hover:bg-rose-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
                      <FaTag /> Promo code applied! You saved ${discount.toFixed(2)}
                    </p>
                  )}
                  {!promoApplied && (
                    <p className="text-xs text-gray-400 mt-2">
                      Try <span className="font-medium text-rose-500">BEAUTY20</span> for 20% off!
                    </p>
                  )}
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="mt-6 w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition"
                >
                  <FaLock className="text-sm" />
                  Proceed to Checkout
                  <FaArrowRight className="text-sm" />
                </motion.button>

                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaTruck className="text-emerald-400" /> Free shipping over $50
                  </span>
                  <span className="flex items-center gap-1">
                    <FaLock className="text-emerald-400" /> Secure checkout
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== RELATED PRODUCTS ===== */}
        {cartItems.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                You May Also Like
              </h2>
              <Link
                to="/products"
                className="text-rose-500 text-sm hover:text-rose-600 transition flex items-center gap-1"
              >
                View All <FaArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((product, index) => {
                const isInCart = cartItems.some((item) => item.productId === product.id);
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 p-4 hover:shadow-xl transition"
                  >
                    <Link to={`/product/${product.id}`}>
                      <div className="aspect-square rounded-xl overflow-hidden bg-rose-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-semibold text-gray-800 text-sm mt-2 line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-sm text-rose-500 font-bold">${product.price}</p>
                    </Link>
                    <button
                      onClick={() => {
                        if (!isInCart) {
                          addToCart(product, 1);
                        }
                      }}
                      disabled={isInCart}
                      className={`mt-2 w-full py-1.5 rounded-full text-sm font-medium transition ${
                        isInCart
                          ? "bg-emerald-100 text-emerald-600 cursor-default"
                          : "bg-rose-500 text-white hover:bg-rose-600 shadow-md"
                      }`}
                    >
                      {isInCart ? "In Cart" : "Add to Cart"}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;