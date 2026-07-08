import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import Quality from "@/pages/Quality";
import PrivateLabel from "@/pages/PrivateLabel";
import GlobalExports from "@/pages/GlobalExports";
import Regulatory from "@/pages/Regulatory";
import Contact from "@/pages/Contact";
import Quotation from "@/pages/Quotation";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/private-label" element={<PrivateLabel />} />
          <Route path="/global-exports" element={<GlobalExports />} />
          <Route path="/regulatory" element={<Regulatory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quotation" element={<Quotation />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
