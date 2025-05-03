
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import * as THREE from 'three';
import { geoDataSources } from '@/config/apiConfig';

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
  onLocationSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<THREE.Group | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [countriesData, setCountriesData] = useState<any>(null);
  const [selectedPoint, setSelectedPoint] = useState<THREE.Vector3 | null>(null);

  // Initialize 3D globe
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050A14); // Dark background
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45, // FOV
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 300;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Create globe
    const globe = new THREE.Group();
    globeRef.current = globe;
    scene.add(globe);

    // Earth sphere
    const earthGeometry = new THREE.SphereGeometry(100, 64, 64);
    
    // Create earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/land_ocean_ice_cloud_2048.jpg'),
      bumpMap: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/earth_bumpmap.jpg'),
      bumpScale: 2,
      specularMap: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/earth_specular_2048.jpg'),
      specular: new THREE.Color(0x262626),
    });

    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    globe.add(earthMesh);

    // Add clouds layer
    if (showWeather) {
      const cloudsGeometry = new THREE.SphereGeometry(102, 64, 64);
      const cloudsMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/earth_clouds_1024.png'),
        transparent: true,
        opacity: 0.4
      });
      const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
      globe.add(cloudsMesh);
    }

    // Animation loop
    let userInteracting = false;
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (autoRotate && !userInteracting) {
        globe.rotation.y += 0.001;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Interaction setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      const rect = containerRef.current!.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / containerRef.current!.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / containerRef.current!.clientHeight) * 2 + 1;

      // Highlight location under cursor
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(earthMesh);
      
      if (intersects.length > 0) {
        const point = intersects[0].point.clone();
        setSelectedPoint(point);
      }
    };

    const handleClick = () => {
      if (selectedPoint && onLocationSelect) {
        // Convert 3D point to lat/long
        const point = selectedPoint.clone();
        point.normalize();
        
        const lat = 90 - Math.acos(point.y) * 180 / Math.PI;
        const lng = ((270 + (Math.atan2(point.x, point.z) * 180 / Math.PI)) % 360) - 180;

        // Get location name (in a real app, we'd use reverse geocoding here)
        onLocationSelect({
          name: `Location at ${lat.toFixed(2)}, ${lng.toFixed(2)}`,
          coordinates: [lng, lat]
        });
      }
    };

    // Add event listeners
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('click', handleClick);
    
    containerRef.current.addEventListener('mousedown', () => {
      userInteracting = true;
    });
    
    containerRef.current.addEventListener('mouseup', () => {
      userInteracting = false;
    });

    // Add drag to rotate functionality
    let previousMousePosition = { x: 0, y: 0 };
    
    const handleMouseDrag = (event: MouseEvent) => {
      if (userInteracting) {
        const deltaMove = {
          x: event.clientX - previousMousePosition.x,
          y: event.clientY - previousMousePosition.y
        };

        globe.rotation.y += deltaMove.x * 0.005;
        globe.rotation.x += deltaMove.y * 0.005;
        
        // Limit rotation on x-axis to prevent flipping
        globe.rotation.x = Math.max(-Math.PI/4, Math.min(Math.PI/4, globe.rotation.x));
      }
      
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    };
    
    containerRef.current.addEventListener('mousemove', handleMouseDrag);

    // Handle zoom with mouse wheel
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      
      if (cameraRef.current) {
        cameraRef.current.position.z += event.deltaY * 0.1;
        // Limit zoom
        cameraRef.current.position.z = Math.max(150, Math.min(400, cameraRef.current.position.z));
      }
    };
    
    containerRef.current.addEventListener('wheel', handleWheel);

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Load country data for political borders
    if (showPoliticalBorders) {
      fetch(geoDataSources.naturalEarth)
        .then(response => response.json())
        .then(data => {
          setCountriesData(data);
          setMapLoaded(true);
        })
        .catch(error => {
          console.error("Error loading country data:", error);
          setMapLoaded(true); // Still mark as loaded even if there's an error
        });
    } else {
      setMapLoaded(true);
    }

    // Cleanup function
    return () => {
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('click', handleClick);
        containerRef.current.removeEventListener('mousedown', () => { userInteracting = true; });
        containerRef.current.removeEventListener('mouseup', () => { userInteracting = false; });
        containerRef.current.removeEventListener('mousemove', handleMouseDrag);
        containerRef.current.removeEventListener('wheel', handleWheel);
        window.removeEventListener('resize', handleResize);
        
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [autoRotate, showPoliticalBorders, showWeather, onLocationSelect]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <div 
        ref={containerRef} 
        className="w-full h-full rounded-lg overflow-hidden"
      />
      
      {/* Attribution overlay */}
      <div className="absolute bottom-2 left-2 text-xs text-white/60 mix-blend-difference">
        © Earth Imagery (Three.js)
      </div>
      
      {/* Loading indicator */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-geo-blue-dark/80 backdrop-blur-sm flex-col gap-2">
          <div className="text-white text-lg">Loading 3D Globe...</div>
        </div>
      )}
    </div>
  );
};

export default Globe;
