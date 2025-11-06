import { Info, AlertCircle, Clock, Shield, Package } from 'lucide-react';

const MedicineInfoCard = ({ medicineName, medicineData }) => {
  if (!medicineData) return null;
  
  return (
    <div className="medical-container medical-card mb-6">
      <div className="flex items-start gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl">
          <Info size={24} className="text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{medicineData.name}</h2>
          <p className="text-sm text-gray-600">Generic: {medicineData.genericName}</p>
          <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
            {medicineData.category}
          </span>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Package size={18} className="text-green-600" />
          Medical Uses
        </h3>
        <ul className="space-y-2">
          {medicineData.uses.map((use, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>{use}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6 bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-200">
        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Clock size={18} className="text-cyan-600" />
          Recommended Dosage
        </h3>
        <p className="text-sm text-gray-700">{medicineData.dosage}</p>
      </div>
      
      <div className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Info size={18} className="text-purple-600" />
          How to Use
        </h3>
        <p className="text-sm text-gray-700">{medicineData.howToUse}</p>
      </div>
      
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <AlertCircle size={18} className="text-orange-600" />
          Possible Side Effects
        </h3>
        <ul className="space-y-2">
          {medicineData.sideEffects.map((effect, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-orange-600 mt-0.5">⚠</span>
              <span>{effect}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-xl border-2 border-red-200">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Shield size={18} className="text-red-600" />
          Important Precautions
        </h3>
        <ul className="space-y-2">
          {medicineData.precautions.map((precaution, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-red-600 mt-0.5">!</span>
              <span>{precaution}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-4 p-3 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          ⚕️ This information is for educational purposes only. Always consult your doctor or pharmacist.
        </p>
      </div>
    </div>
  );
};

export default MedicineInfoCard;
