// src/pages/About.jsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaLeaf,
  FaFlask,
  FaHeart,
  FaAward,
  FaGem,
  FaUsers,
  FaShoppingBag,
  FaStar,
  FaArrowRight,
  FaQuoteLeft,
} from "react-icons/fa";

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);

  const brandPillars = [
    {
      icon: FaLeaf,
      title: "100% Natural",
      description:
        "We source only the finest organic ingredients from sustainable farms worldwide.",
      color: "from-emerald-400 to-green-500",
      bgColor: "bg-emerald-50",
    },
    {
      icon: FaFlask,
      title: "Science-Backed",
      description:
        "Every formula is developed with dermatologists and tested for efficacy.",
      color: "from-blue-400 to-sky-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: FaHeart,
      title: "Cruelty-Free",
      description:
        "We never test on animals. Proudly certified by PETA and Leaping Bunny.",
      color: "from-rose-400 to-pink-500",
      bgColor: "bg-rose-50",
    },
    {
      icon: FaGem,
      title: "Luxury Quality",
      description:
        "Premium formulations with high-performance actives for visible results.",
      color: "from-amber-400 to-yellow-500",
      bgColor: "bg-amber-50",
    },
  ];

  const stats = [
    { value: "25K+", label: "Happy Customers", icon: FaUsers },
    { value: "250+", label: "Luxury Products", icon: FaShoppingBag },
    { value: "4.9★", label: "Average Rating", icon: FaStar },
    { value: "12+", label: "Industry Awards", icon: FaAward },
  ];

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50">
        {/* Background decorative orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-100/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              style={{ y: titleY, opacity }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm text-rose-600 font-medium border border-white/40"
              >
                <FaLeaf className="text-xs" />
                <span>Our Story</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
              >
                Beauty That
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                  Comes From Within
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg text-gray-500 leading-relaxed max-w-lg"
              >
                FluLush was born from a simple belief: luxury skincare should be
                effective, ethical, and accessible. We blend the best of nature
                and science to help you discover your most radiant self.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/products"
                  className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium flex items-center gap-2 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition"
                >
                  Explore Products <FaArrowRight className="text-sm" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3 border-2 border-rose-200 text-rose-600 rounded-full font-medium hover:bg-rose-50 transition"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-pink-400/20 rounded-full blur-2xl" />
                <div className="relative bg-white/60 backdrop-blur-sm rounded-full p-8 shadow-2xl border border-white/40">
                  <img
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=600&fit=crop&crop=center"
                    alt="FluLush Beauty"
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -right-4 bg-white shadow-xl rounded-2xl px-4 py-3 border border-rose-100"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Since 2020</p>
                      <p className="text-[10px] text-gray-400">Luxury skincare</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-16 bg-gradient-to-b from-white to-rose-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpVariants}
                className="text-center"
              >
                <stat.icon className="text-3xl text-rose-400 mx-auto mb-2" />
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-400 font-light mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center space-y-6"
          >
            <FaQuoteLeft className="text-5xl text-rose-200 mx-auto" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-['Cormorant']">
              Our Philosophy
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
              We believe that true beauty begins with self-care. Every product
              we create is a celebration of your unique radiance – formulated
              with integrity, inspired by nature, and backed by science.
            </p>
            <p className="text-gray-400 font-light max-w-xl mx-auto">
              From our sustainable packaging to our cruelty-free certifications,
              we're committed to making choices that are good for you and good
              for the planet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== BRAND PILLARS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-rose-100/60 backdrop-blur-sm px-5 py-2 rounded-full text-rose-600 text-sm font-medium mb-4">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Core Values</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {brandPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`${pillar.bgColor} rounded-3xl p-8 border border-white/50 shadow-sm hover:shadow-xl transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white text-2xl mb-4 shadow-lg`}>
                  <pillar.icon />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TEAM / FOUNDERS ===== */}
      <section className="py-20 bg-gradient-to-b from-rose-50/30 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-rose-100/60 backdrop-blur-sm px-5 py-2 rounded-full text-rose-600 text-sm font-medium mb-4">
              The Faces Behind FluLush
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Team</span>
            </h2>
            <p className="mt-2 text-gray-400 font-light">
              Passionate experts dedicated to your beauty journey.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image: "https://i.pravatar.cc/300?img=11",
                bio: "Former cosmetic chemist with a passion for clean beauty.",
              },
              {
                name: "Dr. Emily Chen",
                role: "Head of R&D",
                image: "https://i.pravatar.cc/300?img=45",
                bio: "Dermatologist and formulation expert with 15 years of experience.",
              },
              {
                name: "Maria Garcia",
                role: "Creative Director",
                image: "https://i.pravatar.cc/300?img=25",
                bio: "Brand storyteller obsessed with aesthetic and sustainability.",
              },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpVariants}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-6 text-center shadow-lg border border-rose-100/30 hover:shadow-xl transition"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-rose-100 object-cover"
                />
                <h4 className="text-lg font-bold text-gray-800">{member.name}</h4>
                <p className="text-sm text-rose-500 font-medium">{member.role}</p>
                <p className="text-sm text-gray-400 font-light mt-2">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 bg-gradient-to-br from-rose-500 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Join the Glow Community
            </h2>
            <p className="text-rose-100 text-lg max-w-lg mx-auto">
              Subscribe to receive 10% off your first order and exclusive access
              to new arrivals and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-rose-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-8 py-3 bg-white text-rose-600 rounded-full font-medium hover:bg-rose-50 transition shadow-lg">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-rose-200 opacity-80">
              No spam, ever. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;