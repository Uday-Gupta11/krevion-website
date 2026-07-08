import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, X, Mail } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { PRODUCTS, PRODUCT_CATEGORIES, THERAPEUTIC_SEGMENTS, IMAGES } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { PageHero } from "./About";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const InquiryDialog = ({ product, open, onOpenChange }) => {
  const [form, setForm] = useState({ name: "", email: "", company: "", country: "", message: "" });
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/product-inquiry`, { ...form, product_id: product.id, product_name: product.name });
      toast.success("Inquiry sent. Our team will contact you shortly.");
      onOpenChange(false);
      setForm({ name: "", email: "", company: "", country: "", message: "" });
    } catch {
      toast.error("Unable to send inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="product-inquiry-dialog" className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-krevion-navy">Inquire about {product?.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" data-testid="inquiry-name" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" data-testid="inquiry-email" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
          <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company" data-testid="inquiry-company" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
          <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="Country" data-testid="inquiry-country" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
          <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Quantity, target market, additional details" rows={4} data-testid="inquiry-message" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none" />
          <button type="submit" disabled={loading} data-testid="inquiry-submit-btn" className="w-full bg-krevion-navy text-white font-semibold py-3 rounded-full hover:bg-krevion-teal transition-colors disabled:opacity-60">
            {loading ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Products = () => {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(params.get("cat") || "all");
  const [seg, setSeg] = useState("all");
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const c = params.get("cat");
    if (c) setCat(c);
  }, [params]);

  const list = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchQ = !q || `${p.name} ${p.generic} ${p.segment} ${p.form}`.toLowerCase().includes(q.toLowerCase());
      const matchCat = cat === "all" || p.category === cat;
      const matchSeg = seg === "all" || p.segment === seg;
      return matchQ && matchCat && matchSeg;
    });
  }, [q, cat, seg]);

  const reset = () => { setQ(""); setCat("all"); setSeg("all"); setParams({}); };

  return (
    <main data-testid="products-page">
      <PageHero
        eyebrow="Our Portfolio"
        title="Pharmaceutical & healthcare products"
        subtitle="Browse formulations across dosage forms and therapeutic categories. Filter, search and request product-specific quotations."
        image={IMAGES.pills}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row gap-3 md:items-center mb-10 bg-krevion-light p-3 rounded-2xl">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, generic or segment..."
                data-testid="product-search-input"
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-krevion-teal focus:outline-none"
              />
            </div>
            <Select value={cat} onValueChange={setCat}>
              <SelectTrigger data-testid="product-category-filter" className="md:w-56 bg-white"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {PRODUCT_CATEGORIES.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={seg} onValueChange={setSeg}>
              <SelectTrigger data-testid="product-segment-filter" className="md:w-56 bg-white"><SelectValue placeholder="Segment" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All segments</SelectItem>
                {THERAPEUTIC_SEGMENTS.map((s) => (
                  <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button onClick={reset} data-testid="product-reset-filters" className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-krevion-navy hover:bg-krevion-light flex items-center gap-2"><X className="h-4 w-4" /> Reset</button>
          </div>

          <div className="text-sm text-gray-500 mb-6" data-testid="product-result-count">Showing <span className="font-semibold text-krevion-navy">{list.length}</span> products</div>

          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((p) => (
              <motion.div key={p.id} variants={fadeUp} data-testid={`product-card-${p.id}`} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-krevion-teal font-semibold">{p.form}</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] bg-krevion-light text-krevion-navy px-2 py-1 rounded">{p.segment}</div>
                </div>
                <h3 className="font-heading text-lg font-semibold text-krevion-navy">{p.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{p.generic}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-gray-400">Strength</span><div className="text-krevion-dark font-medium">{p.strength}</div></div>
                  <div><span className="text-gray-400">Pack</span><div className="text-krevion-dark font-medium">{p.pack}</div></div>
                </div>
                <p className="text-xs text-gray-600 mt-4 leading-relaxed">{p.desc}</p>
                <button
                  onClick={() => { setSelected(p); setOpen(true); }}
                  data-testid={`product-inquire-${p.id}`}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-krevion-navy text-white text-sm font-semibold py-2.5 rounded-full hover:bg-krevion-teal transition-colors"
                >
                  <Mail className="h-4 w-4" /> Send Inquiry
                </button>
              </motion.div>
            ))}
          </motion.div>

          {list.length === 0 && (
            <div className="text-center py-20 text-gray-500" data-testid="product-empty-state">
              <Filter className="h-10 w-10 mx-auto text-gray-300 mb-3" />
              No products match your filters. <button onClick={reset} className="text-krevion-teal font-semibold ml-2">Reset</button>
            </div>
          )}
        </div>
      </section>

      {selected && <InquiryDialog product={selected} open={open} onOpenChange={setOpen} />}
    </main>
  );
};

export default Products;
