import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";

// Wildlife hotspot data
const wildlifeHotspots = [
  { lat: 23.5, lng: 78.0, name: "Central India", species: "Bengal Tiger", count: 3167 },
  { lat: 26.5, lng: 93.0, name: "Kaziranga", species: "One-horned Rhino", count: 2613 },
  { lat: 8.0, lng: 77.5, name: "Western Ghats", species: "Asian Elephant", count: 6049 },
  { lat: 28.5, lng: 84.0, name: "Himalayas", species: "Snow Leopard", count: 718 },
  { lat: 21.0, lng: 81.0, name: "Chhattisgarh", species: "Sloth Bear", count: 4850 },
  { lat: 27.0, lng: 88.5, name: "Sundarbans", species: "Bengal Tiger", count: 96 },
  { lat: -2.5, lng: 28.0, name: "Congo Basin", species: "Mountain Gorilla", count: 1063 },
  { lat: -1.5, lng: 37.0, name: "Kenya", species: "African Elephant", count: 36280 },
  { lat: -19.0, lng: 29.0, name: "Zimbabwe", species: "African Lion", count: 850 },
  { lat: 3.0, lng: 101.0, name: "Malaysia", species: "Malayan Tiger", count: 150 },
  { lat: -6.0, lng: 106.0, name: "Indonesia", species: "Sumatran Tiger", count: 400 },
  { lat: 31.0, lng: 100.0, name: "China", species: "Giant Panda", count: 1864 },
  { lat: -25.0, lng: 135.0, name: "Australia", species: "Koala", count: 32000 },
  { lat: -4.5, lng: -55.0, name: "Amazon", species: "Jaguar", count: 64000 },
  { lat: 64.0, lng: -19.0, name: "Iceland", species: "Arctic Fox", count: 8000 },
];

// Convert lat/lng to 3D coordinates
const latLngToVector3 = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
};

// Rotating Earth component
const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0012;
    }
  });

  return (
    <group>
      {/* Earth sphere */}
      <Sphere ref={earthRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#1a4d2e"
          roughness={0.8}
          metalness={0.2}
        />
      </Sphere>
      
      {/* Atmospheric glow */}
      <Sphere args={[2.05, 64, 64]}>
        <meshStandardMaterial
          color="#2d5a3d"
          transparent
          opacity={0.1}
        />
      </Sphere>
    </group>
  );
};

// Wildlife markers on globe
const WildlifeMarkers = ({ onMarkerClick }: { onMarkerClick: (hotspot: typeof wildlifeHotspots[0]) => void }) => {
  const markersRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (markersRef.current) {
      markersRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={markersRef}>
      {wildlifeHotspots.map((hotspot, index) => {
        const position = latLngToVector3(hotspot.lat, hotspot.lng, 2.1);
        
        return (
          <group key={index} position={position}>
            <mesh onClick={() => onMarkerClick(hotspot)}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial
                color="#4ade80"
                emissive="#22c55e"
                emissiveIntensity={0.5}
              />
            </mesh>
            <Html
              position={[0, 0.1, 0]}
              style={{ pointerEvents: 'none' }}
              center
            >
              <div className="px-2 py-1 bg-jungle-dark/90 text-ivory text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {hotspot.name}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

interface GlobeVisualizationProps {
  onMarkerClick?: (hotspot: typeof wildlifeHotspots[0]) => void;
}

const GlobeVisualization = ({ onMarkerClick = () => {} }: GlobeVisualizationProps) => {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#22c55e" />
        
        <Earth />
        <WildlifeMarkers onMarkerClick={onMarkerClick} />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default GlobeVisualization;
export { wildlifeHotspots };
