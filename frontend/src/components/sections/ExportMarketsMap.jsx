import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Radio } from "lucide-react";
import { EXPORT_MARKETS } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

// Silhouette world map background — reliable CDN PNG (Pixabay, public domain)
const WORLD_MAP_URL = "https://cdn.pixabay.com/photo/2013/07/12/13/04/world-146691_1280.png";

// Geo → SVG conversion (viewBox 1000x500 equirectangular)
const toXY = (lat, lon) => ({
  x: ((lon + 180) / 360) * 1000,
  y: ((90 - lat) / 180) * 500,
});

const INDIA = toXY(22.5, 78.9);

const DESTINATIONS = [
  { name: "UAE", region: "Middle East", ...toXY(24, 54) },
  { name: "Saudi Arabia", region: "Middle East", ...toXY(24, 45) },
  { name: "Oman", region: "Middle East", ...toXY(21, 56) },
  { name: "Nigeria", region: "Africa", ...toXY(9, 8) },
  { name: "Kenya", region: "Africa", ...toXY(-1, 38) },
  { name: "South Africa", region: "Africa", ...toXY(-30, 25) },
  { name: "Sri Lanka", region: "Asia", ...toXY(7, 81) },
  { name: "Bangladesh", region: "Asia", ...toXY(23, 90) },
  { name: "Nepal", region: "Asia", ...toXY(28, 84) },
  { name: "Uzbekistan", region: "CIS", ...toXY(41, 64) },
  { name: "Kazakhstan", region: "CIS", ...toXY(48, 68) },
  { name: "Azerbaijan", region: "CIS", ...toXY(40, 47) },
  { name: "Peru", region: "Latin America", ...toXY(-10, -75) },
  { name: "Guatemala", region: "Latin America", ...toXY(15, -90) },
  { name: "Ecuador", region: "Latin America", ...toXY(-1, -78) },
  { name: "Philippines", region: "South East Asia", ...toXY(13, 122) },
  { name: "Vietnam", region: "South East Asia", ...toXY(14, 108) },
  { name: "Indonesia", region: "South East Asia", ...toXY(-5, 118) },
];

// Bezier curve string from India to destination with an arc control point
const curvePath = (from, to) => {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  // Arc control offset perpendicular to the line
  const arcHeight = Math.min(distance * 0.28, 120);
  const nx = -dy / distance;
  const ny = dx / distance;
  const cx = midX + nx * arcHeight;
  const cy = midY + ny * arcHeight - Math.min(distance * 0.15, 60); // lift the arc
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
};

// Dot-matrix silhouette world map — denser grid for high-detail look
const DotMap = () => {
  const CONTINENT_BOUNDS = [
    { latMin: 25, latMax: 70, lonMin: -170, lonMax: -55 }, // N America
    { latMin: -55, latMax: 12, lonMin: -82, lonMax: -35 }, // S America
    { latMin: 36, latMax: 70, lonMin: -10, lonMax: 60 },    // Europe
    { latMin: -35, latMax: 37, lonMin: -18, lonMax: 51 },   // Africa
    { latMin: 5, latMax: 70, lonMin: 40, lonMax: 145 },     // Asia
    { latMin: -11, latMax: 20, lonMin: 95, lonMax: 141 },   // SE Asia/Indonesia
    { latMin: -40, latMax: -12, lonMin: 113, lonMax: 154 }, // Australia
    { latMin: 15, latMax: 32, lonMin: -110, lonMax: -85 },  // Mexico/CA
  ];
  const EXCLUDE = [
    // Rough exclusions for oceans between continents
    { latMin: -55, latMax: 15, lonMin: -35, lonMax: -20 }, // Atlantic
    { latMin: 10, latMax: 40, lonMin: 55, lonMax: 60 },
  ];
  const inLand = (lat, lon) => {
    if (EXCLUDE.some(b => lat >= b.latMin && lat <= b.latMax && lon >= b.lonMin && lon <= b.lonMax)) return false;
    return CONTINENT_BOUNDS.some(b => lat >= b.latMin && lat <= b.latMax && lon >= b.lonMin && lon <= b.lonMax);
  };
  const dots = [];
  for (let lat = 72; lat >= -55; lat -= 2.2) {
    for (let lon = -170; lon <= 175; lon += 2.2) {
      if (inLand(lat, lon)) {
        const { x, y } = toXY(lat, lon);
        dots.push({ x, y, key: `${lat.toFixed(1)}_${lon.toFixed(1)}` });
      }
    }
  }
  return (
    <g>
      {dots.map(d => (
        <circle key={d.key} cx={d.x} cy={d.y} r="1.4" fill="#0A2D6B" fillOpacity="0.32" />
      ))}
    </g>
  );
};

