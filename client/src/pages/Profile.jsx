// src/pages/Profile.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaCog,
  FaSignOutAlt,
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaBox,
  FaStar,
  FaEdit,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaPlus,
  FaArrowRight,
} from "react-icons/fa";
import { products } from "../data/data";
import ProductCard from "../components/ProductCard";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  // User data (mock)
  const user = {
    name: "Sarah Johnson",
    email: "sarah@flulush.com",
    avatar: "https://i.pravatar.cc/300?img=11",
    joined: "January 2024",
    points: 1250,
  };

  // Order data (mock)
  const orders = [
    {
      id: "FL-1001",
      date: "June 15, 2025",
      total: 124.00,
      status: "Delivered",
      items: 3,
    },
    {
      id: "FL-1002",
      date: "June 10, 2025",
      total: 68.00,
      status: "Shipped",
      items: 1,
    },
    {
      id: "FL-1003",
      date: "June 5, 2025",
      total: 210.00,
      status: "Processing",
      items: 4,
    },
    {
      id: "FL-1004",
      date: "May 28, 2025",
      total: 45.00,
      status: "Delivered",
      items: 2,
    },
  ];

  // Wishlist (filter products with badge "Bestseller" or "Popular")
  const wishlistItems = products.filter(
    (p) => p.badge === "Bestseller" || p.badge === "Popular"
  );

  // Stats
  const stats = [
    {
      icon: FaShoppingBag,
      label: "Total Orders",
      value: orders.length,
      color: "from-rose-400 to-pink-500",
    },
    {
      icon: FaClock,
      label: "Pending",
      value: orders.filter((o) => o.status === "Processing").length,
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: FaStar,
      label: "Reward Points",
      value: user.points,
      color: "from-yellow-400 to-amber-500",
    },
    {
      icon: FaHeart,
      label: "Wishlist",
      value: wishlistItems.length,
      color: "from-rose-400 to-pink-500",
    },
  ];

  // Tab navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: FaUser },
    { id: "orders", label: "Orders", icon: FaShoppingBag },
    { id: "wishlist", label: "Wishlist", icon: FaHeart },
    { id: "settings", label: "Settings", icon: FaCog },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const tabContentVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: (direction) => ({
      x: direction > 0 ? -30 : 30,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    }),
  };

  const handleLogout = () => {
    navigate("/login");
  };

  // Render tab content
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent stats={stats} orders={orders} user={user} />;
      case "orders":
        return <OrdersContent orders={orders} />;
      case "wishlist":
        return <WishlistContent items={wishlistItems} />;
      case "settings":
        return <SettingsContent user={user} />;
      default:
        return null;
    }
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
          <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
          <p className="text-gray-400 text-sm font-light">
            Manage your orders, wishlist, and profile settings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ===== SIDEBAR ===== */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6 sticky top-24">
              {/* User Profile Card */}
              <div className="text-center mb-6 pb-6 border-b border-rose-200/30">
                <div className="relative inline-block">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full border-4 border-white shadow-lg mx-auto object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-emerald-400 border-2 border-white rounded-full p-1">
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                  </div>
                </div>
                <h3 className="mt-3 font-semibold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-400 font-light">{user.email}</p>
                <p className="text-xs text-rose-400 font-medium mt-1">
                  Member since {user.joined}
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25"
                          : "text-gray-600 hover:bg-rose-50 hover:text-rose-600"
                      }`}
                    >
                      <Icon className="text-lg" />
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="active-indicator"
                          className="ml-auto w-1.5 h-1.5 bg-white rounded-full"
                        />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 mt-4 border-t border-rose-200/30 pt-4"
              >
                <FaSignOutAlt className="text-lg" />
                Logout
              </button>
            </div>
          </motion.aside>

          {/* ===== CONTENT AREA ===== */}
          <motion.main
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6 md:p-8 min-h-[500px]">
              <AnimatePresence mode="wait" custom={activeTab}>
                <motion.div
                  key={activeTab}
                  custom={activeTab}
                  variants={tabContentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="h-full"
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

// ===== DASHBOARD CONTENT =====
const DashboardContent = ({ stats, orders, user }) => {
  const recentOrders = orders.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Welcome Message */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome back, {user.name.split(" ")[0]}! ✨
        </h2>
        <p className="text-gray-400 text-sm font-light mt-1">
          Here's what's happening with your orders and rewards.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`bg-gradient-to-br ${stat.color} p-4 rounded-2xl text-white shadow-lg`}
            >
              <Icon className="text-2xl mb-2 opacity-80" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs opacity-80 font-light">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Recent Orders</h3>
          <button
            onClick={() => document.querySelector("[data-tab='orders']")?.click()}
            className="text-sm text-rose-500 hover:text-rose-600 transition flex items-center gap-1"
          >
            View All <FaArrowRight className="text-xs" />
          </button>
        </div>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-rose-200/30 hover:shadow-md transition"
            >
              <div>
                <p className="font-medium text-gray-800 text-sm">{order.id}</p>
                <p className="text-xs text-gray-400">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800 text-sm">
                  ${order.total.toFixed(2)}
                </p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    order.status === "Delivered"
                      ? "bg-emerald-100 text-emerald-700"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button className="p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-rose-200/30 hover:border-rose-300 hover:shadow-md transition text-center">
            <FaShoppingBag className="text-rose-500 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Continue Shopping</p>
          </button>
          <button className="p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-rose-200/30 hover:border-rose-300 hover:shadow-md transition text-center">
            <FaHeart className="text-rose-500 mx-auto mb-1" />
            <p className="text-xs text-gray-600">View Wishlist</p>
          </button>
          <button className="p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-rose-200/30 hover:border-rose-300 hover:shadow-md transition text-center">
            <FaEdit className="text-rose-500 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Edit Profile</p>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ===== ORDERS CONTENT =====
const OrdersContent = ({ orders }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <FaCheckCircle className="text-emerald-500" />;
      case "Shipped":
        return <FaTruck className="text-blue-500" />;
      case "Processing":
        return <FaClock className="text-amber-500" />;
      default:
        return <FaBox className="text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
      <p className="text-gray-400 text-sm font-light -mt-2">
        Track and manage all your orders in one place.
      </p>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400">No orders yet.</p>
          <Link
            to="/products"
            className="mt-4 inline-block px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/50 backdrop-blur-sm rounded-2xl border border-rose-200/30 p-5 hover:shadow-md transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{order.id}</p>
                    <p className="text-xs text-gray-400">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{order.items} items</p>
                    <p className="font-bold text-gray-800">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      order.status === "Delivered"
                        ? "bg-emerald-100 text-emerald-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// ===== WISHLIST CONTENT =====
const WishlistContent = ({ items }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Wishlist</h2>
          <p className="text-gray-400 text-sm font-light -mt-1">
            {items.length} items saved
          </p>
        </div>
        <button className="text-sm text-rose-500 hover:text-rose-600 transition flex items-center gap-1">
          View All <FaArrowRight className="text-xs" />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400">Your wishlist is empty.</p>
          <Link
            to="/products"
            className="mt-4 inline-block px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.slice(0, 6).map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onShopClick={() => console.log("Navigate to", product.id)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

// ===== SETTINGS CONTENT =====
const SettingsContent = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: "+92 300 1234567",
    address: "Lahore, Pakistan",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    console.log("Profile updated:", formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
      <p className="text-gray-400 text-sm font-light -mt-2">
        Update your personal information and password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Delivery Address
          </label>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-rose-200/30">
          <h4 className="font-semibold text-gray-800 mb-4">Change Password</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Current Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-medium shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition hover:scale-[1.02] active:scale-[0.98]"
          >
            Save Changes
          </button>
          {isSaved && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full text-sm"
            >
              <FaCheckCircle />
              Profile updated successfully!
            </motion.div>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default Profile;