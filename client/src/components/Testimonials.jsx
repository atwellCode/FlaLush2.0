// Testimonials.jsx - Enhanced Luxury Version
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import testimonials from "../data/testimonialsData.js"; // import the data

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide every 5 seconds, stop on hover
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Dynamic gradient backgrounds based on slide index
  const gradients = [
    "from-rose-50 via-white to-pink-50",
    "from-blue-50 via-white to-indigo-50",
    "from-emerald-50 via-white to-teal-50",
    "from-amber-50 via-white to-orange-50",
  ];

  return (
    <section
      className={`relative py-24 px-6 overflow-hidden bg-gradient-to-br ${
        gradients[currentIndex % gradients.length]
      } transition-all duration-1000`}
    >
      {/* Animated background orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-pink-300/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-purple-300/20 blur-3xl pointer-events-none"
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-rose-400/30 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block bg-white/60 backdrop-blur-sm px-6 py-2 rounded-full text-rose-600 text-sm font-medium mb-4 shadow-sm border border-white/40"
          >
            ★ Testimonials
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            What Our <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
              Community Says
            </span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg font-light">
            Real stories from real people who have experienced the glow.
          </p>
        </motion.div>

        {/* Carousel Card */}
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/40 p-8 md:p-14 transition-shadow hover:shadow-3xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <FaQuoteLeft className="absolute top-8 right-8 text-6xl text-rose-200/30" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex flex-col items-center text-center"
            >
              {/* Avatar with glowing ring */}
              <div className="relative mb-6">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 p-1 opacity-70"
                >
                  <div className="w-full h-full rounded-full bg-white" />
                </motion.div>
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="relative w-24 h-24 rounded-full border-4 border-white shadow-xl"
                />
              </div>

              {/* Name & Product */}
              <h3 className="text-2xl font-bold text-gray-800">
                {testimonials[currentIndex].name}
              </h3>
              <p className="text-sm text-rose-500 font-medium mt-1 tracking-wide">
                {testimonials[currentIndex].product}
              </p>

              {/* Animated Stars */}
              <div className="flex gap-1 mt-4 text-2xl">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      delay: i * 0.08,
                    }}
                  >
                    <FaStar
                      className={
                        i < testimonials[currentIndex].rating
                          ? "text-yellow-400 drop-shadow-lg"
                          : "text-gray-300"
                      }
                    />
                  </motion.span>
                ))}
              </div>

              {/* Comment */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-gray-700 text-xl leading-relaxed max-w-2xl font-light italic"
              >
                "{testimonials[currentIndex].comment}"
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={prevSlide}
              className="group p-3 rounded-full bg-white/60 backdrop-blur-sm border border-rose-200/50 text-rose-500 hover:bg-rose-100 hover:border-rose-300 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              aria-label="Previous review"
            >
              <FaChevronLeft className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    idx === currentIndex
                      ? "w-12 bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg shadow-rose-500/30"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="group p-3 rounded-full bg-white/60 backdrop-blur-sm border border-rose-200/50 text-rose-500 hover:bg-rose-100 hover:border-rose-300 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              aria-label="Next review"
            >
              <FaChevronRight className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;