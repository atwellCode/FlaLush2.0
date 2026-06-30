// src/pages/SuperAdmin.jsx
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBox,
  FaUsers,
  FaShoppingBag,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaSave,
  FaUndo,
  FaCheck,
  FaTruck,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { products as initialProducts } from "../data/data";

// ─── Mock Data ──────────────────────────────────────────────

// Initial customers (will be stored in state)
const initialCustomers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+92 300 1234567",
    address: "123 Beauty Lane, Lahore, Pakistan",
    joined: "2024-01-15",
    orders: 3,
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    phone: "+92 301 9876543",
    address: "456 Rose Ave, Karachi, Pakistan",
    joined: "2024-02-20",
    orders: 1,
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma@example.com",
    phone: "+92 302 5555555",
    address: "789 Glow Street, Islamabad, Pakistan",
    joined: "2024-03-10",
    orders: 5,
  },
];

// Initial orders (mock)
const initialOrders = [
  {
    id: "FL-1001",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    items: [
      { name: "Radiant Glow Serum", quantity: 1, price: 68 },
      { name: "Hydra Boost Moisturizer", quantity: 1, price: 52 },
    ],
    total: 120,
    status: "Delivered",
    trackingNumber: "TRK123456789",
    date: "2025-06-15",
  },
  {
    id: "FL-1002",
    customer: "John Doe",
    email: "john@example.com",
    items: [{ name: "Rose Water Toner", quantity: 2, price: 28 }],
    total: 56,
    status: "Shipped",
    trackingNumber: "",
    date: "2025-06-18",
  },
  {
    id: "FL-1003",
    customer: "Emma Wilson",
    email: "emma@example.com",
    items: [
      { name: "Collagen Night Cream", quantity: 1, price: 61 },
      { name: "SPF 50 Daily Sunscreen", quantity: 1, price: 39 },
    ],
    total: 100,
    status: "Processing",
    trackingNumber: "",
    date: "2025-06-20",
  },
];

// ─── Admin Dashboard Component ──────────────────────────────

