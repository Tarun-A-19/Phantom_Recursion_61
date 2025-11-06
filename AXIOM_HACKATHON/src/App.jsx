import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import DoctorDashboard from './components/DoctorDashboard';
import PrescriptionPage from './components/PrescriptionPage';
import SymptomCheckerPage from './components/SymptomCheckerPage';
import DoctorConsultPage from './components/DoctorConsultPage';
import SearchBar from './components/searchbar';
import OCRUpload from './components/ocrupload';
import ResultsList from './components/ResultsList';
import Map from './components/Map';
import PriceChart from './components/PriceChart';
import SubstituteModal from './components/SubstituteModal';
import LocationModal from './components/LocationModal';
import MedicineInfoCard from './components/medicineinfocard';
import { demoPharmacies, medicineSubstitutes } from './data/demodata';
import { medicineInfo } from './data/medicineinfo';
import { searchPharmacies } from './utils/calculations';
import { getUserLocation } from './utils/api';
import { MapPin, Activity, Shield, Sparkles, TrendingUp, Pill, Heart, ChevronUp, LogOut, Menu, X } from 'lucide-react';

function App() {
  // Authentication States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  // Page Navigation: 'home', 'prescription', 'symptoms', or 'doctors'
  const [currentPage, setCurrentPage] = useState('home');
  
  // App States
  const [results, setResults] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [currentMedicine, setCurrentMedicine] = useState('');
  const [showSubstitutes, setShowSubstitutes] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);
  const [maxDistance] = useState(5); // 5KM RADIUS
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
      
      // Only request location for patients
      if (!userData.isDoctor) {
        setLocationLoading(true);
      } else {
        setLocationLoading(false);
      }
    } else {
      setLocationLoading(false);
    }
  }, []);
  
  // Handle login
  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    sessionStorage.setItem('user', JSON.stringify(userData));
    
    // Only request location for patients
    if (!userData.isDoctor) {
      setLocationLoading(true);
    } else {
      setLocationLoading(false);
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setResults([]);
    setCurrentMedicine('');
    setCurrentPage('home');
    setShowMobileMenu(false);
  };
  
  // Handle medicine selection from prescription/symptom checker
  const handleMedicineFromPrescription = (medicine) => {
    setCurrentPage('home');
    setTimeout(() => {
      handleSearch(medicine);
    }, 100);
  };
  
  // Handle location access
  const handleAllowLocation = async () => {
    setShowLocationModal(false);
    setLocationLoading(true);
    
    try {
      const location = await getUserLocation();
      setUserLocation(location);
      setLocationLoading(false);
      
      if (location.isDefault) {
        alert('⚠️ Location access denied. Using default location.');
      }
    } catch (err) {
      console.error('Location error:', err);
      setUserLocation({ lat: 12.9716, lng: 77.5946, isDefault: true }); // Default to Bangalore
      setLocationLoading(false);
    }
  };
  
  const handleDenyLocation = () => {
    setShowLocationModal(false);
    setUserLocation({ lat: 12.9716, lng: 77.5946, isDefault: true });
    setLocationLoading(false);
  };
  
  // Get user location on component mount if authenticated
  useEffect(() => {
    if (!isAuthenticated || user?.isDoctor) return;
    
    const requestLocation = async () => {
      setLocationLoading(true);
      
      try {
        const location = await getUserLocation();
        setUserLocation(location);
        setLocationLoading(false);
        
        if (location.isDefault) {
          setTimeout(() => setShowLocationModal(true), 1000);
        }
      } catch (err) {
        console.error('Location error:', err);
        setUserLocation({ lat: 12.9716, lng: 77.5946, isDefault: true });
        setLocationLoading(false);
        setTimeout(() => setShowLocationModal(true), 1000);
      }
    };
    
    requestLocation();
  }, [isAuthenticated, user]);
  
  // Handle scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle search functionality
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
      alert(`No pharmacies found within ${maxDistance}km with ${medicine}. Try: Paracetamol 500mg, Cetirizine 10mg, etc.`);
    }
    
    // Scroll to results
    setTimeout(() => {
      const element = document.getElementById('results-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };
  
  const handleViewSubstitutes = (medicine) => {
    setSelectedMedicine(medicine);
    setShowSubstitutes(true);
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }
  
  // Show doctor dashboard if user is a doctor
  if (user?.isDoctor) {
    return <DoctorDashboard user={user} onLogout={handleLogout} />;
  }
  
  // Show loading screen while getting location
  if (locationLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        <div className="text-center">
          <div className="bg-gradient-to-br from-cyan-100 to-blue-100 w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg animate-pulse">
            <MapPin size={64} className="text-cyan-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Getting Your Location...</h2>
          <p className="text-gray-600 mb-2">Please allow location access when prompted</p>
          <p className="text-sm text-gray-500">We need your location to find nearby pharmacies & doctors</p>
          <div className="mt-6">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Main app layout
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Pill className="h-8 w-8 text-cyan-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">MediLocate</span>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                <button
                  onClick={() => setCurrentPage('home')}
                  className={`${
                    currentPage === 'home'
                      ? 'border-cyan-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Home
                </button>
                <button
                  onClick={() => setCurrentPage('prescription')}
                  className={`${
                    currentPage === 'prescription'
                      ? 'border-cyan-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Prescriptions
                </button>
                <button
                  onClick={() => setCurrentPage('symptoms')}
                  className={`${
                    currentPage === 'symptoms'
                      ? 'border-cyan-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Symptom Checker
                </button>
                <button
                  onClick={() => setCurrentPage('doctors')}
                  className={`${
                    currentPage === 'doctors'
                      ? 'border-cyan-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Find Doctors
                </button>
              </nav>
            </div>
            
            {/* User menu */}
            <div className="hidden md:ml-6 md:flex md:items-center">
              <button
                onClick={handleLogout}
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {showMobileMenu ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden" id="mobile-menu">
            <div className="pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setShowMobileMenu(false);
                }}
                className={`${
                  currentPage === 'home'
                    ? 'bg-cyan-50 border-cyan-600 text-cyan-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('prescription');
                  setShowMobileMenu(false);
                }}
                className={`${
                  currentPage === 'prescription'
                    ? 'bg-cyan-50 border-cyan-600 text-cyan-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              >
                Prescriptions
              </button>
              <button
                onClick={() => {
                  setCurrentPage('symptoms');
                  setShowMobileMenu(false);
                }}
                className={`${
                  currentPage === 'symptoms'
                    ? 'bg-cyan-50 border-cyan-600 text-cyan-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              >
                Symptom Checker
              </button>
              <button
                onClick={() => {
                  setCurrentPage('doctors');
                  setShowMobileMenu(false);
                }}
                className={`${
                  currentPage === 'doctors'
                    ? 'bg-cyan-50 border-cyan-600 text-cyan-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              >
                Find Doctors
              </button>
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleLogout();
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                >
                  <LogOut className="h-5 w-5 mr-3 text-gray-400" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      
      {/* Location Modal */}
      <LocationModal 
        isVisible={showLocationModal}
        onAllow={handleAllowLocation}
        onDeny={handleDenyLocation}
      />
      
      {/* Main Content */}
      <main className="flex-grow">
        {currentPage === 'prescription' ? (
          <PrescriptionPage 
            onBack={() => setCurrentPage('home')}
            onMedicineSelect={handleMedicineFromPrescription}
          />
        ) : currentPage === 'symptoms' ? (
          <SymptomCheckerPage 
            onBack={() => setCurrentPage('home')}
            onMedicineSelect={handleMedicineFromPrescription}
          />
        ) : currentPage === 'doctors' ? (
          <DoctorConsultPage 
            onBack={() => setCurrentPage('home')}
            userLocation={userLocation}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Medicine</h1>
                <p className="text-gray-600 mb-6">Search for medicines, check prices, and find the nearest pharmacy</p>
                
                <div className="max-w-2xl mx-auto">
                  <SearchBar onSearch={handleSearch} />
                  <p className="mt-3 text-sm text-gray-500">
                    Try: <button onClick={() => handleSearch('Paracetamol 500mg')} className="text-cyan-600 hover:underline">Paracetamol 500mg</button>, 
                    <button onClick={() => handleSearch('Cetirizine 10mg')} className="ml-1 text-cyan-600 hover:underline">Cetirizine 10mg</button>
                  </p>
                </div>
                
                <div className="mt-8">
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={() => setCurrentPage('prescription')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      <Pill className="h-4 w-4 mr-2" />
                      Upload Prescription
                    </button>
                    <button
                      onClick={() => setCurrentPage('symptoms')}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      <Activity className="h-4 w-4 mr-2" />
                      Check Symptoms
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results Section */}
            {currentMedicine && (
              <div id="results-section" className="mt-8">
                {medicineInfo[currentMedicine] && (
                  <MedicineInfoCard 
                    medicineName={currentMedicine}
                    medicineData={medicineInfo[currentMedicine]}
                  />
                )}
                
                {results.length > 0 && (
                  <div className="mt-8">
                    <PriceChart results={results} />
                    <div className="mt-8">
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Available at {results.length} pharmacies</h2>
                      <ResultsList 
                        results={results} 
                        onViewSubstitutes={handleViewSubstitutes}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Map Section */}
            {userLocation && (
              <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Pharmacies Near You</h2>
                  <div className="h-96 rounded-lg overflow-hidden">
                    <Map center={userLocation} pharmacies={results} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-cyan-600 text-white shadow-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MediLocate. All rights reserved.
          </p>
        </div>
      </footer>
      
      {/* Substitute Modal */}
      <SubstituteModal
        isOpen={showSubstitutes}
        onClose={() => setShowSubstitutes(false)}
        medicine={selectedMedicine}
        substitutes={medicineSubstitutes[selectedMedicine] || []}
      />
    </div>
  );
}

export default App;
