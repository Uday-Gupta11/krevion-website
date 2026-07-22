import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Send } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { LOGO_URL, COMPANY, NAV_LINKS, PRODUCT_CATEGORIES } from "@/lib/data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email });
      toast.success("Subscribed. Thank you for joining Exelvia updates.");
      setEmail("");
    } catch (err) {
      if (err.response?.status === 409) toast.info("This email is already subscribed.");
      else toast.error("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer data-testid="site-footer" className="bg-krevion-navy text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center mb-6">
              <div className="rounded-xl bg-white px-4 py-3 shadow-lg inline-flex items-center">
                <img src={LOGO_URL} alt="Exelvia Healthcare" className="h-8 w-auto object-contain" />
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              {COMPANY.promise}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-krevion-accent font-semibold">{COMPANY.tagline}</p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-krevion-accent mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-white/80 hover:text-krevion-teal transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-krevion-accent mb-5">Products</h4>
            <ul className="space-y-3">
              {PRODUCT_CATEGORIES.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link to={`/products?cat=${c.slug}`} className="text-sm text-white/80 hover:text-krevion-teal transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-krevion-accent mb-5">Stay Connected</h4>
            <p className="text-sm text-white/70 mb-4">Subscribe for product launches, regulatory updates and market insights.</p>
            <form onSubmit={subscribe} className="flex gap-2 mb-6">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                data-testid="footer-newsletter-input"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-krevion-teal"
              />
              <button
                type="submit"
                disabled={loading}
                data-testid="footer-newsletter-submit"
                className="bg-krevion-teal hover:bg-krevion-accent rounded-full px-4 transition-colors disabled:opacity-60"
                aria-label="Subscribe"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-krevion-teal" /> {COMPANY.email}</li>
              <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-krevion-teal" /> {COMPANY.phone}</li>
              <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-krevion-teal" /> {COMPANY.phone2}</li>
              <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-krevion-teal" /> {COMPANY.phone3}</li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-krevion-teal" /> {COMPANY.address}</li>
            </ul>
            <div className="flex gap-3 mt-6">
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 hover:bg-krevion-teal flex items-center justify-center transition-colors"><Linkedin className="h-4 w-4" /></a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white/10 hover:bg-krevion-teal flex items-center justify-center transition-colors"><Twitter className="h-4 w-4" /></a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-krevion-teal flex items-center justify-center transition-colors"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div>© {new Date().getFullYear()} Exelvia Healthcare. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-krevion-teal">Privacy Policy</Link>
            <Link to="#" className="hover:text-krevion-teal">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
