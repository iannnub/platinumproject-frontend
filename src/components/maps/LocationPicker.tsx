'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@/lib/leaflet-config';
import { Search, MapPin, Loader2, Navigation } from 'lucide-react';

interface LocationPickerProps {
  onLocationChange: (lat: number, lng: number, address: string) => void;
  initialLat?: number;
  initialLng?: number;
  initialAddress?: string;
}

// Controller to programmatic move map center
function MapViewController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 15, { duration: 1.5 });
  }, [center, map]);
  return null;
}

function LocationMarker({
  position,
  setPosition,
  onLocationChange,
}: {
  position: [number, number];
  setPosition: (pos: [number, number]) => void;
  onLocationChange: (lat: number, lng: number, address: string) => void;
}) {
  const markerRef = useRef<any>(null);

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=id`,
        {
          signal: AbortSignal.timeout(5000),
          headers: {
            'User-Agent': 'PlatinumProjectBooking/1.0',
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        const address = data.display_name || '';
        onLocationChange(lat, lng, address);
      }
    } catch {
      onLocationChange(lat, lng, '');
    }
  };

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      fetchAddress(lat, lng);
    },
  });

  return (
    <Marker
      ref={markerRef}
      position={position}
      draggable={true}
      eventHandlers={{
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            const { lat, lng } = marker.getLatLng();
            setPosition([lat, lng]);
            fetchAddress(lat, lng);
          }
        },
      }}
    />
  );
}

export default function LocationPicker({
  onLocationChange,
  initialLat = -7.0252,
  initialLng = 109.8285,
  initialAddress = '',
}: LocationPickerProps) {
  const [position, setPosition] = useState<[number, number]>([initialLat, initialLng]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [addressPreview, setAddressPreview] = useState(initialAddress);

  useEffect(() => {
    if (initialAddress) {
      setAddressPreview(initialAddress);
    }
  }, [initialAddress]);

  const handleLocationUpdate = useCallback(
    (lat: number, lng: number, addr: string) => {
      setPosition([lat, lng]);
      if (addr) setAddressPreview(addr);
      onLocationChange(lat, lng, addr);
    },
    [onLocationChange]
  );

  const handleSearch = async (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json&limit=5&countrycodes=id&accept-language=id`,
        {
          signal: AbortSignal.timeout(5000),
          headers: {
            'User-Agent': 'PlatinumProjectBooking/1.0',
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data);
      }
    } catch {
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectResult = (item: any) => {
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);
    handleLocationUpdate(lat, lng, item.display_name);
    setSearchResults([]);
    setSearchQuery('');
  };

  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          handleLocationUpdate(lat, lng, '');
        },
        (err) => {
          console.warn('Geolocation denied or unavailable', err);
        }
      );
    }
  };

  return (
    <div className="space-y-3">
      {/* Search Input Bar */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch(e);
                }
              }}
              placeholder="Cari lokasi acara (nama jalan, gedung, kota)..."
              className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-silver-900 border border-silver-700 text-white placeholder:text-silver-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
            />
            {isSearching && (
              <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold animate-spin" />
            )}
          </div>
          <button
            type="button"
            onClick={(e) => handleSearch(e)}
            disabled={isSearching || !searchQuery.trim()}
            className="min-h-[44px] px-4 sm:px-5 py-2.5 text-xs sm:text-sm bg-gold hover:bg-gold-dark text-white rounded-lg font-semibold transition-all shadow-gold disabled:opacity-50 shrink-0"
          >
            Cari
          </button>
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            title="Gunakan Lokasi Saat Ini"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 bg-silver-800 hover:bg-silver-700 text-gold rounded-lg border border-silver-700 transition-colors shrink-0"
          >
            <Navigation className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute z-[1000] left-0 right-0 mt-1.5 bg-silver-900 border border-silver-700 rounded-xl shadow-2xl max-h-56 overflow-y-auto divide-y divide-silver-800 backdrop-blur-md">
            {searchResults.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectResult(item)}
                className="w-full text-left px-3.5 py-3 text-xs text-silver-200 hover:text-white hover:bg-silver-800 flex items-start gap-2.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />
                <span className="line-clamp-2">{item.display_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] rounded-xl overflow-hidden border border-silver-700 shadow-md">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            position={position}
            setPosition={setPosition}
            onLocationChange={handleLocationUpdate}
          />
          <MapViewController center={position} />
        </MapContainer>

        {/* Map Overlay Badge */}
        <div className="absolute bottom-3 left-3 right-3 z-[400] pointer-events-none">
          <div className="bg-silver-900/95 backdrop-blur-md p-2.5 rounded-lg border border-silver-700 shadow-lg text-xs flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold shrink-0" />
            <div className="flex-1 truncate">
              <span className="font-semibold text-white">Pin Lokasi: </span>
              <span className="text-silver-300 font-mono">
                {position[0].toFixed(5)}, {position[1].toFixed(5)}
              </span>
            </div>
            <span className="text-[11px] text-silver-400 hidden sm:inline">
              Klik / geser pin untuk ubah
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
