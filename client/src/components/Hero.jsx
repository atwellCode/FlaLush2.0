import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  FaArrowRight,
  FaLeaf,
  FaShippingFast,
  FaAward,
  FaStar,
  FaChevronDown,
  FaQuoteLeft,
  FaGem,
  FaSpa,
  FaHeart,
  FaShieldAlt,
} from "react-icons/fa";
import heroModel from "../assets/images/hero-model.jpg";

const Hero = () => {
  // Mouse tracking for 3D product tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Floating particles config
  const particles = [
    { size: "w-4 h-4", top: "10%", left: "5%", delay: 0, duration: 6 },
    { size: "w-3 h-3", top: "20%", right: "8%", delay: 1, duration: 7 },
    { size: "w-5 h-5", bottom: "30%", left: "3%", delay: 2, duration: 5 },
    { size: "w-2 h-2", top: "60%", right: "5%", delay: 0.5, duration: 8 },
    { size: "w-6 h-6", bottom: "15%", right: "15%", delay: 1.5, duration: 9 },
    { size: "w-3 h-3", top: "45%", left: "8%", delay: 3, duration: 6 },
  ];

  return (
    <main className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#fdf2f2] via-[#fff5f5] to-[#fce4e4]">

      {/* ===== BACKGROUND DECORATIVE ELEMENTS ===== */}

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-rose-300/20 to-pink-300/20 blur-[140px] pointer-events-none"
      />

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-amber-200/15 to-rose-200/20 blur-[160px] pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-pink-200/10 blur-[120px] pointer-events-none"
      />

      {/* Floating particles with 3D depth */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute rounded-full bg-gradient-to-br from-rose-400/20 to-pink-400/20 backdrop-blur-sm border border-rose-200/20 ${p.size}`}
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            bottom: p.bottom,
          }}
        />
      ))}

      {/* Gold accent rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-[15%] right-[8%] w-40 h-40 rounded-full border border-amber-300/15 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[20%] left-[5%] w-56 h-56 rounded-full border border-rose-200/10 pointer-events-none"
      />

      {/* ===== MAIN CONTENT ===== */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-16 lg:py-0">

          {/* ===== LEFT COLUMN ===== */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-md border border-rose-200/30 rounded-full px-6 py-2.5 shadow-sm"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              <FaLeaf className="text-rose-500 text-sm" />
              <span className="text-sm font-medium text-gray-700 tracking-wide">
                100% Organic · Premium Beauty
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="space-y-2"
            >
              <div className="text-4xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.08] tracking-tight">
                <span className="text-gray-900">Discover Your</span>
                <br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400">
                    Natural Glow
                  </span>

                
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <FaGem className="text-amber-400 text-lg" />
                <span className="text-sm font-light text-gray-400 tracking-widest uppercase">
                  Luxury Skincare Essentials
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-gray-600 leading-relaxed max-w-lg font-light"
            >
              Elevate your skincare ritual with our curated collection of
              dermatologist-approved essentials, crafted from the finest
              natural ingredients for radiant, healthy skin.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden bg-gradient-to-r from-rose-500 to-pink-500 text-white px-9 py-4 rounded-full font-medium shadow-xl shadow-rose-500/25 flex items-center gap-3"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Shop Collection
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
                  className="absolute inset-0 bg-white/10 rounded-full"
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-9 py-4 rounded-full font-medium text-rose-600 border-2 border-rose-200/60 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-rose-400 transition-all duration-300"
              >
                Explore More
              </motion.button>
            </motion.div>

            {/* Social Proof - Rating */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap items-center gap-8 pt-4"
            >
              <div className="flex -space-x-3">
                {[32, 45, 15, 52, 68].map((id, i) => (
                  <motion.img
                    key={id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    src={`https://i.pravatar.cc/60?img=${id}`}
                    alt=""
                    className="w-11 h-11 rounded-full border-2 border-white shadow-md"
                  />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 text-amber-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + i * 0.08 }}
                    >
                      <FaStar />
                    </motion.span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  Trusted by <span className="text-rose-500 font-bold">25,000+</span> beauty lovers
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-3 gap-8 pt-2 border-t border-rose-100/50"
            >
              {[
                { value: "25K+", label: "Happy Customers", icon: FaHeart },
                { value: "250+", label: "Premium Products", icon: FaSpa },
                { value: "4.9★", label: "Average Rating", icon: FaShieldAlt },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="group"
                >
                  <div className="flex items-center gap-2">
                    <stat.icon className="text-rose-400/60 text-sm group-hover:text-rose-500 transition-colors" />
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                      {stat.value}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 font-light tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>

          {/* ===== RIGHT COLUMN - 3D PRODUCT ===== */}

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center items-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1000px" }}
          >

            {/* Glow behind product */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-r from-rose-300/30 to-pink-300/30 blur-[130px]"
            />

            {/* Decorative ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[480px] h-[480px] rounded-full border border-rose-200/15 pointer-events-none"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[520px] h-[520px] rounded-full border border-amber-200/10 pointer-events-none"
            />

            {/* 3D Product Image */}
            <motion.div
              style={{
                rotateX: springX,
                rotateY: springY,
                transformStyle: "preserve-3d",
              }}
              className="relative z-20"
            >
              <motion.img
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                src={heroModel}
                alt="Luxury Beauty Serum"
                className="w-[380px] lg:w-[430px] drop-shadow-2xl"
              />

              {/* 3D floating shine overlay */}
              <motion.div
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] pointer-events-none"
                style={{ transform: "translateZ(50px)" }}
              />
            </motion.div>

            {/* Floating Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, x: 60, y: -30 }}
              animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
              transition={{
                duration: 0.8,
                delay: 1.2,
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                x: { duration: 0.8, delay: 1.2 },
                opacity: { duration: 0.8, delay: 1.2 },
              }}
              className="absolute top-[5%] -right-[5%] lg:top-[10%] lg:-right-[8%] bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 max-w-[220px] z-30 hidden sm:block border border-white/30"
            >
              <FaQuoteLeft className="text-rose-400 text-lg mb-2" />
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                "My skin has never felt this radiant. Absolutely transformative!"
              </p>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">Emma Wilson</h4>
                  <span className="text-xs text-gray-400">Verified Buyer</span>
                </div>
                <div className="flex text-amber-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating Card 1 - Award */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: 40 }}
              animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
              transition={{
                duration: 0.7,
                delay: 1.4,
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                x: { duration: 0.7, delay: 1.4 },
                opacity: { duration: 0.7, delay: 1.4 },
              }}
              className="absolute left-0 top-[15%] lg:left-[-12%] lg:top-[20%] bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl px-5 py-4 z-30 border border-white/30"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 20, scale: 1.1 }}
                  className="bg-gradient-to-br from-amber-100 to-rose-100 p-3 rounded-full"
                >
                  <FaAward className="text-amber-500 text-lg" />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">Premium Quality</h4>
                  <p className="text-xs text-gray-400">Luxury Formula</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2 - Shipping */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: -40 }}
              animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
              transition={{
                duration: 0.7,
                delay: 1.6,
                y: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                x: { duration: 0.7, delay: 1.6 },
                opacity: { duration: 0.7, delay: 1.6 },
              }}
              className="absolute bottom-[10%] right-0 lg:bottom-[15%] lg:right-[-10%] bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl px-5 py-4 z-30 border border-white/30"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-full"
                >
                  <FaShippingFast className="text-emerald-500 text-lg" />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">Free Shipping</h4>
                  <p className="text-xs text-gray-400">Worldwide Delivery</p>
                </div>
              </div>
            </motion.div>

            {/* Floating gold badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.6, type: "spring" }}
              className="absolute top-[40%] -left-[8%] lg:top-[45%] lg:-left-[6%] z-30"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-gradient-to-br from-amber-400 to-amber-300 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-amber-400/30"
              >
                <FaStar className="text-xl" />
              </motion.div>
            </motion.div>

          </motion.div>

        </div>

      </div>

      {/* ===== SCROLL INDICATOR ===== */}

      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-rose-400/60"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-light text-gray-400">
          Scroll
        </span>
        <FaChevronDown className="mt-2 text-sm" />
      </motion.div>

      {/* ===== DECORATIVE BOTTOM CURVE ===== */}

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />

    </main>
  );
};

export default Hero;