
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.22ecfa6f5a664c48a16d98da6244d520',
  appName: 'men-style-avenue',
  webDir: 'dist',
  server: {
    url: 'https://22ecfa6f-5a66-4c48-a16d-98da6244d520.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1a1a',
      showSpinner: false
    }
  }
};

export default config;
