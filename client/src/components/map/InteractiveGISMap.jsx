import React, { useState, useEffect, Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { seedHotspots, seedClinics, seedComplaints } from '../../data/mohSeedData.js';
import { Layers, MapPin, AlertCircle, Cross, Navigation, Filter } from 'lucide-react';

// Error Boundary for Map Component
class MapErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err) {
    console.warn("Leaflet Map Error:", err);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

let MapContainer, TileLayer, Marker, Popup, CircleMarker;

export const InteractiveGISMap = ({ height = "500px", onSelectLocation = null, isPicker = false }) => {
  const [mounted, setMounted] = useState(false);
  const [LeafletComponents, setLeafletComponents] = useState(null);
  const [showHotspots, setShowHotspots] = useState(true);
  const [showClinics, setShowClinics] = useState(true);
  const [showComplaints, setShowComplaints] = useState(true);
  const [mapCenter, setMapCenter] = useState([6.9271, 79.8612]);

  useEffect(() => {
    setMounted(true);
    import('react-leaflet').then(mod => {
      setLeafletComponents(mod);
    }).catch(err => console.warn("React leaflet load error:", err));

    try {
      if (L && L.Icon && L.Icon.Default && L.Icon.Default.prototype) {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
      }
    } catch (e) {}
  }, []);

  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = [pos.coords.latitude, pos.coords.longitude];
          setMapCenter(newPos);
          if (onSelectLocation) onSelectLocation(pos.coords.latitude, pos.coords.longitude);
        },
        () => alert("Location permission denied or unavailable.")
      );
    }
  };

  const FallbackMap = (
    <div className="w-full rounded-3xl p-8 bg-slate-900 text-white text-center flex flex-col justify-center items-center space-y-3" style={{ height }}>
      <MapPin className="w-12 h-12 text-moh-400 animate-bounce" />
      <h3 className="font-extrabold text-lg">MOH Interactive GIS Surveillance Map</h3>
      <p className="text-xs text-slate-300 max-w-md">
        Monitoring 12 Dengue Vector Hotspots, 5 MOH Primary Healthcare Centers, and PHI Environmental Complaint Sites in Colombo, Kandy, Galle, Jaffna, and Gampaha.
      </p>
      <div className="flex flex-wrap justify-center gap-2 pt-2">
        <span className="px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-xs font-bold border border-rose-500/30">
          High Dengue Risk: Dehiwala & Wattala
        </span>
        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold border border-blue-500/30">
          Active MOH Clinics: 350+ Divisions
        </span>
      </div>
    </div>
  );

  if (!mounted || !LeafletComponents) {
    return FallbackMap;
  }

  const { MapContainer: MC, TileLayer: TL, Marker: M, Popup: P, CircleMarker: CM } = LeafletComponents;

  return (
    <MapErrorBoundary fallback={FallbackMap}>
      <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
        
        {/* Layer Toggle Control Bar */}
        <div className="absolute top-4 left-4 z-[1000] glass-panel p-2.5 rounded-2xl shadow-lg flex flex-wrap items-center gap-3 text-xs font-bold text-slate-800 dark:text-slate-100">
          <div className="flex items-center gap-1.5 px-2 text-moh-700 dark:text-moh-300">
            <Layers className="w-4 h-4" />
            <span>GIS Layers:</span>
          </div>

          <button
            type="button"
            onClick={() => setShowHotspots(!showHotspots)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              showHotspots ? 'bg-rose-500 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
            <span>Dengue Hotspots ({seedHotspots.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setShowClinics(!showClinics)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              showClinics ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Cross className="w-3.5 h-3.5" />
            <span>MOH Clinics ({seedClinics.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setShowComplaints(!showComplaints)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              showComplaints ? 'bg-amber-500 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>PHI Reports ({seedComplaints.length})</span>
          </button>
        </div>

        {/* GPS Locate Me Button */}
        <button
          type="button"
          onClick={handleLocateUser}
          className="absolute top-4 right-4 z-[1000] glass-panel px-3.5 py-2 rounded-2xl shadow-lg flex items-center gap-2 text-xs font-bold text-moh-700 dark:text-moh-300 hover:bg-moh-600 hover:text-white transition"
          title="Locate Current Position"
        >
          <Navigation className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline">My Location</span>
        </button>

        {/* Map Container */}
        <MC
          center={mapCenter}
          zoom={8}
          style={{ height: height, width: "100%", zIndex: 1 }}
          scrollWheelZoom={false}
        >
          <TL
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Dengue Risk Circles */}
          {showHotspots && seedHotspots.map(hs => (
            <React.Fragment key={hs.id}>
              <CM
                center={[hs.lat, hs.lng]}
                radius={hs.riskLevel === 'HIGH' ? 24 : 16}
                pathOptions={{
                  color: hs.riskLevel === 'HIGH' ? '#e11d48' : '#f59e0b',
                  fillColor: hs.riskLevel === 'HIGH' ? '#f43f5e' : '#fbbf24',
                  fillOpacity: 0.35,
                  weight: 2
                }}
              >
                <P>
                  <div className="p-1 font-sans text-xs">
                    <div className="font-extrabold text-rose-600 text-sm mb-1">{hs.location}</div>
                    <div className="font-bold text-slate-700 mb-1">Risk Level: <span className="text-rose-600">{hs.riskLevel}</span></div>
                    <div>Monthly Dengue Cases: <b>{hs.dengueCasesThisMonth}</b></div>
                    <div>Breteau Breeding Index: <b>{hs.breedingIndex}</b></div>
                    <div className="mt-1 text-[11px] text-slate-500 italic">Status: {hs.status}</div>
                  </div>
                </P>
              </CM>
            </React.Fragment>
          ))}

          {/* MOH Clinic Markers */}
          {showClinics && seedClinics.map(cl => (
            <M key={cl.id} position={[cl.lat, cl.lng]}>
              <P>
                <div className="p-1 font-sans text-xs">
                  <div className="font-extrabold text-blue-700 text-sm mb-1">{cl.name}</div>
                  <div className="text-slate-600 mb-1">{cl.address}</div>
                  <div className="font-semibold text-slate-800">Phone: {cl.phone}</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {cl.categories.map((cat, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </P>
            </M>
          ))}

          {/* PHI Complaint Markers */}
          {showComplaints && seedComplaints.map(cmp => (
            <M key={cmp.id} position={[cmp.lat, cmp.lng]}>
              <P>
                <div className="p-1 font-sans text-xs max-w-[200px]">
                  <div className="font-extrabold text-amber-700 text-sm mb-1">{cmp.category}</div>
                  <div className="text-slate-600 mb-1">{cmp.locationName}</div>
                  <div className="font-semibold text-slate-800">Status: <span className="text-amber-600 font-bold">{cmp.status}</span></div>
                  <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">{cmp.description}</p>
                </div>
              </P>
            </M>
          ))}

        </MC>
      </div>
    </MapErrorBoundary>
  );
};
