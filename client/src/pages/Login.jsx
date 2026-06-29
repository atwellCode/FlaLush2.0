// src/pages/Login.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaApple,
  FaCheckCircle,
  FaLeaf,
} from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData({
      ...signupData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      navigate("/");
    }, 2000);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsLogin(true);
    }, 2000);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setIsSubmitted(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Animation variants
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
    visible: { opacity: 1, y: 0 },
  };

  const formVariants = {
    enter: (direction) => ({
      x: direction ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: (direction) => ({
      x: direction ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-100/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating leaves */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 text-4xl opacity-20 pointer-events-none"
      >
        <FaLeaf />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-10 text-3xl opacity-20 pointer-events-none"
      >
        <FaLeaf />
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 md:p-10 relative z-10">
          {/* Brand Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Link
              to="/"
              className="text-3xl font-bold text-gray-800 font-['Cormorant'] inline-block"
            >
              Flu<span className="text-rose-500">Lush</span>
            </Link>
            <p className="text-sm text-gray-400 mt-1 font-light">
              {isLogin ? "Welcome back, beauty!" : "Start your glow journey"}
            </p>
          </motion.div>

          {/* Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex bg-rose-100/60 rounded-2xl p-1 mb-8 relative"
          >
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                isLogin
                  ? "bg-white text-rose-600 shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                !isLogin
                  ? "bg-white text-rose-600 shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign Up
            </button>
          </motion.div>

          {/* Forms */}
          <AnimatePresence mode="wait" custom={isLogin}>
            {isLogin ? (
              <motion.div
                key="login"
                custom={isLogin}
                variants={formVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        required
                        className="w-full pl-11 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                        className="w-full pl-11 pr-12 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                      <input type="checkbox" className="accent-rose-500 w-4 h-4" />
                      Remember me
                    </label>
                    <button
                      type="button"
                      className="text-sm text-rose-500 hover:text-rose-600 transition font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition"
                  >
                    {isSubmitted ? (
                      <FaCheckCircle className="text-xl" />
                    ) : (
                      "Login"
                    )}
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                custom={isLogin}
                variants={formVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="text"
                        name="name"
                        value={signupData.name}
                        onChange={handleSignupChange}
                        required
                        className="w-full pl-11 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                        placeholder="Jane Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="email"
                        name="email"
                        value={signupData.email}
                        onChange={handleSignupChange}
                        required
                        className="w-full pl-11 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={signupData.password}
                        onChange={handleSignupChange}
                        required
                        className="w-full pl-11 pr-12 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                        required
                        className="w-full pl-11 pr-12 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={signupData.agreeTerms}
                      onChange={handleSignupChange}
                      required
                      className="accent-rose-500 w-4 h-4"
                    />
                    <label className="text-sm text-gray-500 font-light">
                      I agree to the{" "}
                      <button
                        type="button"
                        className="text-rose-500 hover:text-rose-600 transition font-medium"
                      >
                        Terms of Service
                      </button>
                      {" "}and{" "}
                      <button
                        type="button"
                        className="text-rose-500 hover:text-rose-600 transition font-medium"
                      >
                        Privacy Policy
                      </button>
                    </label>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition"
                  >
                    {isSubmitted ? (
                      <FaCheckCircle className="text-xl" />
                    ) : (
                      "Create Account"
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-rose-200/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/70 text-gray-400 font-light">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-3"
          >
            <button
              type="button"
              className="flex-1 py-2.5 border border-rose-200/50 rounded-2xl text-gray-600 hover:bg-rose-50 hover:border-rose-300 transition flex items-center justify-center gap-2"
            >
              <FaGoogle className="text-red-500" />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button
              type="button"
              className="flex-1 py-2.5 border border-rose-200/50 rounded-2xl text-gray-600 hover:bg-rose-50 hover:border-rose-300 transition flex items-center justify-center gap-2"
            >
              <FaFacebook className="text-blue-600" />
              <span className="text-sm font-medium">Facebook</span>
            </button>
            <button
              type="button"
              className="flex-1 py-2.5 border border-rose-200/50 rounded-2xl text-gray-600 hover:bg-rose-50 hover:border-rose-300 transition flex items-center justify-center gap-2"
            >
              <FaApple className="text-gray-700" />
              <span className="text-sm font-medium">Apple</span>
            </button>
          </motion.div>
        </div>

        {/* Bottom link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6 text-sm text-gray-400"
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={toggleMode}
            className="ml-1 text-rose-500 hover:text-rose-600 transition font-medium"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;