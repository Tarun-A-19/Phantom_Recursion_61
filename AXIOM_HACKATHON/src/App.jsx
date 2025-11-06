import { useState, useEffect } from 'react';
import SearchBar from './components/searchbar';
import OCRUpload from './components/ocrupload';
import ResultsList from './components/ResultsList';
import Map from './components/Map';
import PriceChart from './components/PriceChart';
import SubstituteModal from './components/SubstituteModal';
import LocationModal from './components/LocationModal';
import { demoPharmacies, medicineSubstitutes } from './data/demodata';
import { searchPharmacies } from './utils/calculations';
import { getUserLocation } from './utils/api';
import { MapPin, Activity, Shield, Sparkles, TrendingUp, Pill, Heart, ChevronUp } from 'lucide-react';

function App() {
  const [results, setResults] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [currentMedicine, setCurrentMedicine] = useState('');
  const [showSubstitutes, setShowSubstitutes] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true); // NEW
  const [maxDistance] = useState(10);
  
  // Handle location permission
  const handleAllowLocation = async () => {
    setShowLocationModal(false);
    setLocationLoading(true);
    
    try {
      const location = await getUserLocation();
      setUserLocation(location);
      setLocationLoading(false);
      
      if (location.isDefault) {
        alert('⚠️ Location access was denied. Using approximate location. For best results, please enable location permissions in your browser settings.');
      }
    } catch (err) {
      console.error('Location error:', err);
      setUserLocation({ lat: 28.6139, lng: 77.2090, isDefault: true });
      setLocationLoading(false);
      alert('⚠️ Could not get your location. Using Delhi as default location.');
    }
  };
  
  const handleDenyLocation = () => {
    setShowLocationModal(false);
    setUserLocation({ lat: 28.6139, lng: 77.2090, isDefault: true });
    setLocationLoading(false);
    alert('ℹ️ Location access denied. Using Delhi as default. You can enable location anytime by clicking "Enable Precise Location".');
  };
  
  // ✅ AUTO-REQUEST EXACT LOCATION ON MOUNT
  useEffect(() => {
    const requestLocation = async () => {
      setLocationLoading(true);
      
      try {
        console.log('🔍 Requesting your exact location...');
        const location = await getUserLocation();
        
        console.log('📍 Location received:', location);
        setUserLocation(location);
        setLocationLoading(false);
        
        if (location.isDefault) {
          // If user denied, show modal to ask again
          setTimeout(() => {
            setShowLocationModal(true);
          }, 1000);
        }
      } catch (err) {
        console.error('❌ Location error:', err);
        setUserLocation({ lat: 28.6139, lng: 77.2090, isDefault: true });
        setLocationLoading(false);
        
        // Show modal to ask permission
        setTimeout(() => {
          setShowLocationModal(true);
        }, 1000);
      }
    };
    
    requestLocation();
  }, []);
  
  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSearch = (medicine) => {
    if (!userLocation) {
      alert('Getting your location...');
      return;
    }
    
    setCurrentMedicine(medicine);
    
    const searchResults = searchPharmacies(
      demoPharmacies,
      medicine,
      userLocation.lat,
      userLocation.lng,
      maxDistance
    );
    
    setResults(searchResults);
    
    if (searchResults.length === 0) {
      alert(`No pharmacies found within ${maxDistance}km with ${medicine}. Try a different medicine.`);
    }
    
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };
  
  const handleViewSubstitutes = (medicine) => {
    setSelectedMedicine(medicine);
    setShowSubstitutes(true);
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // ✅ SHOW LOADING SCREEN WHILE GETTING LOCATION
  if (locationLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        <div className="text-center">
          <div className="bg-gradient-to-br from-cyan-100 to-blue-100 w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg animate-pulse">
            <MapPin size={64} className="text-cyan-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Getting Your Location...</h2>
          <p className="text-gray-600 mb-2">
            Please allow location access when prompted
          </p>
          <p className="text-sm text-gray-500">
            We need your location to find nearby pharmacies
          </p>
          <div className="mt-6">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      {/* Medical Particles Background */}
      <div className="medical-particles"></div>
      
      {/* Location Modal - Only shows if permission denied */}
      <LocationModal 
        isVisible={showLocationModal}
        onAllow={handleAllowLocation}
        onDeny={handleDenyLocation}
      />
      
      {/* REST OF YOUR APP CODE - Keep everything else the same */}
      {/* Navbar, Hero, Main Content... */}
      
      {/* Fixed Navbar */}
      <nav className="fixed top-0 w-full glass-effect shadow-lg z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl shadow-lg medical-pulse">
                <Pill size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">MediLocate</h1>
                <p className="text-xs text-gray-600 font-medium">Smart Pharmacy Finder</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-gray-700 hover:text-cyan-600 transition-colors font-medium">About</a>
              <a href="#features" className="text-gray-700 hover:text-cyan-600 transition-colors font-medium">Features</a>
              <a href="#contact" className="text-gray-700 hover:text-cyan-600 transition-colors font-medium">Contact</a>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-5 py-2.5 rounded-full mb-8 shadow-md ai-badge">
            <Sparkles size={18} className="medical-icon-glow" />
            <span className="text-sm font-bold">AI-Powered Medicine Search</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Find Medicines</span>
            <br />
            <span className="text-gray-800">At Best Prices, Instantly</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover nearby pharmacies with <span className="font-bold text-cyan-600">real-time availability</span>, 
            compare prices, and get <span className="font-bold text-blue-600">AI-powered recommendations</span>.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="glass-effect px-5 py-3 rounded-full shadow-md">
              <div className="flex items-center gap-2">
                <Shield size={20} className="text-green-600" />
                <span className="text-sm font-semibold">100% Verified</span>
              </div>
            </div>
            <div className="glass-effect px-5 py-3 rounded-full shadow-md">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-600" />
                <span className="text-sm font-semibold">Best Prices</span>
              </div>
            </div>
            <div className="glass-effect px-5 py-3 rounded-full shadow-md">
              <div className="flex items-center gap-2">
                <Heart size={20} className="text-red-500" />
                <span className="text-sm font-semibold">Trusted by 10K+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        {/* Location Status Card */}
        {userLocation && (
          <div className={`medical-container mb-8 medical-card ${
            userLocation.isDefault ? 'border-2 border-amber-300' : 'border-2 border-green-300'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl shadow-lg ${
                userLocation.isDefault 
                  ? 'bg-gradient-to-br from-amber-400 to-orange-500' 
                  : 'bg-gradient-to-br from-green-500 to-emerald-600'
              }`}>
                <MapPin size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 font-medium mb-1">
                  {userLocation.isDefault ? '⚠️ Using Approximate Location' : '✅ Your Exact GPS Location'}
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Showing pharmacies within <strong>{maxDistance}km radius</strong>
                  {userLocation.accuracy && ` • Accuracy: ±${userLocation.accuracy.toFixed(0)}m`}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  userLocation.isDefault 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  <span className={`w-2 h-2 rounded-full animate-pulse ${
                    userLocation.isDefault ? 'bg-amber-500' : 'bg-green-500'
                  }`}></span>
                  <span className="text-sm font-bold">
                    {userLocation.isDefault ? 'Approximate' : 'GPS Active'}
                  </span>
                </div>
                {userLocation.isDefault && (
                  <button
                    onClick={() => setShowLocationModal(true)}
                    className="text-xs text-cyan-600 hover:text-cyan-700 font-semibold hover:underline"
                  >
                    Enable Precise GPS
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Two Column Layout - Keep rest of code */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="medical-container medical-card">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-10 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full"></span>
                <h2 className="text-xl font-bold text-gray-800">Search Medicine</h2>
              </div>
              <SearchBar onSearch={handleSearch} />
            </div>
            
            <div className="medical-container medical-card">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-10 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></span>
                <h2 className="text-xl font-bold text-gray-800">Prescription Scanner</h2>
              </div>
              <OCRUpload onExtract={handleSearch} />
            </div>
            
            <div id="results-section">
              {results.length > 0 && (
                <div className="space-y-6">
                  <PriceChart results={results} />
                  <ResultsList 
                    results={results} 
                    onViewSubstitutes={handleViewSubstitutes}
                  />
                </div>
              )}
              
              {results.length === 0 && (
                <div className="medical-container text-center py-16 medical-card">
                  <div className="bg-gradient-to-br from-cyan-100 to-blue-100 w-28 h-28 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg">
                    <Activity size={56} className="text-cyan-600 medical-pulse" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">Start Your Search</h3>
                  <p className="text-gray-600 mb-8 text-lg">
                    Find nearby pharmacies with the best prices
                  </p>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <button 
                      onClick={() => handleSearch('Paracetamol 500mg')}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
                    >
                      Try: Paracetamol 500mg
                    </button>
                    <button 
                      onClick={() => handleSearch('Cetirizine 10mg')}
                      className="bg-green-100 hover:bg-green-200 text-green-700 px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
                    >
                      Try: Cetirizine 10mg
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:sticky lg:top-24 h-fit space-y-6">
            <div className="medical-container medical-card">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-10 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></span>
                <h2 className="text-xl font-bold text-gray-800">Nearby Pharmacies</h2>
              </div>
              <Map center={userLocation} pharmacies={results} />
            </div>
            
            {results.length > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg border-2 border-green-200">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                  <TrendingUp size={22} className="text-green-600" />
                  Search Summary
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Results Found</p>
                    <p className="text-4xl font-bold text-cyan-600">{results.length}</p>
                  </div>
                  <div className="bg-white px-4 py-4 rounded-xl shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Searching for:</p>
                    <p className="font-bold text-gray-800">{currentMedicine}</p>
                  </div>
                  <div className="pt-4 border-t border-green-200">
                    <p className="text-xs text-gray-600 mb-2">🏆 Top Recommended</p>
                    <p className="font-bold text-green-600">{results[0]?.name}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-2xl z-40 hover:scale-110"
        >
          <ChevronUp size={24} />
        </button>
      )}
      
      {showSubstitutes && (
        <SubstituteModal
          medicine={selectedMedicine}
          substitutes={medicineSubstitutes[selectedMedicine]}
          onClose={() => setShowSubstitutes(false)}
        />
      )}
    </div>
  );
}

export default App;
