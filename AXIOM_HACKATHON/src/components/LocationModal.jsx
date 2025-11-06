import { MapPin, Navigation, AlertCircle } from 'lucide-react';

const LocationModal = ({ onAllow, onDeny, isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="medical-container max-w-md w-full animate-fade-in">
        <div className="text-center">
          {/* Icon */}
          <div className="bg-gradient-to-br from-cyan-100 to-blue-100 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
            <MapPin size={40} className="text-cyan-600 animate-pulse" />
          </div>
          
          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Enable Location Access
          </h2>
          
          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            We need your location to find the nearest pharmacies and show you the best prices in your area.
          </p>
          
          {/* Benefits List */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 mb-6 text-left border border-blue-200">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Navigation size={16} className="text-blue-600" />
              Why we need this:
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Find pharmacies within <strong>5km radius</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Show accurate <strong>walking/driving distance</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Sort results by <strong>nearest first</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Get <strong>turn-by-turn directions</strong></span>
              </li>
            </ul>
          </div>
          
          {/* Privacy Note */}
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 text-left">
            <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-700">
              <strong>Privacy:</strong> Your location is only used to find nearby pharmacies. We don't store or share your location data.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onDeny}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition-all"
            >
              Skip for Now
            </button>
            <button
              onClick={onAllow}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <MapPin size={18} />
              Allow Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
