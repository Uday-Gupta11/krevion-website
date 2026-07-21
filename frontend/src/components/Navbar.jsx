import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, LOGO_URL, COMPANY } from "@/lib/data";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm" : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-3 group">
          <img src={LOGO_URL} alt="Exelvia Healthcare" className="h-9 sm:h-10 w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              data-testid={`nav-link-${link.name.toLowerCase().replace(/\s/g, "-")}`}
              className={({ isActive }) =>
                `nav-underline text-sm font-medium transition-colors ${
                  isActive ? "text-krevion-teal active" : "text-krevion-dark hover:text-krevion-teal"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/quotation"
            data-testid="nav-quotation-btn"
            className="hidden lg:inline-flex items-center gap-2 bg-krevion-navy text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-krevion-teal hover:-translate-y-0.5 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            Request Quotation <ChevronRight className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setOpen((s) => !s)}
            data-testid="nav-mobile-toggle"
            className="lg:hidden p-2 rounded-lg hover:bg-krevion-light"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6 text-krevion-navy" /> : <Menu className="h-6 w-6 text-krevion-navy" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  data-testid={`mobile-nav-link-${link.name.toLowerCase().replace(/\s/g, "-")}`}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-medium ${
                      isActive ? "bg-krevion-light text-krevion-teal" : "text-krevion-dark hover:bg-krevion-light"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <Link
                to="/quotation"
                data-testid="mobile-nav-quotation"
                className="mt-3 inline-flex items-center justify-center gap-2 bg-krevion-navy text-white text-sm font-semibold px-5 py-3 rounded-full"
              >
                Request Quotation <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
