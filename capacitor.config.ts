
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c12b60d6ab114164817e890f4b99f0aa',
  appName: 'earth-explorer-ai-globe',
  webDir: 'dist',
  server: {
    url: "https://c12b60d6-ab11-4164-817e-890f4b99f0aa.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  android: {
    backgroundColor: "#050A14"
  }
};

export default config;
