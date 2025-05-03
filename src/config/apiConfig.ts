
// API Tokens and Configuration
// Note: For a production app, these should be stored securely
// and not committed to version control

export const googleMapsConfig = {
  apiKey: '', // User will need to provide their Google Maps API key
  placesEndpoint: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
};

export const weatherApiConfig = {
  // Replace with your actual OpenWeatherMap API key if you have one
  apiKey: '1234567890abcdef', 
  endpoint: 'https://api.openweathermap.org/data/2.5',
};

// Free GeoJSON data sources
export const geoDataSources = {
  countries: 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
  cities: 'https://raw.githubusercontent.com/drei01/geojson-world-cities/master/cities.geojson',
  naturalEarth: 'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/110m/cultural/ne_110m_admin_0_countries.json'
};

