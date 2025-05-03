
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface GlobeProps {
  className?: string;
  autoRotate?: boolean;
  showPoliticalBorders?: boolean;
  showBiomes?: boolean;
  showTectonicPlates?: boolean;
  showWeather?: boolean;
  onLocationSelect?: (location: { name: string; coordinates: [number, number] }) => void;
}

const Globe: React.FC<GlobeProps> = ({
  className,
  autoRotate = true,
  showPoliticalBorders = false,
  showBiomes = false,
  showTectonicPlates = false,
  showWeather = false,
  onLocationSelect
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const mapLoaded = useRef<boolean>(false);

  // Define a default map style or use a placeholder token
  const mapboxToken = 'pk.eyJ1IjoiZ2Vvc3BoZXJlMzYwIiwiYSI6ImNsa3N4djNxbzBpMHgza3FqcDlwNDFnOXYifQ.KVpBqnHmHgoxQg_ZKDgeHQ';

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize Mapbox
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      projection: 'globe',
      zoom: 1.8,
      center: [0, 30],
      pitch: 45,
      attributionControl: false
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'bottom-right'
    );

    // Add atmosphere and fog effects
    map.current.on('style.load', () => {
      if (!map.current) return;
      
      mapLoaded.current = true;
      
      map.current.setFog({
        color: 'rgb(10, 20, 40)',
        'horizon-blend': 0.1,
        'space-color': 'rgb(5, 10, 20)',
        'star-intensity': 0.6
      });

      // Apply layer visibility based on props
      updateLayers();
    });

    // Auto-rotation logic
    const secondsPerRevolution = 120;
    let userInteracting = false;
    let spinEnabled = autoRotate;

    function spinGlobe() {
      if (!map.current) return;
      
      const zoom = map.current.getZoom();
      if (spinEnabled && !userInteracting && zoom < 3) {
        const center = map.current.getCenter();
        center.lng -= 0.2;
        map.current.easeTo({ center, duration: 100, easing: (n) => n });
        requestAnimationFrame(spinGlobe);
      }
    }

    // Handle interactions
    map.current.on('mousedown', () => {
      userInteracting = true;
    });
    
    map.current.on('mouseup', () => {
      userInteracting = false;
      if (spinEnabled) {
        spinGlobe();
      }
    });

    map.current.on('touchstart', () => {
      userInteracting = true;
    });
    
    map.current.on('touchend', () => {
      userInteracting = false;
      if (spinEnabled) {
        spinGlobe();
      }
    });

    // Place selection handler
    map.current.on('click', (e) => {
      if (onLocationSelect) {
        // Simulate location data (in a real app, we'd use reverse geocoding)
        const name = `Location at ${e.lngLat.lat.toFixed(2)}, ${e.lngLat.lng.toFixed(2)}`;
        onLocationSelect({
          name,
          coordinates: [e.lngLat.lng, e.lngLat.lat]
        });
      }
    });

    // Start spinning if autoRotate is enabled
    if (autoRotate) {
      spinGlobe();
    }

    // Cleanup on unmount
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []); // Only run once on component mount

  // Update layers based on props
  const updateLayers = () => {
    if (!map.current || !mapLoaded.current) return;

    // Political Borders layer
    if (showPoliticalBorders) {
      if (!map.current.getLayer('admin-borders')) {
        map.current.addLayer({
          id: 'admin-borders',
          type: 'line',
          source: {
            type: 'vector',
            url: 'mapbox://mapbox.country-boundaries-v1'
          },
          'source-layer': 'country_boundaries',
          paint: {
            'line-color': '#ffffff',
            'line-width': 1,
            'line-opacity': 0.8
          }
        });
      }
    } else {
      if (map.current.getLayer('admin-borders')) {
        map.current.removeLayer('admin-borders');
      }
    }
    
    // Biomes layer (simplified)
    if (showBiomes) {
      if (!map.current.getLayer('biomes')) {
        map.current.addLayer({
          id: 'biomes',
          type: 'fill',
          source: {
            type: 'vector',
            url: 'mapbox://mapbox.mapbox-terrain-v2'
          },
          'source-layer': 'landcover',
          paint: {
            'fill-color': [
              'match',
              ['get', 'class'],
              'forest', '#2ecc71',
              'scrub', '#f39c12',
              'grass', '#27ae60',
              'crop', '#f1c40f',
              'snow', '#ecf0f1',
              '#7f8c8d' // default
            ],
            'fill-opacity': 0.4
          }
        });
      }
    } else {
      if (map.current.getLayer('biomes')) {
        map.current.removeLayer('biomes');
      }
    }
    
    // Tectonic plates (simplified representation)
    if (showTectonicPlates) {
      if (!map.current.getLayer('tectonic')) {
        map.current.addSource('tectonic-plates', {
          type: 'geojson',
          data: 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json'
        });
        
        map.current.addLayer({
          id: 'tectonic',
          type: 'line',
          source: 'tectonic-plates',
          paint: {
            'line-color': '#e74c3c',
            'line-width': 2,
            'line-opacity': 0.8
          }
        });
      }
    } else {
      if (map.current.getLayer('tectonic')) {
        map.current.removeLayer('tectonic');
        map.current.removeSource('tectonic-plates');
      }
    }
    
    // Weather layer (simplified)
    if (showWeather) {
      if (!map.current.getLayer('weather')) {
        map.current.addLayer({
          id: 'weather',
          type: 'raster',
          source: {
            type: 'raster',
            tiles: [
              'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY'
            ],
            tileSize: 256
          },
          paint: {
            'raster-opacity': 0.6
          }
        });
      }
    } else {
      if (map.current.getLayer('weather')) {
        map.current.removeLayer('weather');
      }
    }
  };

  // Update layers when props change
  useEffect(() => {
    updateLayers();
  }, [showPoliticalBorders, showBiomes, showTectonicPlates, showWeather]);

  // Update auto-rotation when prop changes
  useEffect(() => {
    if (!map.current) return;
    
    let userInteracting = false;
    let spinEnabled = autoRotate;

    function spinGlobe() {
      if (!map.current) return;
      
      const zoom = map.current.getZoom();
      if (spinEnabled && !userInteracting && zoom < 3) {
        const center = map.current.getCenter();
        center.lng -= 0.2;
        map.current.easeTo({ center, duration: 100, easing: (n) => n });
        requestAnimationFrame(spinGlobe);
      }
    }

    if (autoRotate) {
      spinGlobe();
    }
  }, [autoRotate]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg overflow-hidden"
      />
      
      {/* Attribution overlay */}
      <div className="absolute bottom-2 left-2 text-xs text-white/60 mix-blend-difference">
        © Mapbox © OpenStreetMap
      </div>
      
      {/* Loading indicator */}
      {!mapLoaded.current && (
        <div className="absolute inset-0 flex items-center justify-center bg-geo-blue-dark/50 backdrop-blur-sm">
          <div className="text-white text-lg">Loading 3D Globe...</div>
        </div>
      )}
    </div>
  );
};

export default Globe;
