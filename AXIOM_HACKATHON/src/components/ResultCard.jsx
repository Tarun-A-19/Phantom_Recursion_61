import { Phone, Navigation, Package, Star, MapPin } from 'lucide-react';

const ResultCard = ({ pharmacy, isRecommended, onViewSubstitutes }) => {
  // Function to open Google Maps directions
  const handleDirections = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const destination = `${pharmacy.lat},${pharmacy.lng}`;
    const label = encodeURIComponent(pharmacy.name);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&destination_place_id=${label}`;
    
    console.log('Opening directions:', mapsUrl); // Debug log
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };
  
  // Function to call pharmacy
  const handleCall = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (pharmacy.contact) {
      window.location.href = `tel:${pharmacy.contact}`;
    } else {
      alert('Contact number not available');
    }
  };
  
  return (
    <div className={`relative medical-container medical-card mb-4 ${
      isRecommended 
        ? 'border-2 border-cyan-400 bg-gradient-to-br from-cyan-50 to-blue-50' 
        : 'border border-gray-200'
    }`}>
      
      {/* AI Recommended Badge */}
      {isRecommended && (
        <div className="absolute -top-3 left-6 z-10">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg ai-badge">
            <Star size={14} fill="white" />
            AI RECOMMENDED
          </div>
        </div>
      )}
      
      {/* Pharmacy Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800 mb-1">{pharmacy.name}</h3>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(pharmacy.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">{pharmacy.rating} ⭐</span>
          </div>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
          <p className="text-xs text-gray-600 mb-1">Price</p>
          <p className="text-2xl font-bold text-green-600">₹{pharmacy.price}</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
          <p className="text-xs text-gray-600 mb-1">Distance</p>
          <p className="text-2xl font-bold text-blue-600">{pharmacy.distance.toFixed(1)} km</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
          <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
            <Package size={14} />
            Stock
          </p>
          <p className="text-2xl font-bold text-purple-600">{pharmacy.stock}</p>
        </div>
        
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-200">
          <p className="text-xs text-gray-600 mb-1">AI Score</p>
          <p className="text-2xl font-bold text-cyan-600">{pharmacy.score.toFixed(1)}</p>
        </div>
      </div>
      
      {/* Action Buttons - FIXED Z-INDEX */}
      <div className="flex gap-2 mb-3 relative z-20">
        <button 
          type="button"
          onClick={handleDirections}
          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all font-semibold shadow-md hover:shadow-lg hover:scale-105 cursor-pointer"
        >
          <Navigation size={18} />
          Directions
        </button>
        <button 
          type="button"
          onClick={handleCall}
          className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all font-semibold shadow-md hover:shadow-lg hover:scale-105 cursor-pointer"
        >
          <Phone size={18} />
          Call
        </button>
      </div>
      
      {/* Substitute Medicines Button */}
      <button 
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onViewSubstitutes();
        }}
        className="w-full text-cyan-600 hover:text-cyan-700 text-sm font-semibold py-2 border-2 border-cyan-200 hover:border-cyan-300 rounded-xl transition-all hover:bg-cyan-50 cursor-pointer"
      >
        View Substitute Medicines →
      </button>
      
      {/* Contact Info */}
      {pharmacy.contact && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-600 flex items-center gap-1">
            <Phone size={12} />
            {pharmacy.contact}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
