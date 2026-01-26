import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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

// Map controller component for programmatic control
const MapController = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  
  return null;
};

interface WildlifeMapProps {
  filter: string;
  onSpeciesSelect: (species: WildlifeSpecies | null) => void;
  selectedSpecies: WildlifeSpecies | null;
}

const WildlifeMap = ({ filter, onSpeciesSelect, selectedSpecies }: WildlifeMapProps) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([22.5, 82.5]);
  const [mapZoom, setMapZoom] = useState(5);

  // Filter species based on category
  const filteredSpecies = filter === "all" 
    ? wildlifeData 
    : wildlifeData.filter(s => s.category === filter);

  // Handle species selection
  const handleMarkerClick = (species: WildlifeSpecies) => {
    onSpeciesSelect(species);
    setMapCenter(species.coordinates);
    setMapZoom(8);
  };

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critically Endangered": return "#DC2626";
      case "Endangered": return "#EA580C";
      case "Vulnerable": return "#CA8A04";
      case "Near Threatened": return "#65A30D";
      case "Least Concern": return "#16A34A";
      default: return "#6B7280";
    }
  };

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[22.5, 82.5]}
        zoom={5}
        className="w-full h-full"
        style={{ background: "#1a2f1a" }}
        zoomControl={false}
        minZoom={3}
        maxZoom={12}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles-dark"
        />
        
        <MapController center={mapCenter} zoom={mapZoom} />
        
        {filteredSpecies.map((species) => (
          <Marker
            key={species.id}
            position={species.coordinates}
            icon={createCustomIcon(species)}
            eventHandlers={{
              click: () => handleMarkerClick(species),
            }}
          >
            <Popup className="wildlife-popup">
              <div className="p-1" style={{ minWidth: "200px" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{species.icon}</span>
                  <div>
                    <h3 className="font-bold text-base text-gray-900">{species.name}</h3>
                    <p className="text-xs italic text-gray-600">{species.scientificName}</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-700">
                    <strong>Location:</strong> {species.location}
                  </p>
                  <p className="text-gray-700">
                    <strong>Population:</strong> ~{species.population.toLocaleString()}
                  </p>
                  <p className="flex items-center gap-1">
                    <strong>Status:</strong>
                    <span 
                      className="px-2 py-0.5 text-xs font-medium text-white"
                      style={{ backgroundColor: getStatusColor(species.status) }}
                    >
                      {species.status}
                    </span>
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

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
