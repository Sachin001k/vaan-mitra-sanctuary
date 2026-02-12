import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Trees, Route, ChevronRight, Footprints } from "lucide-react";

interface ParkZone {
  name: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  species: string[];
}

interface ElephantCorridor {
  name: string;
  path: string;
  status: "active" | "threatened" | "blocked";
}

interface NationalPark {
  id: string;
  name: string;
  state: string;
  area: string;
  established: string;
  description: string;
  coordinates: string;
  zones: ParkZone[];
  corridors: ElephantCorridor[];
  keySpecies: string[];
  mapViewBox: string;
  parkOutline: string;
  rivers?: { name: string; path: string }[];
}

const nationalParks: NationalPark[] = [
  {
    id: "kaziranga",
    name: "Kaziranga National Park",
    state: "Assam",
    area: "1,030 km²",
    established: "1905",
    description:
      "Home to two-thirds of the world's Great One-Horned Rhinoceros. A UNESCO World Heritage Site spread across the floodplains of the Brahmaputra River.",
    coordinates: "26.58°N, 93.17°E",
    mapViewBox: "0 0 600 350",
    parkOutline:
      "M 50 120 C 80 80, 150 60, 220 70 C 280 75, 340 90, 400 85 C 450 82, 500 95, 550 110 C 560 150, 555 200, 540 240 C 510 270, 460 280, 400 275 C 340 270, 280 260, 220 265 C 160 270, 100 250, 70 220 C 45 190, 40 150, 50 120 Z",
    zones: [
      { name: "Kohora (Central)", color: "#2d5a27", x: 220, y: 120, width: 120, height: 90, species: ["Rhino", "Tiger", "Elephant"] },
      { name: "Bagori (Western)", color: "#3a7233", x: 80, y: 130, width: 110, height: 80, species: ["Rhino", "Wild Buffalo"] },
      { name: "Agoratoli (Eastern)", color: "#4a8a3f", x: 380, y: 110, width: 130, height: 85, species: ["Tiger", "Hoolock Gibbon"] },
      { name: "Burapahar", color: "#1e4d19", x: 440, y: 200, width: 80, height: 60, species: ["Elephant", "Tiger"] },
    ],
    corridors: [
      { name: "Kaziranga-Karbi Anglong", path: "M 300 100 Q 320 50, 380 30 Q 420 20, 460 40", status: "threatened" },
      { name: "Panbari Corridor", path: "M 100 150 Q 70 120, 50 80 Q 40 50, 60 30", status: "active" },
    ],
    rivers: [
      { name: "Brahmaputra", path: "M 20 170 Q 150 190, 300 175 Q 450 160, 580 180" },
    ],
    keySpecies: ["One-Horned Rhino", "Bengal Tiger", "Asian Elephant", "Wild Water Buffalo", "Swamp Deer", "Hoolock Gibbon"],
  },
  {
    id: "pench",
    name: "Pench National Park",
    state: "Madhya Pradesh & Maharashtra",
    area: "758 km²",
    established: "1977",
    description:
      "The inspiration for Rudyard Kipling's 'The Jungle Book'. Straddling MP and Maharashtra, it's known for rich tiger density and lush teak forests.",
    coordinates: "21.72°N, 79.30°E",
    mapViewBox: "0 0 500 400",
    parkOutline:
      "M 80 60 C 130 40, 200 35, 270 50 C 340 65, 390 80, 420 120 C 440 160, 435 220, 420 270 C 400 310, 360 340, 300 350 C 240 355, 180 340, 130 310 C 90 285, 65 240, 60 190 C 55 140, 65 90, 80 60 Z",
    zones: [
      { name: "Turia Gate (Core)", color: "#2d5a27", x: 150, y: 100, width: 140, height: 100, species: ["Tiger", "Leopard"] },
      { name: "Karmajhiri Gate", color: "#3a7233", x: 100, y: 210, width: 120, height: 80, species: ["Sloth Bear", "Wild Dog"] },
      { name: "Jamtara Gate", color: "#4a8a3f", x: 260, y: 180, width: 110, height: 90, species: ["Tiger", "Sambar"] },
      { name: "Sillari Gate (Maharashtra)", color: "#1e4d19", x: 200, y: 280, width: 130, height: 60, species: ["Gaur", "Chital"] },
    ],
    corridors: [
      { name: "Pench-Kanha Corridor", path: "M 420 200 Q 460 180, 490 140 Q 500 110, 490 70", status: "active" },
      { name: "Pench-Nagzira Corridor", path: "M 320 350 Q 360 370, 410 360 Q 450 350, 480 320", status: "threatened" },
    ],
    rivers: [
      { name: "Pench River", path: "M 250 30 Q 240 100, 255 180 Q 265 260, 250 350" },
    ],
    keySpecies: ["Bengal Tiger", "Indian Leopard", "Sloth Bear", "Wild Dog", "Gaur", "Chital"],
  },
  {
    id: "kanha",
    name: "Kanha National Park",
    state: "Madhya Pradesh",
    area: "940 km²",
    established: "1955",
    description:
      "One of India's largest national parks and a Tiger Reserve. Famous for saving the Barasingha (Hard-ground Swamp Deer) from extinction.",
    coordinates: "22.28°N, 80.61°E",
    mapViewBox: "0 0 550 380",
    parkOutline:
      "M 70 80 C 120 50, 200 40, 280 55 C 360 70, 420 60, 470 90 C 500 120, 490 180, 480 230 C 465 280, 430 320, 370 340 C 300 355, 220 350, 160 330 C 110 310, 75 270, 60 220 C 50 170, 55 110, 70 80 Z",
    zones: [
      { name: "Kanha Zone", color: "#2d5a27", x: 130, y: 100, width: 130, height: 100, species: ["Tiger", "Barasingha"] },
      { name: "Kisli Zone", color: "#3a7233", x: 90, y: 210, width: 120, height: 80, species: ["Tiger", "Leopard"] },
      { name: "Sarhi Zone", color: "#4a8a3f", x: 280, y: 110, width: 120, height: 90, species: ["Wild Dog", "Gaur"] },
      { name: "Mukki Zone", color: "#1e4d19", x: 300, y: 230, width: 130, height: 80, species: ["Tiger", "Sloth Bear"] },
    ],
    corridors: [
      { name: "Kanha-Pench Corridor", path: "M 470 150 Q 500 130, 530 100 Q 545 70, 540 40", status: "active" },
      { name: "Kanha-Achanakmar Corridor", path: "M 200 50 Q 170 30, 130 20 Q 90 15, 50 30", status: "blocked" },
    ],
    rivers: [
      { name: "Banjar River", path: "M 100 120 Q 200 150, 300 140 Q 400 130, 480 160" },
    ],
    keySpecies: ["Bengal Tiger", "Barasingha", "Indian Leopard", "Sloth Bear", "Indian Wild Dog", "Gaur"],
  },
];

