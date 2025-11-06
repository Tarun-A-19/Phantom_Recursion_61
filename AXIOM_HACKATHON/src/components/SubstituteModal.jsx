import { X } from 'lucide-react';

const SubstituteModal = ({ medicine, substitutes, onClose }) => {
  if (!substitutes || substitutes.length === 0) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Substitute Medicines</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Alternatives for <strong>{medicine}</strong>
        </p>
        
        <div className="space-y-3">
          {substitutes.map((sub, idx) => (
            <div key={idx} className="border rounded-lg p-3 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{sub.name}</h3>
                  <p className="text-sm text-gray-600">Generic: {sub.generic}</p>
                </div>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                  {(sub.similarity * 100).toFixed(0)}% match
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubstituteModal;
