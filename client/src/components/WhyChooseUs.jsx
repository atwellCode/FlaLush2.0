// WhyChooseUs.jsx
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaFlask,
  FaHeart,
  FaShippingFast,
  FaAward,
  FaShieldAlt,
} from "react-icons/fa";

const benefits = [
  {
    icon: FaLeaf,
    title: "100% Organic",
    description: "Sourced from certified organic farms, free from pesticides and synthetic chemicals.",
    gradient: "from-green-100 to-emerald-100",
    color: "text-emerald-600",
  },
  {
    icon: FaFlask,
    title: "Dermatologist-Tested",
    description: "Clinically proven safe and effective for all skin types, even sensitive skin.",
    gradient: "from-blue-100 to-sky-100",
    color: "text-sky-600",
  },
  {
    icon: FaHeart,
    title: "Cruelty-Free",
    description: "Never tested on animals. Proudly certified by PETA and Leaping Bunny.",
    gradient: "from-rose-100 to-pink-100",
    color: "text-rose-600",
  },
  {
    icon: FaShippingFast,
    title: "Free Shipping",
    description: "Enjoy complimentary worldwide delivery on all orders over $50.",
    gradient: "from-amber-100 to-orange-100",
    color: "text-amber-600",
  },
  {
    icon: FaAward,
    title: "Award-Winning",
    description: "Recognized by leading beauty industry awards for innovation and quality.",
    gradient: "from-yellow-100 to-amber-100",
    color: "text-yellow-600",
  },
  {
    icon: FaShieldAlt,
    title: "100% Satisfaction",
    description: "Love it or get a full refund. Your satisfaction is our top priority.",
    gradient: "from-purple-100 to-indigo-100",
    color: "text-purple-600",
  },
];

const WhyChooseUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-rose-50/30 via-white to-white overflow-hidden">
      {/* Background glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-pink-200/10 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
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
            className="inline-block bg-rose-100/60 backdrop-blur-sm px-5 py-2 rounded-full text-rose-600 text-sm font-medium mb-4"
          >
            Why We're Different
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Crafted with <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Love & Science</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg font-light">
            Every product is thoughtfully formulated to deliver visible results while being kind to your skin and the planet.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { type: "spring", stiffness: 200 },
              }}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-rose-100/30 hover:shadow-2xl hover:shadow-rose-200/20 transition-all duration-500"
            >
              {/* Icon with gradient background */}
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-5 group-hover:shadow-lg transition-shadow`}
              >
                <benefit.icon className={`text-3xl ${benefit.color}`} />
              </motion.div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-500 font-light leading-relaxed">
                {benefit.description}
              </p>

              {/* Decorative floating dot */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
                className={`absolute bottom-6 right-6 w-3 h-3 rounded-full ${benefit.color} opacity-30`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;