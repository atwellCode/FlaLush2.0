// src/pages/Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 text-white py-20 px-6">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <span className="text-yellow-300">💬</span>
              Let's Connect
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg text-rose-100 max-w-2xl mx-auto">
              Have a question, feedback, or just want to say hello? We'd love to
              hear from you. Reach out and we'll get back to you soon.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid lg:grid-cols-3 gap-12"
        >
          {/* LEFT - Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-rose-100/30 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Send us a message
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 text-green-600 bg-green-50 px-4 py-3 rounded-2xl"
                >
                  <FaCheckCircle className="text-2xl" />
                  <span className="font-medium">
                    Thanks! We'll get back to you shortly.
                  </span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-5 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <FaPaperPlane />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* RIGHT - Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-rose-100/30 p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Get in touch
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 flex-shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700">Address</h4>
                    <p className="text-sm text-gray-500 font-light">
                      Lahore, Pakistan
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 flex-shrink-0">
                    <FaPhone />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700">Phone</h4>
                    <p className="text-sm text-gray-500 font-light">
                      +92 300 1234567
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 flex-shrink-0">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700">Email</h4>
                    <p className="text-sm text-gray-500 font-light">
                      support@flulush.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 flex-shrink-0">
                    <FaClock />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700">Business Hours</h4>
                    <p className="text-sm text-gray-500 font-light">
                      Mon–Fri: 9am – 6pm
                      <br />
                      Sat: 10am – 4pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder (optional) */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-rose-100/30 p-4 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&h=200&fit=crop&crop=center"
                alt="Map"
                className="w-full h-32 object-cover rounded-2xl"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;