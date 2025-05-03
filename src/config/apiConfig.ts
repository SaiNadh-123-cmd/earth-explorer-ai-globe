
// API Tokens and Configuration
// Note: For a production app, these should be stored securely
// and not committed to version control

export const mapboxConfig = {
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA', // Mapbox public token
  defaultStyle: 'mapbox://styles/mapbox/satellite-v9',
};

export const weatherApiConfig = {
  // Replace with your actual OpenWeatherMap API key if you have one
  apiKey: '1234567890abcdef', 
  endpoint: 'https://api.openweathermap.org/data/2.5',
};
