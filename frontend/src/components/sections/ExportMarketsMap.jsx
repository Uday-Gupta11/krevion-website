import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Radio } from "lucide-react";
import { EXPORT_MARKETS } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

// Simplified real-continent silhouettes (lat/lon polygons), rendered locally — no external image dependency, always renders
const CONTINENTS = [
  { name: "North America", label: true, labelPos: [48, -100], points: [[83,-60],[75,-75],[70,-95],[68,-125],[70,-140],[60,-141],[55,-133],[50,-128],[48,-124],[42,-124],
   [34,-120],[32,-117],[23,-110],[16,-95],[14,-92],[9,-83],[8,-77.5],[10,-85],[18,-88],[21,-97],
   [26,-97],[25,-80],[30,-81],[35,-75],[40,-74],[41,-70],[45,-67],[47,-52],[50,-56],[52,-56],[58,-63],
   [60,-65],[63,-78],[68,-83],[70,-90],[75,-90],[82,-65],[83,-60]] },
  { name: "Greenland", label: false, points: [[83,-32],[76,-20],[70,-22],[65,-40],[60,-45],[65,-53],[72,-55],[80,-40],[83,-32]] },
  { name: "South America", label: true, labelPos: [-16, -62], points: [[12,-72],[11,-68],[10,-62],[5,-52],[0,-50],[-5,-35],[-8,-35],[-15,-39],[-23,-42],[-30,-51],
   [-34,-58],[-38,-58],[-42,-65],[-52,-68],[-55,-68],[-53,-72],[-45,-73],[-38,-73],[-30,-71],
   [-23,-70],[-18,-70],[-14,-76],[-5,-81],[-3,-80],[0,-79],[3,-77],[6,-77],[8,-77],[10,-75],[12,-72]] },
  { name: "Europe", label: true, labelPos: [54, 20], points: [[43,-9],[40,-9],[36,-6],[36,0],[38,9],[38,15],[40,18],[40,22],[41,26],[41,29],[45,29],[45,36],
   [47,40],[50,40],[55,40],[60,40],[66,40],[68,33],[71,28],[71,20],[68,18],[65,12],[63,8],[60,5],
   [58,7],[55,8],[52,4],[50,2],[48,-2],[44,-1],[43,-9]] },
  { name: "Africa", label: true, labelPos: [3, 21], points: [[37,10],[35,-6],[28,-13],[20,-17],[14,-17],[9,-14],[5,-10],[4,-8],[6,-3],[6,2],[4,8],[0,9],
   [-6,12],[-10,13],[-18,12],[-22,14],[-29,17],[-34,18],[-34,25],[-29,32],[-26,33],[-20,35],
   [-16,40],[-6,40],[-1,42],[2,45],[5,48],[11,51],[11,43],[12,43],[15,39],[18,37],[22,36],
   [28,34],[31,32],[33,25],[32,20],[33,13],[37,10]] },
  { name: "Middle East", label: false, points: [[37,26],[37,35],[42,36],[42,45],[38,48],[34,48],[30,48],[29,48],[26,50],[24,52],[23,54],
   [22,59],[17,54],[13,44],[16,43],[18,41],[21,40],[25,35],[28,34],[31,33],[33,35],[37,26]] },
  { name: "Asia", label: true, labelPos: [48, 95], points: [[42,45],[45,48],[48,50],[50,55],[55,60],[60,65],[65,70],[70,80],[73,90],[73,100],[70,110],
   [68,140],[65,150],[60,160],[55,163],[50,157],[45,140],[43,132],[40,124],[38,123],[35,120],
   [32,121],[28,121],[23,117],[22,114],[21,108],[18,106],[10,106],[8,104],[10,98],[13,98],
   [16,94],[20,93],[22,88],[22,90],[24,68],[24,66],[25,62],[27,61],[30,55],[33,48],[36,45],
   [38,48],[42,45]] },
  { name: "Indonesia", label: false, points: [[6,95],[5,98],[1,104],[3,109],[1,111],[-4,105],[-6,106],[-8,114],[-9,119],[-9,124],[-9,131],
   [-8,140],[-2,141],[0,133],[2,128],[5,120],[7,117],[6,109],[7,99],[6,95]] },
  { name: "Philippines", label: false, points: [[19,121],[18,122],[14,121],[10,123],[9,126],[6,122],[7,120],[9,118],[12,120],[15,120],[19,121]] },
  { name: "Japan", label: false, points: [[45,142],[43,140],[41,140],[38,139],[35,133],[33,130],[31,130],[32,132],[35,136],[38,141],
   [41,141],[43,145],[45,142]] },
  { name: "Australia", label: true, labelPos: [-25, 134], points: [[-11,131],[-12,136],[-12,142],[-14,144],[-17,146],[-20,148],[-24,153],[-28,153],[-32,152],
   [-35,150],[-38,147],[-39,143],[-38,140],[-35,136],[-33,134],[-32,127],[-31,119],[-27,113],
   [-24,113],[-21,114],[-18,122],[-16,123],[-14,126],[-11,131]] },
  { name: "New Zealand", label: false, points: [[-34,173],[-37,175],[-39,177],[-41,175],[-41,173],[-44,171],[-46,167],[-44,169],[-40,173],[-34,173]] },
];