const statusColors = {
  active: "#22c55e",
  threatened: "#f59e0b",
  blocked: "#ef4444",
};

const NationalParkMaps = () => {
  const [activePark, setActivePark] = useState<string>("kaziranga");
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const park = nationalParks.find((p) => p.id === activePark)!;

  return (
    <section className="py-20 px-6 bg-jungle-darkest">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-jungle-canopy uppercase tracking-[0.3em] text-xs mb-3 flex items-center justify-center gap-2">
            <Trees size={14} />
            National Parks & Corridors
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-ivory mb-4">
            Animated Park Maps
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore India's iconic national parks with interactive zone maps and critical elephant corridor visualizations.
          </p>
        </motion.div>

        {/* Park Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {nationalParks.map((p) => (
            <motion.button
              key={p.id}
              onClick={() => setActivePark(p.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 border-2 ${
                activePark === p.id
                  ? "bg-jungle-amazon text-ivory border-jungle-canopy"
                  : "bg-jungle-deep text-muted-foreground border-jungle-medium/30 hover:border-jungle-amazon"
              }`}
            >
              {p.name.replace(" National Park", "")}
            </motion.button>
          ))}
        </div>

        {/* Park Map + Info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePark}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-5 gap-8"
          >
            {/* SVG Map */}
            <div className="lg:col-span-3 bg-jungle-dark border border-jungle-medium/30 p-6 relative overflow-hidden">
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-5">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-jungle-canopy"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      fontSize: `${10 + Math.random() * 14}px`,
                    }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
                  >
                    🌿
                  </motion.div>
                ))}
              </div>

              <h3 className="font-display text-2xl text-ivory mb-4 relative z-10">{park.name}</h3>

              <svg viewBox={park.mapViewBox} className="w-full relative z-10" style={{ maxHeight: "400px" }}>
                {/* Park boundary - animated draw */}
                <motion.path
                  d={park.parkOutline}
                  fill="hsl(150 30% 18% / 0.5)"
                  stroke="hsl(130 42% 50%)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Rivers */}
                {park.rivers?.map((river, i) => (
                  <motion.path
                    key={river.name}
                    d={river.path}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{ duration: 1.5, delay: 1 + i * 0.3 }}
                  />
                ))}
                {park.rivers?.map((river) => {
                  const pathParts = river.path.split(" ");
                  const lastX = parseFloat(pathParts[pathParts.length - 2]) || 400;
                  const lastY = parseFloat(pathParts[pathParts.length - 1]) || 180;
                  return (
                    <text key={`label-${river.name}`} x={lastX + 5} y={lastY - 5} fill="#60a5fa" fontSize="10" fontStyle="italic">
                      {river.name}
                    </text>
                  );
                })}

                {/* Zones */}
                {park.zones.map((zone, i) => (
                  <g key={zone.name}>
                    <motion.rect
                      x={zone.x}
                      y={zone.y}
                      width={zone.width}
                      height={zone.height}
                      fill={hoveredZone === zone.name ? `${zone.color}cc` : `${zone.color}88`}
                      stroke={hoveredZone === zone.name ? "#86efac" : "#4ade80"}
                      strokeWidth={hoveredZone === zone.name ? 2 : 1}
                      strokeDasharray="6 3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
                      onMouseEnter={() => setHoveredZone(zone.name)}
                      onMouseLeave={() => setHoveredZone(null)}
                      style={{ cursor: "pointer", transformOrigin: `${zone.x + zone.width / 2}px ${zone.y + zone.height / 2}px` }}
                    />
                    <motion.text
                      x={zone.x + zone.width / 2}
                      y={zone.y + zone.height / 2}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      fontSize="11"
                      fontWeight="600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + i * 0.2 }}
                      style={{ pointerEvents: "none" }}
                    >
                      {zone.name}
                    </motion.text>
                  </g>
                ))}

                {/* Elephant Corridors - animated dashed paths */}
                {park.corridors.map((corridor, i) => (
                  <g key={corridor.name}>
                    <motion.path
                      d={corridor.path}
                      fill="none"
                      stroke={statusColors[corridor.status]}
                      strokeWidth="3"
                      strokeDasharray="8 4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 2 + i * 0.5 }}
                    />
                    {/* Walking elephant icon along corridor */}
                    <motion.text
                      fontSize="16"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3 + i * 0.5 }}
                    >
                      <animateMotion dur="6s" repeatCount="indefinite" path={corridor.path} />
                      🐘
                    </motion.text>
                  </g>
                ))}
              </svg>

              {/* Hovered zone tooltip */}
              <AnimatePresence>
                {hoveredZone && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-4 left-4 right-4 bg-jungle-darkest/95 border border-jungle-medium/50 p-4 z-20"
                  >
                    <h4 className="text-ivory font-display text-lg">{hoveredZone}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Key species: {park.zones.find((z) => z.name === hoveredZone)?.species.join(", ")}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Park Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Park Details */}
              <div className="bg-jungle-dark border border-jungle-medium/30 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} className="text-jungle-canopy" />
                  <h4 className="text-ivory font-display text-xl">Park Details</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "State", value: park.state },
                    { label: "Area", value: park.area },
                    { label: "Established", value: park.established },
                    { label: "Coordinates", value: park.coordinates },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between py-2 border-b border-jungle-medium/20">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</span>
                      <span className="text-sm text-ivory font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{park.description}</p>
              </div>

              {/* Elephant Corridors Legend */}
              <div className="bg-jungle-dark border border-jungle-medium/30 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Footprints size={16} className="text-jungle-canopy" />
                  <h4 className="text-ivory font-display text-xl">Elephant Corridors</h4>
                </div>
                <div className="space-y-3">
                  {park.corridors.map((corridor) => (
                    <div key={corridor.name} className="flex items-center gap-3 py-2">
                      <span
                        className="w-3 h-3 flex-shrink-0"
                        style={{ backgroundColor: statusColors[corridor.status] }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-ivory truncate">{corridor.name}</p>
                        <p className="text-xs capitalize" style={{ color: statusColors[corridor.status] }}>
                          {corridor.status}
                        </p>
                      </div>
                      <ChevronRight size={14} className="text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-jungle-medium/20">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Corridor Status</p>
                  <div className="flex gap-4">
                    {(["active", "threatened", "blocked"] as const).map((s) => (
                      <div key={s} className="flex items-center gap-1.5">
                        <span className="w-2 h-2" style={{ backgroundColor: statusColors[s] }} />
                        <span className="text-xs text-muted-foreground capitalize">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Species */}
              <div className="bg-jungle-dark border border-jungle-medium/30 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Route size={16} className="text-jungle-canopy" />
                  <h4 className="text-ivory font-display text-xl">Key Species</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {park.keySpecies.map((species) => (
                    <motion.span
                      key={species}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1.5 bg-jungle-deep text-xs text-ivory border border-jungle-medium/30"
                    >
                      {species}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default NationalParkMaps;
