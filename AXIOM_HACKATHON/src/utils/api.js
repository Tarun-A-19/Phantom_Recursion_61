// Get user location with proper permission request
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported by your browser"));
      return;
    }
    
    // Request location with high accuracy
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        let errorMessage = "";
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions in your browser.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
        }
        
        console.warn("Location error:", errorMessage);
        
        // Fallback to default location (Delhi) if permission denied
        resolve({ 
          lat: 28.6139, 
          lng: 77.2090,
          isDefault: true 
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
};

// Simulated OCR function
export const extractMedicineFromImage = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return ["Paracetamol 500mg", "Cetirizine 10mg"];
};
