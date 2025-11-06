import { useState } from 'react';
import { Search, Pill } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // ✅ UPDATED - 8 medicine suggestions
  const suggestions = [
    { name: "Paracetamol 500mg", icon: "💊", category: "Pain & Fever" },
    { name: "Cetirizine 10mg", icon: "🤧", category: "Allergy" },
    { name: "Azithromycin 500mg", icon: "💉", category: "Antibiotic" },
    { name: "Omeprazole 20mg", icon: "🔥", category: "Acidity" },
    { name: "Vitamin D3 60K", icon: "☀️", category: "Vitamin" },
    { name: "Ibuprofen 400mg", icon: "🩹", category: "Pain Relief" },
    { name: "Metformin 500mg", icon: "💉", category: "Diabetes" },
    { name: "Amoxicillin 500mg", icon: "💊", category: "Antibiotic" },
  ];
  
  const filteredSuggestions = searchTerm 
    ? suggestions.filter(med => 
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : suggestions;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setShowSuggestions(false);
    }
  };
  
  const handleSuggestionClick = (medicineName) => {
    setSearchTerm(medicineName);
    onSearch(medicineName);
    setShowSuggestions(false);
  };
  
  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search for medicines (e.g., Paracetamol 500mg)..."
            className="w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 outline-none transition-all"
          />
        </div>
        
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
        >
          Search
        </button>
      </form>
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border-2 border-cyan-100 overflow-hidden">
          <div className="p-3 bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-100">
            <p className="text-xs font-semibold text-gray-600 flex items-center gap-2">
              <Pill size={14} className="text-cyan-600" />
              {searchTerm ? 'Matching Medicines' : 'Popular Medicines'}
            </p>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.name)}
                className="w-full px-4 py-3 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all text-left flex items-center justify-between group border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {suggestion.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-cyan-600 transition-colors">
                      {suggestion.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {suggestion.category}
                    </p>
                  </div>
                </div>
                <Search size={16} className="text-gray-400 group-hover:text-cyan-600 transition-colors" />
              </button>
            ))}
          </div>
          
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              💡 Tip: Type medicine name or click a suggestion
            </p>
          </div>
        </div>
      )}
      
      {showSuggestions && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowSuggestions(false)}
        />
      )}
      
      <div className="mt-4 flex flex-wrap gap-2">
        <p className="w-full text-xs text-gray-600 mb-1 font-medium">Quick Search:</p>
        {suggestions.slice(0, 5).map((med, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(med.name)}
            className="bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-sm hover:shadow-md border border-blue-200"
          >
            {med.icon} {med.name.split(' ')[0]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
