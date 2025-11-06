import ResultCard from './ResultCard';

const ResultsList = ({ results, onViewSubstitutes }) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No results yet</p>
        <p className="text-sm">Search for a medicine to see nearby pharmacies</p>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Found {results.length} Pharmacies
      </h2>
      
      {results.map((pharmacy, index) => (
        <ResultCard
          key={pharmacy.id}
          pharmacy={pharmacy}
          isRecommended={index === 0}
          onViewSubstitutes={() => onViewSubstitutes(pharmacy.medicine)}
        />
      ))}
    </div>
  );
};

export default ResultsList;
