import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Send, CheckCircle2 } from "lucide-react";
import { PageHero } from "./About";
import { IMAGES, PRODUCT_CATEGORIES } from "@/lib/data";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Quotation = () => {
  const [form, setForm] = useState({ name: "", company: "", country: "", phone: "", email: "", product_category: "", required_products: "", quantity: "", target_market: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/quotation`, form);
      setDone(true);
      toast.success("Quotation request submitted.");
      setForm({ name: "", company: "", country: "", phone: "", email: "", product_category: "", required_products: "", quantity: "", target_market: "", notes: "" });
    } catch {
      toast.error("Unable to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main data-testid="quotation-page">
      <PageHero
        eyebrow="Request Quotation"
        title="Tell us what you need"
        subtitle="Share your requirements and our export team will revert with pricing, lead time and documentation details."
        image={IMAGES.manufacturing}
      />

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {done && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-3" data-testid="quotation-success">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
              <div>
                <div className="font-heading font-semibold text-emerald-900">Request received</div>
                <div className="text-sm text-emerald-800">Our export team will be in touch shortly with pricing and lead time details.</div>
              </div>
            </motion.div>
          )}
          <motion.form
            onSubmit={submit}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            data-testid="quotation-form"
            className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name *" data-testid="quot-name" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
              <input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company *" data-testid="quot-company" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
              <input required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="Country *" data-testid="quot-country" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" data-testid="quot-phone" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email *" data-testid="quot-email" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none sm:col-span-2" />
              <Select value={form.product_category} onValueChange={(v) => setForm({ ...form, product_category: v })}>
                <SelectTrigger data-testid="quot-category" className="bg-white"><SelectValue placeholder="Product category" /></SelectTrigger>
                <SelectContent>
                  {PRODUCT_CATEGORIES.map((c) => (
                    <SelectItem key={c.slug} value={c.name}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="Estimated quantity" data-testid="quot-quantity" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
            </div>
            <input required value={form.required_products} onChange={(e) => setForm({ ...form, required_products: e.target.value })} placeholder="Required products (generic names / brand names) *" data-testid="quot-products" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
            <input value={form.target_market} onChange={(e) => setForm({ ...form, target_market: e.target.value })} placeholder="Target market / destination country" data-testid="quot-target" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Additional notes — pack sizes, registration status, timelines" rows={4} data-testid="quot-notes" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
            <button type="submit" disabled={loading} data-testid="quot-submit-btn" className="inline-flex items-center gap-2 bg-krevion-navy text-white font-semibold px-7 py-3.5 rounded-full hover:bg-krevion-teal transition-colors disabled:opacity-60">
              {loading ? "Submitting..." : (<>Submit Request <Send className="h-4 w-4" /></>)}
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
};

export default Quotation;
