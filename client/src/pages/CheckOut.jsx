// src/pages/Checkout.jsx
import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; 
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaLock,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaCreditCard,
  FaPaypal,
  FaApplePay,
  FaTag,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaPhone,
} from "react-icons/fa";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // 👈 get user
  const { cartItems, clearCart, getCartTotal } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // ─── AUTH GUARD ────────────────────────────────────────────
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
    }
  }, [user, navigate]);

  // ─── PRE‑FILL SHIPPING FORM ──────────────────────────────
  useEffect(() => {
    if (user) {
      const nameParts = user.name?.split(" ") || ["", ""];
      setShippingData((prev) => ({
        ...prev,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // ─── REDIRECT IF CART IS EMPTY (only when logged in) ─────
  useEffect(() => {
    if (user && cartItems.length === 0 && !orderCompleted) {
      navigate("/cart");
    }
  }, [user, cartItems, navigate, orderCompleted]);

  // ─── STATE ──────────────────────────────────────────────────
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Pakistan",
  });

  const [paymentData, setPaymentData] = useState({
    method: "card",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  // ─── TOTALS ──────────────────────────────────────────────────
  const subtotal = useMemo(() => getCartTotal(), [cartItems, getCartTotal]);
  const shipping = subtotal > 50 ? 0 : 6;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // ─── VALIDATION ─────────────────────────────────────────────
  const validateShipping = () => {
    const { firstName, lastName, email, phone, address, city, state, zipCode, country } = shippingData;
    if (!firstName || !lastName || !email || !phone || !address || !city || !state || !zipCode || !country) {
      alert("Please fill in all shipping fields.");
      return false;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    if (paymentData.method === "card") {
      const { cardNumber, cardName, expiry, cvv } = paymentData;
      if (!cardNumber || !cardName || !expiry || !cvv) {
        alert("Please fill in all card details.");
        return false;
      }
      if (cardNumber.replace(/\s/g, "").length < 16) {
        alert("Please enter a valid card number.");
        return false;
      }
      if (expiry.length < 5) {
        alert("Please enter a valid expiry date (MM/YY).");
        return false;
      }
      if (cvv.length < 3) {
        alert("Please enter a valid CVV.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateShipping()) {
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (currentStep === 2) {
      if (validatePayment()) {
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePlaceOrder = () => {
    const newOrderNumber = "FL-" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(newOrderNumber);
    clearCart();
    setOrderCompleted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShippingChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s/g, "").replace(/\D/g, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = match.match(/.{1,4}/g);
    if (parts) {
      return parts.join(" ");
    }
    return value;
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  // ─── RENDER GUARD ──────────────────────────────────────────
  // If no user (still checking) or cart empty (but not completed) – show nothing (redirect will happen)
  if (!user || (cartItems.length === 0 && !orderCompleted)) {
    return null;
  }

  // ─── MAIN UI ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-8 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
              <p className="text-gray-400 text-sm font-light mt-1">
                Complete your order in a few easy steps
              </p>
            </div>
            <Link
              to="/cart"
              className="flex items-center gap-2 text-rose-500 hover:text-rose-600 transition"
            >
              <FaArrowLeft className="text-sm" />
              <span className="text-sm font-medium">Return to Cart</span>
            </Link>
          </div>
        </motion.div>

        {/* ORDER COMPLETED */}
        {orderCompleted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-12 text-center max-w-2xl mx-auto"
          >
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-5xl text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Order Confirmed! 🎉</h2>
            <p className="text-gray-500 mt-2">Thank you for your purchase, {shippingData.firstName}!</p>
            <p className="text-sm text-gray-400 mt-1">
              Order #{orderNumber} has been placed and will be processed shortly.
            </p>
            <div className="mt-6 p-4 bg-rose-50 rounded-2xl inline-block">
              <p className="text-sm text-gray-600">
                We've sent a confirmation email to <strong>{shippingData.email}</strong>
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                to="/orders"
                className="px-6 py-2.5 bg-rose-500 text-white rounded-full font-medium hover:bg-rose-600 transition shadow-md"
              >
                View My Orders
              </Link>
              <Link
                to="/"
                className="px-6 py-2.5 border border-rose-200 text-rose-500 rounded-full font-medium hover:bg-rose-50 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* CHECKOUT FORM */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step Indicators */}
              <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        currentStep >= step
                          ? "bg-rose-500 text-white shadow-md"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {step}
                    </div>
                    <span
                      className={`text-sm font-medium hidden sm:inline ${
                        currentStep >= step ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      {step === 1 && "Shipping"}
                      {step === 2 && "Payment"}
                      {step === 3 && "Review"}
                    </span>
                    {step < 3 && (
                      <div className="hidden sm:block w-8 h-0.5 bg-rose-200/50 ml-2" />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6 md:p-8 min-h-[400px]">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-5"
                    >
                      <h2 className="text-2xl font-bold text-gray-800">Shipping Information</h2>
                      <p className="text-gray-400 text-sm font-light -mt-1">
                        Enter your delivery details.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            First Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                              type="text"
                              name="firstName"
                              value={shippingData.firstName}
                              onChange={handleShippingChange}
                              className="w-full pl-11 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                              placeholder="Jane"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Last Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                              type="text"
                              name="lastName"
                              value={shippingData.lastName}
                              onChange={handleShippingChange}
                              className="w-full pl-11 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email Address <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                              type="email"
                              name="email"
                              value={shippingData.email}
                              onChange={handleShippingChange}
                              className="w-full pl-11 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                              placeholder="you@example.com"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Phone Number <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                              type="tel"
                              name="phone"
                              value={shippingData.phone}
                              onChange={handleShippingChange}
                              className="w-full pl-11 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                              placeholder="+92 300 1234567"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Street Address <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                          <input
                            type="text"
                            name="address"
                            value={shippingData.address}
                            onChange={handleShippingChange}
                            className="w-full pl-11 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                            placeholder="123 Main St"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Apartment, Suite, etc. (optional)
                        </label>
                        <input
                          type="text"
                          name="apartment"
                          value={shippingData.apartment}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2.5 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                          placeholder="Apt 4B"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            City <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                              type="text"
                              name="city"
                              value={shippingData.city}
                              onChange={handleShippingChange}
                              className="w-full pl-11 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                              placeholder="Lahore"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            State <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={shippingData.state}
                            onChange={handleShippingChange}
                            className="w-full px-4 py-2.5 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                            placeholder="Punjab"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            ZIP / Postal <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={shippingData.zipCode}
                            onChange={handleShippingChange}
                            className="w-full px-4 py-2.5 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                            placeholder="54000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Country <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                          <input
                            type="text"
                            name="country"
                            value={shippingData.country}
                            onChange={handleShippingChange}
                            className="w-full pl-11 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                            placeholder="Pakistan"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-5"
                    >
                      <h2 className="text-2xl font-bold text-gray-800">Payment Method</h2>
                      <p className="text-gray-400 text-sm font-light -mt-1">
                        Choose how you'd like to pay.
                      </p>

                      {/* Payment Method Selection */}
                      <div className="flex gap-4">
                        <button
                          onClick={() => setPaymentData({ ...paymentData, method: "card" })}
                          className={`flex-1 p-3 rounded-xl border-2 transition ${
                            paymentData.method === "card"
                              ? "border-rose-500 bg-rose-50"
                              : "border-rose-200/50 hover:border-rose-300"
                          }`}
                        >
                          <FaCreditCard className="text-2xl mx-auto text-rose-500" />
                          <p className="text-xs text-center text-gray-600 mt-1">Credit Card</p>
                        </button>
                        <button
                          onClick={() => setPaymentData({ ...paymentData, method: "paypal" })}
                          className={`flex-1 p-3 rounded-xl border-2 transition ${
                            paymentData.method === "paypal"
                              ? "border-rose-500 bg-rose-50"
                              : "border-rose-200/50 hover:border-rose-300"
                          }`}
                        >
                          <FaPaypal className="text-2xl mx-auto text-blue-500" />
                          <p className="text-xs text-center text-gray-600 mt-1">PayPal</p>
                        </button>
                        <button
                          onClick={() => setPaymentData({ ...paymentData, method: "apple" })}
                          className={`flex-1 p-3 rounded-xl border-2 transition ${
                            paymentData.method === "apple"
                              ? "border-rose-500 bg-rose-50"
                              : "border-rose-200/50 hover:border-rose-300"
                          }`}
                        >
                          <FaApplePay className="text-2xl mx-auto text-gray-700" />
                          <p className="text-xs text-center text-gray-600 mt-1">Apple Pay</p>
                        </button>
                      </div>

                      {/* Card Details */}
                      {paymentData.method === "card" && (
                        <div className="space-y-4 mt-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Card Number <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={paymentData.cardNumber}
                              onChange={(e) => {
                                const formatted = formatCardNumber(e.target.value);
                                handlePaymentChange({ target: { name: "cardNumber", value: formatted } });
                              }}
                              placeholder="4242 4242 4242 4242"
                              className="w-full px-4 py-2.5 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Cardholder Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="cardName"
                              value={paymentData.cardName}
                              onChange={handlePaymentChange}
                              placeholder="John Doe"
                              className="w-full px-4 py-2.5 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Expiry Date <span className="text-rose-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="expiry"
                                value={paymentData.expiry}
                                onChange={handlePaymentChange}
                                placeholder="MM/YY"
                                className="w-full px-4 py-2.5 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                CVV <span className="text-rose-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="cvv"
                                value={paymentData.cvv}
                                onChange={handlePaymentChange}
                                placeholder="123"
                                className="w-full px-4 py-2.5 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentData.method === "paypal" && (
                        <div className="p-6 bg-blue-50 rounded-2xl text-center">
                          <FaPaypal className="text-5xl text-blue-500 mx-auto mb-2" />
                          <p className="text-gray-600">
                            You'll be redirected to PayPal to complete your payment.
                          </p>
                        </div>
                      )}

                      {paymentData.method === "apple" && (
                        <div className="p-6 bg-gray-50 rounded-2xl text-center">
                          <FaApplePay className="text-5xl text-gray-700 mx-auto mb-2" />
                          <p className="text-gray-600">
                            Pay securely with Apple Pay using your saved cards.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-gray-800">Review Your Order</h2>
                      <p className="text-gray-400 text-sm font-light -mt-1">
                        Please review your order details before placing.
                      </p>

                      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-rose-200/30">
                        <h4 className="font-semibold text-gray-800 text-sm mb-2">Shipping Address</h4>
                        <p className="text-sm text-gray-600">
                          {shippingData.firstName} {shippingData.lastName}
                          <br />
                          {shippingData.address}
                          {shippingData.apartment && `, ${shippingData.apartment}`}
                          <br />
                          {shippingData.city}, {shippingData.state} {shippingData.zipCode}
                          <br />
                          {shippingData.country}
                          <br />
                          {shippingData.phone} • {shippingData.email}
                        </p>
                      </div>

                      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-rose-200/30">
                        <h4 className="font-semibold text-gray-800 text-sm mb-2">Payment Method</h4>
                        <p className="text-sm text-gray-600 capitalize">
                          {paymentData.method === "card" && "Credit Card"}
                          {paymentData.method === "paypal" && "PayPal"}
                          {paymentData.method === "apple" && "Apple Pay"}
                          {paymentData.method === "card" && (
                            <span className="block text-xs text-gray-400">
                              •••• •••• •••• {paymentData.cardNumber.slice(-4)}
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-rose-200/30">
                        <h4 className="font-semibold text-gray-800 text-sm mb-2">Order Items</h4>
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between py-2 border-b border-rose-200/30 last:border-0">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <div>
                                <p className="text-sm font-medium text-gray-700">{item.name}</p>
                                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="text-sm font-semibold text-gray-800">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-200/30">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="text-gray-700">${subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Shipping</span>
                            <span className="text-gray-700">
                              {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Tax (8%)</span>
                            <span className="text-gray-700">${tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold pt-2 border-t border-rose-200/30">
                            <span className="text-gray-800">Total</span>
                            <span className="text-rose-500">${total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-4 border-t border-rose-200/30">
                  <button
                    onClick={handleBack}
                    className={`px-6 py-2.5 rounded-full font-medium transition ${
                      currentStep === 1
                        ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                        : "text-gray-600 hover:bg-rose-50 hover:text-rose-600 border border-rose-200/50"
                    }`}
                    disabled={currentStep === 1}
                  >
                    <FaArrowLeft className="inline mr-2 text-sm" />
                    Back
                  </button>

                  {currentStep < 3 ? (
                    <button
                      onClick={handleNext}
                      className="px-8 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium shadow-md hover:shadow-lg transition flex items-center gap-2"
                    >
                      Continue
                      <FaArrowRight className="text-sm" />
                    </button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePlaceOrder}
                      className="px-8 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition flex items-center gap-2"
                    >
                      <FaLock className="text-sm" />
                      Place Order
                    </motion.button>
                  )}
                </div>
              </div>
            </div>

            {/* ORDER SUMMARY SIDEBAR */}
            <div className="lg:col-span-1">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 py-2 border-b border-rose-200/30 last:border-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-rose-200/30 pt-4 mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-light">Subtotal</span>
                    <span className="text-gray-700 font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-light">Shipping</span>
                    <span className="text-gray-700 font-medium">
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-light">Tax (8%)</span>
                    <span className="text-gray-700 font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-rose-200/30">
                    <span className="text-gray-800">Total</span>
                    <span className="text-2xl text-rose-500">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaTruck className="text-emerald-400" /> Free shipping over $50
                  </span>
                  <span className="flex items-center gap-1">
                    <FaUndo className="text-emerald-400" /> 30-day returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;