const continentPath = (points) => {
  const [first, ...rest] = points.map(([lat, lon]) => toXY(lat, lon));
  return `M ${first.x} ${first.y} ` + rest.map((p) => `L ${p.x} ${p.y}`).join(" ") + " Z";
};

const WorldMapBase = ({ hoveredContinent, onHover, onLeave }) => (
  <g>
    {/* Ocean background */}
    <rect x="0" y="0" width="1000" height="500" rx="18" fill="url(#oceanGradient)" />
    {CONTINENTS.map((c, i) => {
      const isHovered = hoveredContinent === c.name;
      const labelXY = c.labelPos ? toXY(c.labelPos[0], c.labelPos[1]) : null;
      return (
        <g key={i}>
          <path
            d={continentPath(c.points)}
            fill={isHovered ? "#2F855A" : "#3F9B5F"}
            fillOpacity={isHovered ? 0.95 : 0.82}
            stroke="#256B45"
            strokeOpacity="0.6"
            strokeWidth="1"
            strokeLinejoin="round"
            style={{ cursor: "pointer", transition: "fill-opacity 0.2s" }}
            onMouseEnter={() => onHover(c.name)}
            onMouseLeave={onLeave}
          />
          {c.label && labelXY && (
            <text
              x={labelXY.x}
              y={labelXY.y}
              fontSize="13"
              fontWeight="700"
              fill="#ffffff"
              fontFamily="Poppins, sans-serif"
              textAnchor="middle"
              opacity="0.85"
              style={{ pointerEvents: "none", textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
            >
              {c.name}
            </text>
          )}
        </g>
      );
    })}
  </g>
);

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


export const ExportMarkets = () => {
  const [hovered, setHovered] = useState(null);
  const [hoveredContinent, setHoveredContinent] = useState(null);

  return (
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
        <svg viewBox="0 0 1000 500" className="w-full h-auto" data-testid="world-map-svg" role="img" aria-label="Exelvia global export corridors from India">
          <defs>
            <linearGradient id="oceanGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BEE3F8" />
              <stop offset="100%" stopColor="#90CDF4" />
            </linearGradient>
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

          {/* Real continent silhouettes — drawn locally, no external image, always renders */}
          <WorldMapBase hoveredContinent={hoveredContinent} onHover={setHoveredContinent} onLeave={() => setHoveredContinent(null)} />

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
                {/* Invisible larger hit-area — hover to see the country name */}
                <circle
                  cx={d.x}
                  cy={d.y}
                  r="12"
                  fill="transparent"
                  data-testid={`map-dot-${d.name.toLowerCase().replace(/\s/g, "-")}`}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                />
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

        {/* Interactive hover tooltip — positioned as % of the viewBox so it always lines up regardless of rendered size */}
        {hovered !== null && (
          <div
            className="absolute pointer-events-none bg-krevion-navy text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap z-10"
            style={{
              left: `${(DESTINATIONS[hovered].x / 1000) * 100}%`,
              top: `${(DESTINATIONS[hovered].y / 500) * 100}%`,
              transform: "translate(-50%, -140%)",
            }}
          >
            {DESTINATIONS[hovered].name}
            <span className="text-krevion-accent font-normal ml-1">· {DESTINATIONS[hovered].region}</span>
          </div>
        )}

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
                <div className="text-xs text-gray-500 mt-2 leading-relaxed">{m.countries}</div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-gray-300 group-hover:text-krevion-teal group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  </section>
  );
};
