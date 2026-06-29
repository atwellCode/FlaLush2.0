import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Product";
import NewArrivals from "./pages/NewArrivals";
import Checkout from "./pages/CheckOut";
import Login from "./pages/Login";
import ScrollToTop from "./layout/ScrollToTop";
import ProductDetail from "./components/ProductDetail";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>

        {/* Layout Route */}
        <Route path="/" element={<MainLayout />}>

          {/* Pages */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="new-arrivals" element={<NewArrivals />} />
          <Route path="products" element={<Products />} />
           <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;