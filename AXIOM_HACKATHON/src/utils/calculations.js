// Calculate distance between two coordinates (Haversine formula)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (value) => (value * Math.PI) / 180;

// AI-based scoring algorithm
export const calculateScore = (price, distance, stock, maxPrice, maxDistance) => {
  // Normalize values (lower is better for price and distance)
  const priceScore = maxPrice > 0 ? (1 - price / maxPrice) * 0.4 : 0;
  const distanceScore = maxDistance > 0 ? (1 - distance / maxDistance) * 0.4 : 0;
  const stockScore = Math.min(stock / 100, 1) * 0.2;
  
  return (priceScore + distanceScore + stockScore) * 100;
};

// Search and rank pharmacies - FILTER BY DISTANCE
export const searchPharmacies = (pharmacies, medicine, userLat, userLng, maxDistanceKm = 10) => {
  const results = [];
  
  pharmacies.forEach(pharmacy => {
    if (pharmacy.inventory[medicine]) {
      const medicineData = pharmacy.inventory[medicine];
      const distance = calculateDistance(userLat, userLng, pharmacy.lat, pharmacy.lng);
      
      // ⚠️ ONLY INCLUDE PHARMACIES WITHIN MAX DISTANCE
      if (distance <= maxDistanceKm) {
        results.push({
          ...pharmacy,
          medicine,
          price: medicineData.price,
          stock: medicineData.stock,
          distance: distance
        });
      }
    }
  });
  
  // Calculate max values for normalization
  const maxPrice = Math.max(...results.map(r => r.price), 1);
  const maxDistance = Math.max(...results.map(r => r.distance), 1);
  
  // Add scores
  results.forEach(result => {
    result.score = calculateScore(
      result.price,
      result.distance,
      result.stock,
      maxPrice,
      maxDistance
    );
  });
  
  // Sort by distance first (nearest first), then by score
  return results.sort((a, b) => {
    // Primary sort: distance (ascending)
    if (Math.abs(a.distance - b.distance) > 0.5) {
      return a.distance - b.distance;
    }
    // Secondary sort: AI score (descending)
    return b.score - a.score;
  });
};
