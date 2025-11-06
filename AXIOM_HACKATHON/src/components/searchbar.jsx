import { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onSearch, darkMode = false }) => {
  const [medicine, setMedicine] = useState('');
  const [focused, setFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const typingTimeout = useRef(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (medicine.trim() && !isLoading) {
      setIsLoading(true);
      try {
        await onSearch(medicine);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handleClear = () => {
    setMedicine('');
    inputRef.current?.focus();
  };
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setMedicine(value);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Clear previous timeout
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    
    // Set a new timeout
    typingTimeout.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, []);
  
  // Auto-focus on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const inputContainerClasses = `relative transition-all duration-300 rounded-xl ${
    focused 
      ? 'ring-2 ring-cyan-400 shadow-lg' 
      : 'shadow-md hover:shadow-lg'
  } ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white border-gray-200'}`;

  const inputClasses = `w-full px-5 py-4 pr-28 border-2 rounded-xl focus:outline-none transition-all ${
    darkMode 
      ? 'bg-transparent text-white placeholder-gray-400 border-gray-700 focus:border-cyan-500' 
      : 'text-gray-800 placeholder-gray-400 border-gray-200 focus:border-cyan-400'
  }`;

  return (
    <form onSubmit={handleSubmit} className="relative">
      <motion.div 
        className={inputContainerClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <input
          ref={inputRef}
          type="text"
          value={medicine}
          onChange={handleInputChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Enter medicine name (e.g., Paracetamol 500mg)"
          className={inputClasses}
          disabled={isLoading}
        />
        
        <AnimatePresence>
          {medicine && (
            <motion.button
              type="button"
              onClick={handleClear}
              className="absolute right-20 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors"
              whileHover={{ scale: 1.1, backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              aria-label="Clear search"
            >
              <X size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
            </motion.button>
          )}
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <motion.button
            type="submit"
            className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold ${
              isLoading || !medicine.trim()
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30'
            } transition-all`}
            disabled={isLoading || !medicine.trim()}
            whileHover={!isLoading && medicine.trim() ? { 
              scale: 1.05,
              boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.4)'
            } : {}}
            whileTap={!isLoading && medicine.trim() ? { scale: 0.95 } : {}}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span className="hidden sm:inline">Searching...</span>
              </>
            ) : (
              <>
                <Search size={18} className={!medicine.trim() ? 'opacity-50' : ''} />
                <span className={`hidden sm:inline ${!medicine.trim() ? 'opacity-50' : ''}`}>
                  Search
                </span>
              </>
            )}
          </motion.button>
        </AnimatePresence>
        
        {/* AI Suggestion Badge */}
        <AnimatePresence>
          {isTyping && medicine.trim() && (
            <motion.div 
              className="absolute -bottom-8 left-0 flex items-center gap-1 text-xs text-cyan-600 dark:text-cyan-400"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles size={12} />
              <span>AI is analyzing your search...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Popular Searches */}
      <AnimatePresence>
        <motion.div 
          className="mt-6 flex flex-wrap items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mr-1`}>Popular:</span>
          <motion.button
            type="button"
            onClick={() => {
              setMedicine('Paracetamol 500mg');
              // Small delay to allow state update before search
              setTimeout(() => onSearch('Paracetamol 500mg'), 10);
            }}
            className={`text-sm px-3 py-1.5 rounded-full transition-all ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } flex items-center gap-1 hover:gap-2`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Paracetamol 500mg</span>
            <motion.span
              initial={{ opacity: 0, x: -5 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="text-cyan-600 dark:text-cyan-400"
            >
              →
            </motion.span>
          </motion.button>
          
          <motion.button
            type="button"
            onClick={() => {
              setMedicine('Cetirizine 10mg');
              // Small delay to allow state update before search
              setTimeout(() => onSearch('Cetirizine 10mg'), 10);
            }}
            className={`text-sm px-3 py-1.5 rounded-full transition-all ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } flex items-center gap-1 hover:gap-2`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Cetirizine 10mg</span>
            <motion.span
              initial={{ opacity: 0, x: -5 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="text-cyan-600 dark:text-cyan-400"
            >
              →
            </motion.span>
          </motion.button>
          
          <motion.button
            type="button"
            onClick={() => {
              setMedicine('Amoxicillin 500mg');
              // Small delay to allow state update before search
              setTimeout(() => onSearch('Amoxicillin 500mg'), 10);
            }}
            className={`text-sm px-3 py-1.5 rounded-full transition-all ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } flex items-center gap-1 hover:gap-2`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Amoxicillin 500mg</span>
            <motion.span
              initial={{ opacity: 0, x: -5 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="text-cyan-600 dark:text-cyan-400"
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </form>
  );
};

export default SearchBar;
