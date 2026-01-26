import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Wildlife species data in GeoJSON-like structure
export interface WildlifeSpecies {
  id: string;
  name: string;
  scientificName: string;
  category: "mammals" | "birds" | "reptiles" | "marine";
  location: string;
  coordinates: [number, number]; // [lat, lng]
  population: number;
  status: "Endangered" | "Vulnerable" | "Near Threatened" | "Least Concern" | "Critically Endangered";
  icon: string;
  color: string;
}

export const wildlifeData: WildlifeSpecies[] = [
  // Tigers
  {
    id: "tiger-1",
    name: "Bengal Tiger",
    scientificName: "Panthera tigris tigris",
    category: "mammals",
    location: "Jim Corbett National Park, Uttarakhand",
    coordinates: [29.5300, 78.7747],
    population: 260,
    status: "Endangered",
    icon: "🐯",
    color: "#FF6B35"
  },
  {
    id: "tiger-2",
    name: "Bengal Tiger",
    scientificName: "Panthera tigris tigris",
    category: "mammals",
    location: "Sundarbans, West Bengal",
    coordinates: [21.9497, 89.1833],
    population: 96,
    status: "Endangered",
    icon: "🐯",
    color: "#FF6B35"
  },
  {
    id: "tiger-3",
    name: "Bengal Tiger",
    scientificName: "Panthera tigris tigris",
    category: "mammals",
    location: "Ranthambore, Rajasthan",
    coordinates: [26.0173, 76.5026],
    population: 80,
    status: "Endangered",
    icon: "🐯",
    color: "#FF6B35"
  },
  {
    id: "tiger-4",
    name: "Bengal Tiger",
    scientificName: "Panthera tigris tigris",
    category: "mammals",
    location: "Kanha National Park, Madhya Pradesh",
    coordinates: [22.2788, 80.6115],
    population: 105,
    status: "Endangered",
    icon: "🐯",
    color: "#FF6B35"
  },
  {
    id: "tiger-5",
    name: "Bengal Tiger",
    scientificName: "Panthera tigris tigris",
    category: "mammals",
    location: "Kaziranga, Assam",
    coordinates: [26.5775, 93.1711],
    population: 118,
    status: "Endangered",
    icon: "🐯",
    color: "#FF6B35"
  },
  // Elephants
  {
    id: "elephant-1",
    name: "Asian Elephant",
    scientificName: "Elephas maximus",
    category: "mammals",
    location: "Periyar Wildlife Sanctuary, Kerala",
    coordinates: [9.4672, 77.2410],
    population: 1200,
    status: "Endangered",
    icon: "🐘",
    color: "#6B7B8A"
  },
  {
    id: "elephant-2",
    name: "Asian Elephant",
    scientificName: "Elephas maximus",
    category: "mammals",
    location: "Nagarhole National Park, Karnataka",
    coordinates: [12.0563, 76.1004],
    population: 800,
    status: "Endangered",
    icon: "🐘",
    color: "#6B7B8A"
  },
  {
    id: "elephant-3",
    name: "Asian Elephant",
    scientificName: "Elephas maximus",
    category: "mammals",
    location: "Corbett-Rajaji Corridor, Uttarakhand",
    coordinates: [29.8000, 78.4000],
    population: 1500,
    status: "Endangered",
    icon: "🐘",
    color: "#6B7B8A"
  },
  // Rhinos
  {
    id: "rhino-1",
    name: "Greater One-Horned Rhino",
    scientificName: "Rhinoceros unicornis",
    category: "mammals",
    location: "Kaziranga National Park, Assam",
    coordinates: [26.5775, 93.4311],
    population: 2613,
    status: "Vulnerable",
    icon: "🦏",
    color: "#8B7355"
  },
  {
    id: "rhino-2",
    name: "Greater One-Horned Rhino",
    scientificName: "Rhinoceros unicornis",
    category: "mammals",
    location: "Manas National Park, Assam",
    coordinates: [26.6599, 91.0011],
    population: 48,
    status: "Vulnerable",
    icon: "🦏",
    color: "#8B7355"
  },
  // Leopards
  {
    id: "leopard-1",
    name: "Indian Leopard",
    scientificName: "Panthera pardus fusca",
    category: "mammals",
    location: "Jawai, Rajasthan",
    coordinates: [25.1500, 73.2000],
    population: 82,
    status: "Vulnerable",
    icon: "🐆",
    color: "#D4A574"
  },
  {
    id: "leopard-2",
    name: "Snow Leopard",
    scientificName: "Panthera uncia",
    category: "mammals",
    location: "Hemis National Park, Ladakh",
    coordinates: [33.6844, 77.6167],
    population: 200,
    status: "Vulnerable",
    icon: "🐆",
    color: "#C0C0C0"
  },
  // Lions
  {
    id: "lion-1",
    name: "Asiatic Lion",
    scientificName: "Panthera leo persica",
    category: "mammals",
    location: "Gir Forest, Gujarat",
    coordinates: [21.1243, 70.8242],
    population: 674,
    status: "Endangered",
    icon: "🦁",
    color: "#DAA520"
  },
  // Birds
  {
    id: "crane-1",
    name: "Sarus Crane",
    scientificName: "Antigone antigone",
    category: "birds",
    location: "Bharatpur Bird Sanctuary, Rajasthan",
    coordinates: [27.1591, 77.5241],
    population: 8000,
    status: "Vulnerable",
    icon: "🦢",
    color: "#87CEEB"
  },
  {
    id: "vulture-1",
    name: "Indian Vulture",
    scientificName: "Gyps indicus",
    category: "birds",
    location: "Pench National Park, Maharashtra",
    coordinates: [21.7500, 79.3000],
    population: 12000,
    status: "Critically Endangered",
    icon: "🦅",
    color: "#8B4513"
  },
  {
    id: "peacock-1",
    name: "Indian Peafowl",
    scientificName: "Pavo cristatus",
    category: "birds",
    location: "Sariska Tiger Reserve, Rajasthan",
    coordinates: [27.3500, 76.4000],
    population: 100000,
    status: "Least Concern",
    icon: "🦚",
    color: "#1E90FF"
  },
  {
    id: "hornbill-1",
    name: "Great Hornbill",
    scientificName: "Buceros bicornis",
    category: "birds",
    location: "Pakke Tiger Reserve, Arunachal Pradesh",
    coordinates: [27.0000, 93.0000],
    population: 13000,
    status: "Vulnerable",
    icon: "🐦",
    color: "#FFD700"
  },
  // Reptiles
  {
    id: "croc-1",
    name: "Gharial",
    scientificName: "Gavialis gangeticus",
    category: "reptiles",
    location: "National Chambal Sanctuary, MP",
    coordinates: [26.5000, 78.5000],
    population: 650,
    status: "Critically Endangered",
    icon: "🐊",
    color: "#228B22"
  },
  {
    id: "turtle-1",
    name: "Olive Ridley Turtle",
    scientificName: "Lepidochelys olivacea",
    category: "reptiles",
    location: "Gahirmatha Beach, Odisha",
    coordinates: [20.7333, 87.0500],
    population: 150000,
    status: "Vulnerable",
    icon: "🐢",
    color: "#3CB371"
  },
  // Marine
  {
    id: "dolphin-1",
    name: "Ganges River Dolphin",
    scientificName: "Platanista gangetica",
    category: "marine",
    location: "Vikramshila Dolphin Sanctuary, Bihar",
    coordinates: [25.3000, 87.0000],
    population: 1800,
    status: "Endangered",
    icon: "🐬",
    color: "#4682B4"
  },
  {
    id: "whale-1",
    name: "Blue Whale",
    scientificName: "Balaenoptera musculus",
    category: "marine",
    location: "Sri Lanka Waters (Migration Route)",
    coordinates: [8.0000, 81.0000],
    population: 2000,
    status: "Endangered",
    icon: "🐋",
    color: "#000080"
  },
  // More primates
  {
    id: "langur-1",
    name: "Golden Langur",
    scientificName: "Trachypithecus geei",
    category: "mammals",
    location: "Chakrashila Wildlife Sanctuary, Assam",
    coordinates: [26.2000, 90.1000],
    population: 6500,
    status: "Endangered",
    icon: "🐒",
    color: "#FFD700"
  },
  {
    id: "sloth-bear-1",
    name: "Sloth Bear",
    scientificName: "Melursus ursinus",
    category: "mammals",
    location: "Satpura National Park, MP",
    coordinates: [22.5000, 78.3000],
    population: 8000,
    status: "Vulnerable",
    icon: "🐻",
    color: "#2F2F2F"
  },
  {
    id: "wild-ass-1",
    name: "Indian Wild Ass",
    scientificName: "Equus hemionus khur",
    category: "mammals",
    location: "Little Rann of Kutch, Gujarat",
    coordinates: [23.4000, 71.1000],
    population: 4800,
    status: "Near Threatened",
    icon: "🐴",
    color: "#C4A484"
  },
];

