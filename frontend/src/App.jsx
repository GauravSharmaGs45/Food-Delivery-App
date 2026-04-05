import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import Delivery from "./pages/Delivery/Delivery";
import Privacy from "./pages/Privacy/Privacy";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import MobileApp from "./pages/MobileApp/MobileApp";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className="app">
        <ToastContainer />

        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/about" element={<About />} />
<Route path="/delivery" element={<Delivery />} />
<Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/mobile-app" element={<MobileApp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;