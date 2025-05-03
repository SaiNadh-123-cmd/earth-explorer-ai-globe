
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapboxConfig } from '@/config/apiConfig';

interface GlobeProps {
  className?: string;
  autoRotate?: boolean;
  showPoliticalBorders?: boolean;
  showBiomes?: boolean;
  showTectonicPlates?: boolean;
  showWeather?: boolean;
  onLocationSelect?: (location: { name: string; coordinates: [number, number] }) => void;
  mapboxToken?: string;
}

const Globe: React.FC<GlobeProps> = ({
  className,
  autoRotate = true,
  showPoliticalBorders = false,
  showBiomes = false,
  showTectonicPlates = false,
  showWeather = false,
  onLocationSelect,
  mapboxToken
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [tokenError, setTokenError] = useState<boolean>(false);

  // Initialize or reinitialize map when token changes
  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Cleanup previous map instance if it exists
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    try {
      // Initialize Mapbox with the provided token
      mapboxgl.accessToken = mapboxToken || mapboxConfig.accessToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapboxConfig.defaultStyle,
        projection: 'globe',
        zoom: 1.8,
        center: [0, 30],
        pitch: 45,
        attributionControl: false
      });

      // Reset token error state
      setTokenError(false);

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'bottom-right'
      );

      // Handle map load event
      map.current.on('load', () => {
        setMapLoaded(true);
        
        if (!map.current) return;
        
        // Add atmosphere and stars
        map.current.setFog({
          color: 'rgb(10, 20, 40)',
          'horizon-blend': 0.1,
          'space-color': 'rgb(5, 10, 20)',
          'star-intensity': 0.6
        });

        // Add 3D terrain
        map.current.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'tileSize': 512,
          'maxzoom': 14
        });
        
        map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

        // Apply layer visibility based on props
        updateLayers();
      });

      // Handle map error
      map.current.on('error', (e) => {
        console.error("Mapbox error:", e);
        if (e.error && e.error.status === 401) {
          setTokenError(true);
          setMapLoaded(false);
        }
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

      // Place selection handler with reverse geocoding
      map.current.on('click', (e) => {
        if (onLocationSelect) {
          // Get features at click point
          const features = map.current?.queryRenderedFeatures(e.point);
          
          // Try to find a named feature (country, city, etc.)
          const namedFeature = features?.find(f => 
            f.properties && (f.properties.name || f.properties.NAME || f.properties.place_name)
          );
          
          if (namedFeature?.properties) {
            const name = namedFeature.properties.name || 
                        namedFeature.properties.NAME || 
                        namedFeature.properties.place_name || 
                        `Location at ${e.lngLat.lat.toFixed(2)}, ${e.lngLat.lng.toFixed(2)}`;
                        
            onLocationSelect({
              name,
              coordinates: [e.lngLat.lng, e.lngLat.lat]
            });
          } else {
            // If no named feature found, use coordinates
            const name = `Location at ${e.lngLat.lat.toFixed(2)}, ${e.lngLat.lng.toFixed(2)}`;
            onLocationSelect({
              name,
              coordinates: [e.lngLat.lng, e.lngLat.lat]
            });
          }
        }
      });

      // Start spinning if autoRotate is enabled
      if (autoRotate) {
        spinGlobe();
      }
    } catch (error) {
      console.error("Failed to initialize map:", error);
      setTokenError(true);
      setMapLoaded(false);
    }

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]); 

  // Update layers based on props
  const updateLayers = () => {
    if (!map.current || !mapLoaded) return;

    try {
      // Political Borders layer
      if (showPoliticalBorders) {
        if (!map.current.getLayer('admin-borders')) {
          // Add country borders
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
          
          // Add country labels
          map.current.addLayer({
            id: 'country-labels',
            type: 'symbol',
            source: {
              type: 'vector',
              url: 'mapbox://mapbox.country-boundaries-v1'
            },
            'source-layer': 'country_boundaries',
            paint: {
              'text-color': '#ffffff',
              'text-halo-color': 'rgba(0, 0, 0, 0.5)',
              'text-halo-width': 1
            },
            layout: {
              'text-field': ['get', 'name_en'],
              'text-size': 12,
              'text-transform': 'uppercase',
              'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
              'text-letter-spacing': 0.05,
              'text-max-width': 7,
              'text-variable-anchor': ['center'],
              'text-radial-offset': 0.5,
              'text-justify': 'auto'
            }
          });
        }
      } else {
        if (map.current.getLayer('admin-borders')) {
          map.current.removeLayer('admin-borders');
        }
        if (map.current.getLayer('country-labels')) {
          map.current.removeLayer('country-labels');
        }
      }
      
      // Biomes layer with real data
      if (showBiomes) {
        if (!map.current.getLayer('biomes')) {
          // Add land cover data
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
                'wood', '#2ecc71',
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
      
      // Tectonic plates with real GeoJSON data
      if (showTectonicPlates) {
        if (!map.current.getSource('tectonic-plates')) {
          map.current.addSource('tectonic-plates', {
            type: 'geojson',
            data: 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json'
          });
          
          map.current.addLayer({
            id: 'tectonic-lines',
            type: 'line',
            source: 'tectonic-plates',
            paint: {
              'line-color': '#e74c3c',
              'line-width': 2,
              'line-opacity': 0.8
            }
          });
          
          map.current.addLayer({
            id: 'tectonic-labels',
            type: 'symbol',
            source: 'tectonic-plates',
            layout: {
              'text-field': ['get', 'PlateName'],
              'text-size': 10,
              'text-allow-overlap': false,
              'text-ignore-placement': false,
              'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
            },
            paint: {
              'text-color': '#e74c3c',
              'text-halo-color': 'rgba(0, 0, 0, 0.5)',
              'text-halo-width': 1
            }
          });
        }
      } else {
        if (map.current.getLayer('tectonic-lines')) {
          map.current.removeLayer('tectonic-lines');
        }
        if (map.current.getLayer('tectonic-labels')) {
          map.current.removeLayer('tectonic-labels');
        }
        if (map.current.getSource('tectonic-plates')) {
          map.current.removeSource('tectonic-plates');
        }
      }
      
      // Weather layer with real data from OpenWeatherMap
      if (showWeather) {
        if (!map.current.getLayer('weather')) {
          map.current.addLayer({
            id: 'weather',
            type: 'raster',
            source: {
              type: 'raster',
              tiles: [
                // Use OpenWeatherMap free tile layer for precipitation
                'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=1234567890abcdef'
              ],
              tileSize: 256,
              attribution: '© OpenWeatherMap'
            },
            paint: {
              'raster-opacity': 0.6,
              'raster-fade-duration': 100
            }
          });
          
          // Add clouds layer
          map.current.addLayer({
            id: 'clouds',
            type: 'raster',
            source: {
              type: 'raster',
              tiles: [
                'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=1234567890abcdef'
              ],
              tileSize: 256,
              attribution: '© OpenWeatherMap'
            },
            paint: {
              'raster-opacity': 0.4,
              'raster-fade-duration': 100
            }
          });
        }
      } else {
        if (map.current.getLayer('weather')) {
          map.current.removeLayer('weather');
        }
        if (map.current.getLayer('clouds')) {
          map.current.removeLayer('clouds');
        }
      }
      
      // Add major cities if showing political borders
      if (showPoliticalBorders) {
        if (!map.current.getSource('major-cities')) {
          fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places_simple.geojson')
            .then(response => response.json())
            .then(data => {
              if (!map.current) return;
              
              // Filter for major cities
              const majorCities = {
                type: 'FeatureCollection',
                features: data.features.filter((f: any) => 
                  f.properties.pop_max > 1000000 || f.properties.worldcity === 1
                )
              };
              
              map.current.addSource('major-cities', {
                type: 'geojson',
                data: majorCities
              });
              
              map.current.addLayer({
                id: 'city-points',
                type: 'circle',
                source: 'major-cities',
                paint: {
                  'circle-radius': [
                    'interpolate', ['linear'], ['zoom'],
                    1, 2,
                    4, 4,
                    7, 8
                  ],
                  'circle-color': '#f1c40f',
                  'circle-stroke-width': 1,
                  'circle-stroke-color': '#ffffff'
                }
              });
              
              map.current.addLayer({
                id: 'city-labels',
                type: 'symbol',
                source: 'major-cities',
                layout: {
                  'text-field': ['get', 'name'],
                  'text-size': 12,
                  'text-offset': [0, 1.5],
                  'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                  'text-radial-offset': 0.5,
                  'text-justify': 'auto'
                },
                paint: {
                  'text-color': '#ffffff',
                  'text-halo-color': 'rgba(0, 0, 0, 0.7)',
                  'text-halo-width': 1.5
                }
              });
            })
            .catch(err => {
              console.error("Error loading cities data:", err);
            });
        }
      } else {
        if (map.current.getLayer('city-points')) {
          map.current.removeLayer('city-points');
        }
        if (map.current.getLayer('city-labels')) {
          map.current.removeLayer('city-labels');
        }
        if (map.current.getSource('major-cities')) {
          map.current.removeSource('major-cities');
        }
      }
    } catch (error) {
      console.error("Error updating map layers:", error);
    }
  };

  // Update layers when props change
  useEffect(() => {
    updateLayers();
  }, [showPoliticalBorders, showBiomes, showTectonicPlates, showWeather, mapLoaded]);

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

    if (autoRotate && !userInteracting) {
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
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-geo-blue-dark/80 backdrop-blur-sm flex-col gap-2">
          {tokenError ? (
            <div className="text-white text-center">
              <div className="text-geo-teal mb-2">Invalid Mapbox token</div>
              <div className="text-sm">Please check your Mapbox token and try again</div>
            </div>
          ) : (
            <div className="text-white text-lg">Loading 3D Globe...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Globe;