// Create custom marker icon
const createCustomIcon = (species: WildlifeSpecies) => {
  return L.divIcon({
    className: "custom-wildlife-marker",
    html: `
      <div class="marker-container" style="
        width: 44px;
        height: 52px;
        position: relative;
      ">
        <div style="
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, ${species.color}, ${species.color}dd);
          border: 3px solid #1a2f1a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          position: relative;
        ">
          ${species.icon}
        </div>
        <div style="
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 10px solid #1a2f1a;
        "></div>
      </div>
    `,
    iconSize: [44, 52],
    iconAnchor: [22, 52],
    popupAnchor: [0, -52]
  });
};

interface WildlifeMapProps {
  filter: string;
  onSpeciesSelect: (species: WildlifeSpecies | null) => void;
  selectedSpecies: WildlifeSpecies | null;
}

const WildlifeMap = ({ filter, onSpeciesSelect, selectedSpecies }: WildlifeMapProps) => {
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([22.5, 82.5]);
  const [mapZoom, setMapZoom] = useState(5);

  // Filter species based on category
  const filteredSpecies = useMemo(
    () => (filter === "all" ? wildlifeData : wildlifeData.filter((s) => s.category === filter)),
    [filter]
  );

  // Handle species selection
  const handleMarkerClick = (species: WildlifeSpecies) => {
    onSpeciesSelect(species);
    setMapCenter(species.coordinates);
    setMapZoom(8);
  };

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critically Endangered":
        return "#DC2626";
      case "Endangered":
        return "#EA580C";
      case "Vulnerable":
        return "#CA8A04";
      case "Near Threatened":
        return "#65A30D";
      case "Least Concern":
        return "#16A34A";
      default:
        return "#6B7280";
    }
  };

  const buildPopupHtml = (species: WildlifeSpecies) => {
    const statusColor = getStatusColor(species.status);
    return `
      <div style="min-width: 200px; font-family: inherit;">
        <div style="display:flex; align-items:center; gap: 8px; margin-bottom: 8px;">
          <div style="font-size: 22px; line-height: 1;">${species.icon}</div>
          <div>
            <div style="font-weight: 700; font-size: 14px; color: #111827;">${species.name}</div>
            <div style="font-size: 12px; font-style: italic; color: #4B5563;">${species.scientificName}</div>
          </div>
        </div>
        <div style="font-size: 13px; color: #374151; display: grid; gap: 6px;">
          <div><strong>Location:</strong> ${species.location}</div>
          <div><strong>Population:</strong> ~${species.population.toLocaleString()}</div>
          <div style="display:flex; align-items:center; gap: 6px;">
            <strong>Status:</strong>
            <span style="display:inline-block; padding: 2px 8px; font-size: 11px; font-weight: 600; color: #fff; background: ${statusColor};">
              ${species.status}
            </span>
          </div>
        </div>
      </div>
    `;
  };

  // Initialize Leaflet map once
  useEffect(() => {
    if (!mapElRef.current || mapRef.current) return;

    const map = L.map(mapElRef.current, {
      zoomControl: false,
      minZoom: 3,
      maxZoom: 12,
      preferCanvas: true,
    }).setView([22.5, 82.5], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      className: "map-tiles-dark",
    }).addTo(map);

    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapRef.current = map;

    return () => {
      markersLayer.clearLayers();
      map.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  // Rebuild markers when filter changes
  useEffect(() => {
    const map = mapRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    filteredSpecies.forEach((species) => {
      const marker = L.marker(species.coordinates, {
        icon: createCustomIcon(species),
      });

      marker.bindPopup(buildPopupHtml(species), {
        className: "wildlife-popup",
        closeButton: true,
        autoPan: true,
      });

      marker.on("click", () => {
        handleMarkerClick(species);
      });

      marker.addTo(layer);
    });
  }, [filteredSpecies]);

  // Fly-to on internal state changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo(mapCenter, mapZoom, { duration: 1.5 });
  }, [mapCenter, mapZoom]);

  // Fly-to when selection changes from outside (e.g., sidebar quick access)
  useEffect(() => {
    if (!selectedSpecies) return;
    setMapCenter(selectedSpecies.coordinates);
    setMapZoom(8);
  }, [selectedSpecies]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapElRef} className="w-full h-full" style={{ background: "#1a2f1a" }} />

      {/* Custom CSS for dark map tiles */}
      <style>{`
        .leaflet-tile-pane {
          filter: saturate(0.8) brightness(0.85) hue-rotate(60deg);
        }
        .leaflet-container {
          background: #1a2f1a;
          font-family: inherit;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 0 !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .leaflet-popup-tip {
          border-radius: 0;
        }
        .custom-wildlife-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-control-zoom {
          border: none !important;
        }
        .leaflet-control-zoom a {
          background: #1a2f1a !important;
          color: #f5f5dc !important;
          border: 1px solid #2d4a2d !important;
          border-radius: 0 !important;
        }
        .leaflet-control-zoom a:hover {
          background: #2d4a2d !important;
        }
      `}</style>
    </div>
  );
};

export default WildlifeMap;
