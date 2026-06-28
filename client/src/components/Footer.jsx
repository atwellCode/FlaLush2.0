import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
  FaTiktok,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaApplePay,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <footer className="relative bg-gradient-to-b from-rose-600 to-rose-700 text-white overflow-hidden">
      {/* Decorative glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] rounded-full bg-rose-400/20 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-rose-400/30"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold font-['Cormorant']">
              Flu<span className="text-rose-200">Lush</span>
            </h2>
            <p className="text-rose-100 font-light leading-relaxed max-w-sm">
              Discover premium beauty products that enhance your natural glow.
              Luxury skincare, cosmetics, and self-care essentials delivered to
              your doorstep.
            </p>
            <div className="flex gap-4 text-xl text-rose-200">
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Pinterest"
              >
                <FaPinterestP />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>
            </div>
          </motion.div>

          {/* Shop Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-5 font-['Cormorant']">
              Shop
            </h3>
            <ul className="space-y-3 text-rose-100">
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/best-sellers" className="hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-white transition-colors">
                  Special Offers
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">
                  Wishlist
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Customer Care */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-5 font-['Cormorant']">
              Customer Care
            </h3>
            <ul className="space-y-3 text-rose-100">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-5 font-['Cormorant']">
              Contact
            </h3>
            <div className="space-y-4 text-rose-100">
              <div className="flex gap-3 items-start">
                <MdLocationOn className="text-xl mt-1" />
                <span>Lahore, Pakistan</span>
              </div>
              <div className="flex gap-3 items-center">
                <MdPhone />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex gap-3 items-center">
                <MdEmail />
                <span>support@flulush.com</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center py-6 gap-4"
        >
          <p className="text-rose-200 text-sm font-light order-2 md:order-1">
            &copy; {currentYear} FluLush. All Rights Reserved.
          </p>

          {/* Payment Icons */}
          <div className="flex items-center gap-4 text-2xl text-rose-200 order-1 md:order-2">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
            <FaCcAmex />
            <FaApplePay />
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;