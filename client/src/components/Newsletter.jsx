// Newsletter.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaArrowRight, FaCheckCircle } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setTimeout(() => {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setEmail("");
      }, 500);
    }
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-white">
      {/* Animated background orbs */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-pink-200/30 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-rose-200/20 blur-3xl pointer-events-none"
      />

      {/* Floating decorative shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-white/40 border border-rose-200/20"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-10"
        >
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block bg-white/60 backdrop-blur-sm px-6 py-2 rounded-full text-rose-600 text-sm font-medium mb-4 shadow-sm border border-white/40"
          >
            💌 Join the Glow Community
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Exclusive</span> Beauty Tips
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg font-light">
            Subscribe to receive 10% off your first order plus insider access to new arrivals and special offers.
          </p>
        </motion.div>

        {/* Newsletter Card */}
        <motion.div
          whileHover={{ scale: 1.01, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8 md:p-12 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 to-pink-50/30 rounded-3xl pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div
                className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${
                  isFocused ? "text-rose-500" : "text-gray-400"
                }`}
              >
                <FaEnvelope className="text-lg" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter your email address"
                required
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-rose-200/50 focus:border-rose-400 focus:ring-4 focus:ring-rose-200/20 transition-all text-gray-700 placeholder-gray-400 shadow-sm"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium rounded-2xl shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition-all flex items-center justify-center gap-3 min-w-[160px]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Subscribe
                <motion.span
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaArrowRight className="text-sm" />
                </motion.span>
              </span>
              <motion.span
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0, 0.3, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-white/10 rounded-2xl"
              />
            </motion.button>
          </form>

          {/* Success message */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-3xl"
              >
                <div className="flex items-center gap-4 text-green-600 bg-green-50 px-8 py-4 rounded-full shadow-lg">
                  <FaCheckCircle className="text-2xl" />
                  <span className="font-medium text-lg">Thanks for subscribing!</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 mt-8 text-sm text-gray-400 font-light"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            No spam, ever
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            10% off your first order
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Unsubscribe anytime
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;