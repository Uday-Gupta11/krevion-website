import React from "react";
import { MessageCircle } from "lucide-react";
import { COMPANY } from "@/lib/data";

const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}`}
    target="_blank"
    rel="noopener noreferrer"
    data-testid="whatsapp-floating-btn"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-20 right-5 z-40 group"
  >
    <span className="absolute inset-0 rounded-full bg-emerald-500 animate-pulse-ring opacity-40" />
    <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 text-white shadow-xl group-hover:bg-emerald-600 transition-all">
      <MessageCircle className="h-6 w-6" />
    </span>
  </a>
);

export default WhatsAppButton;