export const ExportMarkets = () => (
  <section className="py-20 md:py-28 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="max-w-3xl mb-12">
        <motion.div variants={fadeUp} className="text-xs uppercase tracking-[0.22em] font-semibold mb-4 text-krevion-teal">Global Export Markets</motion.div>
        <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-krevion-navy">
          One origin. Six regions. Countless partners.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-5 text-base sm:text-lg leading-relaxed text-gray-600">
          Live pharmaceutical corridors extending from India to strategic export markets across the globe — powered by documentation-first logistics and regional partnerships.
        </motion.p>
      </motion.div>

      <div className="relative rounded-3xl border border-gray-100 bg-gradient-to-br from-krevion-light via-white to-krevion-light p-4 md:p-8 shadow-sm">
        <svg viewBox="0 0 1000 500" className="w-full h-auto" data-testid="world-map-svg" role="img" aria-label="KREVION global export corridors from India">
          <defs>
            <radialGradient id="glowIndia" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#18B7B0" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#18B7B0" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="laser" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#18B7B0" stopOpacity="0" />
              <stop offset="40%" stopColor="#18B7B0" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#36C2C1" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dense dot-matrix silhouette world map */}
          <DotMap />

          {/* Laser lines from India to each destination */}
          {DESTINATIONS.map((d, i) => {
            const path = curvePath(INDIA, d);
            return (
              <g key={d.name}>
                {/* Static faint guide */}
                <path d={path} fill="none" stroke="#18B7B0" strokeOpacity="0.15" strokeWidth="1" />
                {/* Animated laser pulse */}
                <path
                  d={path}
                  fill="none"
                  stroke="url(#laser)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeDasharray="60 400"
                  filter="url(#glow)"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="460"
                    to="0"
                    dur={`${3 + (i % 5) * 0.3}s`}
                    begin={`${(i * 0.15) % 3}s`}
                    repeatCount="indefinite"
                  />
                </path>
                {/* Destination pulsing dot */}
                <circle cx={d.x} cy={d.y} r="3.5" fill="#18B7B0" />
                <circle cx={d.x} cy={d.y} r="3.5" fill="#18B7B0">
                  <animate attributeName="r" from="3.5" to="14" dur="2.4s" begin={`${(i * 0.2) % 2}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.7" to="0" dur="2.4s" begin={`${(i * 0.2) % 2}s`} repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}

          {/* India origin — bigger, glowing */}
          <circle cx={INDIA.x} cy={INDIA.y} r="38" fill="url(#glowIndia)" />
          <circle cx={INDIA.x} cy={INDIA.y} r="7" fill="#0A2D6B" stroke="#18B7B0" strokeWidth="2" />
          <circle cx={INDIA.x} cy={INDIA.y} r="7" fill="#18B7B0">
            <animate attributeName="r" from="7" to="24" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.8" to="0" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <text x={INDIA.x + 12} y={INDIA.y + 4} fontSize="14" fontWeight="700" fill="#0A2D6B" fontFamily="Poppins, sans-serif">India</text>
        </svg>

        <div className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center gap-2 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-full px-4 py-2 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-krevion-teal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-krevion-teal"></span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-krevion-navy font-semibold">Live Export Corridors</span>
        </div>
      </div>

      <motion.ul initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10" data-testid="export-markets-list">
        {EXPORT_MARKETS.map((m, i) => (
          <motion.li
            key={m.region}
            variants={fadeUp}
            className="group bg-white border border-gray-100 rounded-xl p-5 hover:border-krevion-teal hover:shadow-md transition-all"
            data-testid={`market-${m.region.toLowerCase().replace(/\s/g, "-")}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-krevion-teal font-semibold">
                  <Radio className="h-3 w-3" /> Region 0{i + 1}
                </div>
                <div className="font-heading text-lg font-semibold text-krevion-navy mt-1">{m.region}</div>
                <div className="text-xs text-gray-600 mt-2 leading-relaxed">{m.countries}</div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-gray-300 group-hover:text-krevion-teal group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  </section>
);
