// src/pages/Orders.jsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingBag,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaFilter,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaBox,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCreditCard,
  FaStar,
  FaDownload,
  FaEye,
  FaPrint,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

// Mock order data
const mockOrders = [
  {
    id: "FL-1001",
    date: "2025-06-15T10:30:00",
    total: 124.00,
    subtotal: 110.00,
    tax: 8.00,
    shipping: 6.00,
    status: "Delivered",
    paymentMethod: "Credit Card •••• 4242",
    shippingAddress: "123 Beauty Lane, Lahore, Pakistan",
    items: [
      {
        id: 1,
        name: "Radiant Glow Serum",
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=100&h=100&fit=crop&crop=center",
        price: 68,
        quantity: 1,
      },
      {
        id: 2,
        name: "Hydra Boost Moisturizer",
        image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=100&h=100&fit=crop&crop=center",
        price: 56,
        quantity: 1,
      },
    ],
    tracking: [
      { date: "2025-06-15T14:30:00", status: "Delivered", description: "Package delivered to your address" },
      { date: "2025-06-14T08:00:00", status: "Out for Delivery", description: "Package is out for delivery" },
      { date: "2025-06-13T16:00:00", status: "Shipped", description: "Package has been shipped" },
      { date: "2025-06-12T10:00:00", status: "Processing", description: "Order confirmed and being processed" },
    ],
  },
  {
    id: "FL-1002",
    date: "2025-06-10T14:20:00",
    total: 68.00,
    subtotal: 60.00,
    tax: 4.00,
    shipping: 4.00,
    status: "Shipped",
    paymentMethod: "PayPal",
    shippingAddress: "456 Rose Ave, Karachi, Pakistan",
    items: [
      {
        id: 3,
        name: "Rose Water Toner",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&h=100&fit=crop&crop=center",
        price: 28,
        quantity: 1,
      },
      {
        id: 4,
        name: "Charcoal Detox Cleanser",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop&crop=center",
        price: 32,
        quantity: 1,
      },
    ],
    tracking: [
      { date: "2025-06-11T14:00:00", status: "Shipped", description: "Package has been shipped" },
      { date: "2025-06-10T14:20:00", status: "Processing", description: "Order confirmed and being processed" },
    ],
  },
  {
    id: "FL-1003",
    date: "2025-06-05T09:15:00",
    total: 210.00,
    subtotal: 190.00,
    tax: 14.00,
    shipping: 6.00,
    status: "Processing",
    paymentMethod: "Credit Card •••• 1234",
    shippingAddress: "789 Glow Street, Islamabad, Pakistan",
    items: [
      {
        id: 5,
        name: "Collagen Night Cream",
        image: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?w=100&h=100&fit=crop&crop=center",
        price: 61,
        quantity: 2,
      },
      {
        id: 6,
        name: "SPF 50 Daily Sunscreen",
        image: "https://images.unsplash.com/photo-1556228578-dd6a486a5d8c?w=100&h=100&fit=crop&crop=center",
        price: 39,
        quantity: 1,
      },
      {
        id: 7,
        name: "Vitamin C Face Wash",
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=100&h=100&fit=crop&crop=center",
        price: 26,
        quantity: 1,
      },
    ],
    tracking: [
      { date: "2025-06-05T09:15:00", status: "Processing", description: "Order confirmed and being processed" },
    ],
  },
  {
    id: "FL-1004",
    date: "2025-05-28T16:45:00",
    total: 45.00,
    subtotal: 40.00,
    tax: 3.00,
    shipping: 2.00,
    status: "Delivered",
    paymentMethod: "Apple Pay",
    shippingAddress: "101 Wellness Blvd, Lahore, Pakistan",
    items: [
      {
        id: 8,
        name: "Hydrating Sheet Mask",
        image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop&crop=center",
        price: 12,
        quantity: 2,
      },
      {
        id: 9,
        name: "Natural Lip Balm",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop&crop=center",
        price: 14,
        quantity: 1,
      },
    ],
    tracking: [
      { date: "2025-05-30T10:00:00", status: "Delivered", description: "Package delivered to your address" },
      { date: "2025-05-29T08:00:00", status: "Out for Delivery", description: "Package is out for delivery" },
      { date: "2025-05-28T16:45:00", status: "Processing", description: "Order confirmed and being processed" },
    ],
  },
];

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 5;

  const statusOptions = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

  const filteredOrders = useMemo(() => {
    let filtered = mockOrders;

    if (searchTerm) {
      filtered = filtered.filter((order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    return filtered;
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "Delivered":
        return {
          color: "bg-emerald-100 text-emerald-700 border-emerald-300",
          icon: FaCheckCircle,
        };
      case "Shipped":
        return {
          color: "bg-blue-100 text-blue-700 border-blue-300",
          icon: FaTruck,
        };
      case "Processing":
        return {
          color: "bg-amber-100 text-amber-700 border-amber-300",
          icon: FaClock,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-700 border-gray-300",
          icon: FaBox,
        };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-8 px-4 relative overflow-hidden">
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
              <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
              <p className="text-gray-400 text-sm font-light mt-1">
                Track and manage all your orders in one place
              </p>
            </div>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-rose-500 hover:text-rose-600 transition"
            >
              <FaArrowLeft className="text-sm" />
              <span className="text-sm font-medium">Back to Profile</span>
            </Link>
          </div>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 p-4 mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-11 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
              />
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <span className="text-sm text-gray-400 font-light">Filter:</span>
              <div className="flex gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                      statusFilter === status
                        ? "bg-rose-500 text-white shadow-md"
                        : "bg-white/60 text-gray-500 hover:bg-rose-50 hover:text-rose-600 border border-rose-200/30"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center gap-2 px-4 py-2.5 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700"
            >
              <FaFilter />
              Filters
              {statusFilter !== "All" && (
                <span className="w-2 h-2 bg-rose-500 rounded-full" />
              )}
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden sm:hidden"
              >
                <div className="flex flex-wrap gap-2 pt-4 border-t border-rose-200/30 mt-4">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setCurrentPage(1);
                        setShowFilters(false);
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                        statusFilter === status
                          ? "bg-rose-500 text-white shadow-md"
                          : "bg-white/60 text-gray-500 hover:bg-rose-50 hover:text-rose-600 border border-rose-200/30"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-400 font-light">
            Showing {paginatedOrders.length} of {filteredOrders.length} orders
          </p>
          {filteredOrders.length === 0 && searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All");
              }}
              className="text-sm text-rose-500 hover:text-rose-600 transition flex items-center gap-1"
            >
              <FaTimes className="text-xs" /> Clear filters
            </button>
          )}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-12 text-center"
          >
            <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">No orders found</h3>
            <p className="text-gray-400 font-light mt-1">
              {searchTerm
                ? "Try adjusting your search or filters"
                : "You haven't placed any orders yet"}
            </p>
            <Link
              to="/products"
              className="mt-6 inline-block px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {paginatedOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;
              const isExpanded = expandedOrder === order.id;

              return (
                <motion.div
                  key={order.id}
                  variants={itemVariants}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 overflow-hidden hover:shadow-xl transition"
                >
                  <div
                    onClick={() => toggleOrder(order.id)}
                    className="p-5 cursor-pointer hover:bg-rose-50/30 transition"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 flex-shrink-0">
                          <FaBox />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{order.id}</p>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span>{formatDate(order.date)}</span>
                            <span>•</span>
                            <span>{order.items.length} items</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-bold text-gray-800">
                            ${order.total.toFixed(2)}
                          </p>
                          <span
                            className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full ${statusInfo.color}`}
                          >
                            <StatusIcon className="text-[10px]" />
                            {order.status}
                          </span>
                        </div>
                        <div className="text-gray-400">
                          {isExpanded ? (
                            <FaChevronUp className="text-sm" />
                          ) : (
                            <FaChevronDown className="text-sm" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="border-t border-rose-200/30 overflow-hidden"
                      >
                        <div className="p-5 space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-rose-200/30">
                              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                                Payment Method
                              </p>
                              <p className="text-sm text-gray-700 mt-1">
                                {order.paymentMethod}
                              </p>
                            </div>
                            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-rose-200/30">
                              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                                Shipping Address
                              </p>
                              <p className="text-sm text-gray-700 mt-1 flex items-start gap-2">
                                <FaMapMarkerAlt className="text-rose-400 text-xs mt-0.5" />
                                {order.shippingAddress}
                              </p>
                            </div>
                            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-rose-200/30">
                              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                                Order Summary
                              </p>
                              <div className="text-sm text-gray-700 mt-1 space-y-0.5">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Subtotal</span>
                                  <span>${order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Shipping</span>
                                  <span>${order.shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Tax</span>
                                  <span>${order.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold pt-1 border-t border-rose-200/30">
                                  <span>Total</span>
                                  <span>${order.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                              Items ({order.items.length})
                            </h4>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-4 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-rose-200/30"
                                >
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-12 h-12 rounded-lg object-cover"
                                  />
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-800 text-sm">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                  <p className="font-semibold text-gray-800 text-sm">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                              Order Timeline
                            </h4>
                            <div className="relative pl-6 space-y-4">
                              {order.tracking.map((track, idx) => {
                                const isLast = idx === order.tracking.length - 1;
                                const trackStatus = getStatusInfo(track.status);
                                const TrackIcon = trackStatus.icon;

                                return (
                                  <div key={idx} className="relative">
                                    {!isLast && (
                                      <div className="absolute left-0 top-5 bottom-0 w-0.5 bg-rose-200/30 -translate-x-1/2" />
                                    )}
                                    <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-rose-500 border-2 border-white -translate-x-1/2 shadow-md" />
                                    <div className="pl-6">
                                      <div className="flex items-center gap-2">
                                        <TrackIcon className={`text-sm ${trackStatus.color.split(" ")[0]}`} />
                                        <span className="font-medium text-gray-800 text-sm">
                                          {track.status}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                          {formatDate(track.date)}
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-500 font-light">
                                        {track.description}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 pt-2 border-t border-rose-200/30">
                            <button className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-xl text-sm font-medium hover:bg-rose-600 transition shadow-md">
                              <FaArrowRight className="text-xs" />
                              Reorder
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-sm text-gray-600 hover:bg-rose-50 transition">
                              <FaEye /> View Details
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-sm text-gray-600 hover:bg-rose-50 transition">
                              <FaPrint /> Print
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-sm text-gray-600 hover:bg-rose-50 transition">
                              <FaDownload /> Invoice
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm border border-rose-200/50 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-rose-50 transition flex items-center justify-center"
            >
              <FaChevronDown className="rotate-90 text-sm" />
            </button>
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition ${
                  currentPage === idx + 1
                    ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md"
                    : "bg-white/60 text-gray-600 hover:bg-rose-50"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm border border-rose-200/50 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-rose-50 transition flex items-center justify-center"
            >
              <FaChevronDown className="-rotate-90 text-sm" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;