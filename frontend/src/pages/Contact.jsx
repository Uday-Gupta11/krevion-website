import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { PageHero } from "./About";
import { IMAGES, COMPANY } from "@/lib/data";
import { fadeUp, viewportOnce } from "@/lib/motion";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Contact = () => {
  const [form, setForm] = useState({ name: "", company: "", country: "", phone: "", email: "", required_products: "", target_market: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent. Our team will get back within 1 business day.");
      setForm({ name: "", company: "", country: "", phone: "", email: "", required_products: "", target_market: "", message: "" });
    } catch {
      toast.error("Unable to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main data-testid="contact-page">
      <PageHero
        eyebrow="Get in Touch"
        title="Talk to the Exelvia team"
        subtitle="Distributors, importers, hospital networks and tender authorities — we respond within one business day."
        image={IMAGES.researcher}
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-5 gap-10">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="lg:col-span-2 space-y-6">
            <div className="bg-krevion-navy text-white rounded-2xl p-8">
              <h3 className="font-heading text-2xl font-bold">Contact Information</h3>
              <p className="text-sm text-white/75 mt-3">Reach out for product inquiries, partnerships and regulatory queries.</p>
              <div className="mt-7 space-y-5 text-sm">
                <div className="flex items-start gap-3"><Mail className="h-5 w-5 text-krevion-accent mt-0.5" /><div><div className="text-[10px] uppercase tracking-[0.18em] text-krevion-accent font-semibold">Email</div><div>{COMPANY.email}</div></div></div>
                <div className="flex items-start gap-3"><Phone className="h-5 w-5 text-krevion-accent mt-0.5" /><div><div className="text-[10px] uppercase tracking-[0.18em] text-krevion-accent font-semibold">Phone</div><div>{COMPANY.phone}</div></div></div>
                <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-krevion-accent mt-0.5" /><div><div className="text-[10px] uppercase tracking-[0.18em] text-krevion-accent font-semibold">Address</div><div>{COMPANY.address}</div></div></div>
              </div>
              <a href={`https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" data-testid="contact-whatsapp-btn" className="mt-7 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-3 rounded-full transition-colors text-sm">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-100 aspect-[4/3] bg-krevion-light flex items-center justify-center text-gray-400" data-testid="contact-map">
              <iframe
                title="Exelvia Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=72.0,18.8,73.2,19.4&layer=mapnik"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            data-testid="contact-form"
            className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-4"
          >
            <h3 className="font-heading text-2xl font-bold text-krevion-navy">Send us a message</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name *" data-testid="contact-name" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company" data-testid="contact-company" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
              <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="Country" data-testid="contact-country" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" data-testid="contact-phone" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email *" data-testid="contact-email" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none sm:col-span-2" />
              <input value={form.required_products} onChange={(e) => setForm({ ...form, required_products: e.target.value })} placeholder="Required products" data-testid="contact-products" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
              <input value={form.target_market} onChange={(e) => setForm({ ...form, target_market: e.target.value })} placeholder="Target market" data-testid="contact-market" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
            </div>
            <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message *" rows={5} data-testid="contact-message" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
            <button type="submit" disabled={loading} data-testid="contact-submit-btn" className="inline-flex items-center gap-2 bg-krevion-navy text-white font-semibold px-7 py-3.5 rounded-full hover:bg-krevion-teal transition-colors disabled:opacity-60">
              {loading ? "Sending..." : (<>Send Message <Send className="h-4 w-4" /></>)}
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