const SuperAdmin = () => {
  // ── State ──
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("adminProducts");
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("adminOrders");
    return saved ? JSON.parse(saved) : initialOrders;
  });
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem("adminCustomers");
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  // ── Persist to localStorage ──
  useEffect(() => {
    localStorage.setItem("adminProducts", JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    localStorage.setItem("adminOrders", JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    localStorage.setItem("adminCustomers", JSON.stringify(customers));
  }, [customers]);

  // ── Utility functions ──
  const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

  // ── Section Components ─────────────────────────────────────

  // ---------- OVERVIEW ----------
  const OverviewSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FaBox}
          label="Total Products"
          value={products.length}
          color="from-blue-400 to-blue-600"
        />
        <StatCard
          icon={FaShoppingBag}
          label="Total Orders"
          value={orders.length}
          color="from-rose-400 to-pink-600"
        />
        <StatCard
          icon={FaUsers}
          label="Total Customers"
          value={customers.length}
          color="from-emerald-400 to-green-600"
        />
        <StatCard
          icon={FaTruck}
          label="Pending Shipments"
          value={orders.filter(o => o.status === "Processing" || o.status === "Shipped").length}
          color="from-amber-400 to-orange-600"
        />
      </div>
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
        <h3 className="font-semibold text-gray-700 mb-4">Recent Orders</h3>
        <div className="space-y-3">
          {orders.slice(0, 5).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-rose-200/30">
              <div>
                <p className="font-medium text-gray-800">{order.id}</p>
                <p className="text-sm text-gray-400">{order.customer}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  order.status === "Delivered" ? "bg-emerald-100 text-emerald-700" :
                  order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                  "bg-amber-100 text-amber-700"
                }`}>
                  {order.status}
                </span>
                <p className="text-sm font-bold text-gray-700 mt-1">${order.total.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // ---------- PRODUCTS ----------
  const ProductsSection = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
      name: "",
      category: "",
      price: "",
      oldPrice: "",
      rating: "",
      image: "",
      shortDescription: "",
      description: "",
      badge: "",
      inStock: true,
      ingredients: "",
      howToUse: "",
    });

    const filteredProducts = useMemo(() => {
      if (!searchTerm) return products;
      return products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [products, searchTerm]);

    const resetForm = () => {
      setFormData({
        name: "",
        category: "",
        price: "",
        oldPrice: "",
        rating: "",
        image: "",
        shortDescription: "",
        description: "",
        badge: "",
        inStock: true,
        ingredients: "",
        howToUse: "",
      });
      setEditingProduct(null);
      setShowForm(false);
    };

    const handleEdit = (product) => {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        oldPrice: product.oldPrice || "",
        rating: product.rating || "",
        image: product.image,
        shortDescription: product.shortDescription || "",
        description: product.description || "",
        badge: product.badge || "",
        inStock: product.inStock !== undefined ? product.inStock : true,
        ingredients: product.ingredients ? product.ingredients.join(", ") : "",
        howToUse: product.howToUse || "",
      });
      setShowForm(true);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const productData = {
        id: editingProduct ? editingProduct.id : generateId(),
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
        rating: parseFloat(formData.rating) || 4.5,
        image: formData.image,
        shortDescription: formData.shortDescription,
        description: formData.description,
        badge: formData.badge || null,
        inStock: formData.inStock,
        ingredients: formData.ingredients ? formData.ingredients.split(",").map(s => s.trim()) : [],
        howToUse: formData.howToUse || "",
      };

      if (editingProduct) {
        setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
      } else {
        setProducts([...products, productData]);
      }
      resetForm();
    };

    const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this product?")) {
        setProducts(products.filter(p => p.id !== id));
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Products</h2>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition shadow-md"
          >
            <FaPlus /> Add Product
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
        </div>

        {/* Product List */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/40">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-rose-100/50">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Image</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Category</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Price</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Stock</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-200/30">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-rose-50/30 transition">
                    <td className="px-4 py-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">{product.name}</td>
                    <td className="px-4 py-3 text-gray-600">{product.category}</td>
                    <td className="px-4 py-3 text-gray-700">${product.price}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${product.inStock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => resetForm()}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h3>
                  <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                    <FaTimes />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-white/60 border border-rose-200/50 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category *</label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-white/60 border border-rose-200/50 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-white/60 border border-rose-200/50 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Old Price (optional)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.oldPrice}
                        onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                        className="w-full px-4 py-2 bg-white/60 border border-rose-200/50 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Rating</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                        className="w-full px-4 py-2 bg-white/60 border border-rose-200/50 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Image URL *</label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-white/60 border border-rose-200/50 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Badge (e.g., Bestseller)</label>
                      <input
                        type="text"
                        value={formData.badge}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                        className="w-full px-4 py-2 bg-white/60 border border-rose-200/50 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                        className="w-4 h-4 accent-rose-500"
                      />
                      <label className="text-sm font-medium text-gray-700">In Stock</label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Short Description</label>
                    <input
                      type="text"
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      className="w-full px-4 py-2 bg-white/60 border border-rose-200/50 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Description</label>
                    <textarea
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 bg-white/60 border border-rose-200/50 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ingredients (comma separated)</label>
                    <input
                      type="text"
                      value={formData.ingredients}
                      onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                      className="w-full px-4 py-2 bg-white/60 border border-rose-200/50 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">How to Use</label>
                    <input
                      type="text"
                      value={formData.howToUse}
                      onChange={(e) => setFormData({ ...formData, howToUse: e.target.value })}
                      className="w-full px-4 py-2 bg-white/60 border border-rose-200/50 rounded-xl focus:ring-2 focus:ring-rose-300 outline-none"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition shadow-md"
                    >
                      {editingProduct ? "Update" : "Add"} Product
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-2 border border-rose-200 text-gray-600 rounded-full hover:bg-rose-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // ---------- ORDERS ----------
  const OrdersSection = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [editingTracking, setEditingTracking] = useState(null);

    const filteredOrders = useMemo(() => {
      if (!searchTerm) return orders;
      return orders.filter(o =>
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [orders, searchTerm]);

    const handleTrackingUpdate = (orderId, trackingNumber) => {
      setOrders(orders.map(o =>
        o.id === orderId ? { ...o, trackingNumber, status: "Shipped" } : o
      ));
      setEditingTracking(null);
    };

    const handleStatusUpdate = (orderId, newStatus) => {
      setOrders(orders.map(o =>
        o.id === orderId ? { ...o, status: newStatus } : o
      ));
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
        </div>

        <div className="relative max-w-sm">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/40">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-rose-100/50">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Order ID</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Customer</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Items</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Total</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Tracking</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-200/30">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-rose-50/30 transition">
                    <td className="px-4 py-3 font-medium text-gray-800">{order.id}</td>
                    <td className="px-4 py-3 text-gray-700">{order.customer}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {order.items.map((item, i) => (
                        <span key={i} className="text-xs block">
                          {item.name} × {item.quantity}
                        </span>
                      ))}
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-800">${order.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className="px-2 py-0.5 rounded-full text-xs font-medium border border-rose-200/50 bg-white/60 focus:outline-none focus:ring-2 focus:ring-rose-300"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      {editingTracking === order.id ? (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const input = e.target.elements.tracking;
                            handleTrackingUpdate(order.id, input.value);
                          }}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="text"
                            name="tracking"
                            defaultValue={order.trackingNumber || ""}
                            placeholder="Enter tracking #"
                            className="px-2 py-1 bg-white/60 border border-rose-200/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                          />
                          <button type="submit" className="text-emerald-500 hover:text-emerald-600">
                            <FaCheck />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingTracking(null)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <FaTimes />
                          </button>
                        </form>
                      ) : (
                        <span className="text-gray-600">
                          {order.trackingNumber || (
                            <button
                              onClick={() => setEditingTracking(order.id)}
                              className="text-rose-500 hover:text-rose-600 text-xs flex items-center gap-1"
                            >
                              <FaTruck /> Add tracking
                            </button>
                          )}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          // For demo, just show alert
                          alert(`Order ${order.id} details:\nCustomer: ${order.customer}\nTotal: $${order.total}\nStatus: ${order.status}`);
                        }}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    );
  };

  // ---------- CUSTOMERS ----------
  const CustomersSection = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [editData, setEditData] = useState({});

    const filteredCustomers = useMemo(() => {
      if (!searchTerm) return customers;
      return customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [customers, searchTerm]);

    const handleEdit = (customer) => {
      setEditingCustomer(customer.id);
      setEditData({ ...customer });
    };

    const handleSaveEdit = (id) => {
      setCustomers(customers.map(c => c.id === id ? editData : c));
      setEditingCustomer(null);
    };

    const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this customer?")) {
        setCustomers(customers.filter(c => c.id !== id));
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
        </div>

        <div className="relative max-w-sm">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/40">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-rose-100/50">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Phone</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Address</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Orders</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-200/30">
                {filteredCustomers.map((customer) => {
                  const isEditing = editingCustomer === customer.id;
                  return (
                    <tr key={customer.id} className="hover:bg-rose-50/30 transition">
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="px-2 py-1 bg-white/60 border border-rose-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 w-full"
                          />
                        ) : (
                          customer.name
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {isEditing ? (
                          <input
                            type="email"
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            className="px-2 py-1 bg-white/60 border border-rose-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 w-full"
                          />
                        ) : (
                          customer.email
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.phone}
                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                            className="px-2 py-1 bg-white/60 border border-rose-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 w-full"
                          />
                        ) : (
                          customer.phone
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.address}
                            onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                            className="px-2 py-1 bg-white/60 border border-rose-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 w-full"
                          />
                        ) : (
                          customer.address
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{customer.orders}</td>
                      <td className="px-4 py-3 flex gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSaveEdit(customer.id)}
                              className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition"
                            >
                              <FaSave />
                            </button>
                            <button
                              onClick={() => setEditingCustomer(null)}
                              className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition"
                            >
                              <FaTimes />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(customer)}
                              className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(customer.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    );
  };

  // ── Main Render ────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-8 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Super Admin Dashboard</h1>
          <p className="text-gray-400 text-sm font-light">Full control over your store</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-1 border border-white/40">
          {[
            { id: "overview", label: "Overview", icon: FaBox },
            { id: "products", label: "Products", icon: FaPlus },
            { id: "orders", label: "Orders", icon: FaShoppingBag },
            { id: "customers", label: "Customers", icon: FaUsers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-rose-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-rose-50 hover:text-rose-600"
                }`}
              >
                <Icon />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6 md:p-8">
          {activeTab === "overview" && <OverviewSection />}
          {activeTab === "products" && <ProductsSection />}
          {activeTab === "orders" && <OrdersSection />}
          {activeTab === "customers" && <CustomersSection />}
        </div>
      </div>
    </div>
  );
};

// ── Stat Card Component ──
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-lg`}>
    <Icon className="text-3xl mb-3 opacity-80" />
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm opacity-80 font-light">{label}</p>
  </div>
);

export default SuperAdmin;