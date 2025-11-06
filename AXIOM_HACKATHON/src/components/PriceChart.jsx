import { TrendingDown, TrendingUp, Award, DollarSign } from 'lucide-react';

const PriceChart = ({ results }) => {
  if (results.length === 0) return null;
  
  // Find best/worst prices
  const prices = results.map(r => r.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2);
  
  // Calculate savings
  const savings = (maxPrice - minPrice).toFixed(2);
  const savingsPercent = ((savings / maxPrice) * 100).toFixed(0);
  
  return (
    <div className="medical-container medical-card mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <DollarSign size={24} className="text-green-600" />
        Price Comparison
      </h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Lowest Price */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={18} className="text-green-600" />
            <p className="text-xs font-semibold text-green-700">Lowest Price</p>
          </div>
          <p className="text-3xl font-bold text-green-600">₹{minPrice}</p>
          <p className="text-xs text-gray-600 mt-1">Best deal available</p>
        </div>
        
        {/* Highest Price */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-xl border-2 border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-red-600" />
            <p className="text-xs font-semibold text-red-700">Highest Price</p>
          </div>
          <p className="text-3xl font-bold text-red-600">₹{maxPrice}</p>
          <p className="text-xs text-gray-600 mt-1">Most expensive</p>
        </div>
        
        {/* Average Price */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border-2 border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={18} className="text-blue-600" />
            <p className="text-xs font-semibold text-blue-700">Average Price</p>
          </div>
          <p className="text-3xl font-bold text-blue-600">₹{avgPrice}</p>
          <p className="text-xs text-gray-600 mt-1">Market average</p>
        </div>
        
        {/* You Save */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Award size={18} className="text-purple-600" />
            <p className="text-xs font-semibold text-purple-700">You Save</p>
          </div>
          <p className="text-3xl font-bold text-purple-600">₹{savings}</p>
          <p className="text-xs text-gray-600 mt-1">Up to {savingsPercent}% off</p>
        </div>
      </div>
      
      {/* Price Comparison Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-700 mb-3">All Pharmacies ({results.length})</h3>
        
        {results.slice(0, 5).map((result, index) => {
          const pricePercent = ((result.price - minPrice) / (maxPrice - minPrice)) * 100;
          const isLowest = result.price === minPrice;
          const isHighest = result.price === maxPrice;
          
          return (
            <div 
              key={result.id}
              className={`relative bg-gradient-to-r from-white to-gray-50 p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                isLowest ? 'border-green-400 bg-green-50' : 
                isHighest ? 'border-red-300' : 
                'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                    index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-500' :
                    'bg-gradient-to-br from-blue-400 to-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm">
                      {result.name.split(' - ')[0]}
                    </h4>
                    <p className="text-xs text-gray-500">{result.distance.toFixed(1)} km away</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`text-2xl font-bold ${
                    isLowest ? 'text-green-600' : 
                    isHighest ? 'text-red-600' : 
                    'text-gray-800'
                  }`}>
                    ₹{result.price}
                  </p>
                  {isLowest && (
                    <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold mt-1">
                      Best Price!
                    </span>
                  )}
                </div>
              </div>
              
              {/* Price Bar */}
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-3">
                <div 
                  className={`absolute left-0 top-0 h-full rounded-full transition-all ${
                    isLowest ? 'bg-gradient-to-r from-green-400 to-green-600' : 
                    isHighest ? 'bg-gradient-to-r from-red-400 to-red-600' : 
                    'bg-gradient-to-r from-blue-400 to-blue-600'
                  }`}
                  style={{ width: `${pricePercent || 5}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Savings Banner */}
      <div className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award size={32} />
            <div>
              <p className="font-bold text-lg">Save up to ₹{savings}!</p>
              <p className="text-sm opacity-90">Choose the lowest price option</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{savingsPercent}%</p>
            <p className="text-xs opacity-90">OFF</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
