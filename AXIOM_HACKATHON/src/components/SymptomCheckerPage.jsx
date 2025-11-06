import { useState, useEffect } from 'react';
import { Stethoscope, Activity, Pill, AlertCircle, CheckCircle, Clock, Trash2, ArrowLeft } from 'lucide-react';
import { getMedicinesForSymptoms, getDetectedSymptoms } from '../data/symptomMedicineMap';

const SymptomCheckerPage = ({ onBack, onMedicineSelect }) => {
  const [symptomsInput, setSymptomsInput] = useState('');
  const [recommendedMedicines, setRecommendedMedicines] = useState([]);
  const [detectedSymptoms, setDetectedSymptoms] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [symptomHistory, setSymptomHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(true);

  useEffect(() => {
    const savedHistory = localStorage.getItem('symptomHistory');
    if (savedHistory) {
      setSymptomHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (symptoms, medicines) => {
    const newEntry = {
      id: Date.now(),
      symptoms: symptoms,
      medicines: medicines,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updatedHistory = [newEntry, ...symptomHistory].slice(0, 10);
    setSymptomHistory(updatedHistory);
    localStorage.setItem('symptomHistory', JSON.stringify(updatedHistory));
  };

  const deleteFromHistory = (id) => {
    const updatedHistory = symptomHistory.filter(entry => entry.id !== id);
    setSymptomHistory(updatedHistory);
    localStorage.setItem('symptomHistory', JSON.stringify(updatedHistory));
  };

  const loadFromHistory = (entry) => {
    setDetectedSymptoms(entry.symptoms);
    setRecommendedMedicines(entry.medicines);
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyze = () => {
    if (symptomsInput.trim()) {
      setIsAnalyzing(true);
      setTimeout(() => {
        const symptoms = getDetectedSymptoms(symptomsInput);
        const medicines = getMedicinesForSymptoms(symptomsInput);
        
        if (medicines.length === 0) {
          alert('❌ No medicines found for these symptoms. Please describe your symptoms clearly:\n\nExamples:\n• I have fever and headache\n• Suffering from cold and cough\n• Experiencing stomach pain and acidity');
          setIsAnalyzing(false);
          return;
        }
        
        setDetectedSymptoms(symptoms);
        setRecommendedMedicines(medicines);
        saveToHistory(symptoms, medicines);
        setIsAnalyzing(false);
        setShowHistory(false);
      }, 1500);
    }
  };

  const handleSearchMedicine = (medicine) => {
    onMedicineSelect(medicine);
    onBack();
  };

  const resetChecker = () => {
    setSymptomsInput('');
    setRecommendedMedicines([]);
    setDetectedSymptoms([]);
    setShowHistory(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 pt-20 pb-10">
      <div className="medical-particles"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="mb-4 text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-red-500 to-orange-600 p-3 rounded-xl">
                  <Stethoscope size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Symptom Checker</h1>
                  <p className="text-gray-600">Describe your symptoms and get medicine recommendations</p>
                </div>
              </div>
              {symptomHistory.length > 0 && (
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="bg-cyan-100 hover:bg-cyan-200 text-cyan-700 px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2"
                >
                  <Clock size={18} />
                  {showHistory ? 'Hide' : 'Show'} History
                </button>
              )}
            </div>
          </div>
        </div>

        {/* History Section */}
        {showHistory && symptomHistory.length > 0 && (
          <div className="medical-container medical-card mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Clock size={24} className="text-orange-600" />
              <h2 className="text-xl font-bold text-gray-800">Previous Symptom Checks</h2>
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                {symptomHistory.length}
              </span>
            </div>

            <div className="space-y-4">
              {symptomHistory.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-200 p-2 rounded-lg">
                        <Activity size={20} className="text-orange-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Symptom Check</p>
                        <p className="text-xs text-gray-600">{entry.date}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteFromHistory(entry.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-2">Symptoms ({entry.symptoms.length}):</p>
                    <div className="flex flex-wrap gap-2">
                      {entry.symptoms.slice(0, 5).map((symptom, idx) => (
                        <span
                          key={idx}
                          className="bg-white text-red-700 px-2 py-1 rounded-full text-xs font-medium border border-red-200 capitalize"
                        >
                          {symptom}
                        </span>
                      ))}
                      {entry.symptoms.length > 5 && (
                        <span className="text-xs text-gray-500 py-1">
                          +{entry.symptoms.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <p className="text-xs text-gray-600 w-full mb-1">Medicines ({entry.medicines.length}):</p>
                    {entry.medicines.slice(0, 3).map((med, idx) => (
                      <span
                        key={idx}
                        className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 border border-orange-200"
                      >
                        💊 {med}
                      </span>
                    ))}
                    {entry.medicines.length > 3 && (
                      <span className="text-xs text-gray-500 py-1">
                        +{entry.medicines.length - 3} more
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => loadFromHistory(entry)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                  >
                    Load This Check
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Symptom Input Section */}
        <div className="medical-container medical-card mb-8">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200 mb-6">
            <div className="flex items-start gap-4">
              <Activity size={32} className="text-red-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-3">How to Use Symptom Checker</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Describe what you're experiencing in simple words. Our system will detect symptoms and recommend appropriate over-the-counter medicines.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-xs font-bold text-gray-800 mb-2">✏️ Examples:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• "I have fever, headache and body pain since yesterday"</li>
                    <li>• "Suffering from cold, cough and runny nose"</li>
                    <li>• "Experiencing stomach pain and acidity after eating"</li>
                    <li>• "Having allergy with itching, rash and watery eyes"</li>
                    <li>• "Weakness and fatigue with joint pain"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-4">Describe Your Symptoms</h2>
          
          <textarea
            value={symptomsInput}
            onChange={(e) => setSymptomsInput(e.target.value)}
            placeholder="Type your symptoms here in your own words...

Examples:
• I have high fever since yesterday with severe headache and body pain
• Suffering from cold and continuous cough, also have runny nose
• Stomach hurts after every meal with burning sensation and acidity
• Allergic reaction with skin rash, itching all over body
• Feeling very weak and tired, bones are paining"
            rows="10"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-cyan-500 outline-none transition-all text-base leading-relaxed"
          />
          
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAnalyze}
              disabled={!symptomsInput.trim()}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
            >
              <Stethoscope size={24} />
              Analyze Symptoms
            </button>
            
            {recommendedMedicines.length > 0 && (
              <button
                onClick={resetChecker}
                className="px-6 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                New Check
              </button>
            )}
          </div>
        </div>

        {/* Analyzing Indicator */}
        {isAnalyzing && (
          <div className="medical-container medical-card text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold text-lg">Analyzing your symptoms...</p>
            <p className="text-sm text-gray-500 mt-2">This will take just a moment</p>
          </div>
        )}

        {/* Results Section */}
        {recommendedMedicines.length > 0 && !isAnalyzing && (
          <div className="space-y-6">
            {/* Detected Symptoms */}
            <div className="medical-container medical-card bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={24} className="text-red-600" />
                <h3 className="text-xl font-bold text-gray-800">Detected Symptoms</h3>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {detectedSymptoms.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {detectedSymptoms.map((symptom, idx) => (
                  <span
                    key={idx}
                    className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-red-700 border-2 border-red-300 capitalize flex items-center gap-2"
                  >
                    <Activity size={16} />
                    {symptom}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Medicines */}
            <div className="medical-container medical-card">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle size={28} className="text-green-600" />
                <h2 className="text-2xl font-bold text-gray-800">Recommended Medicines</h2>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {recommendedMedicines.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {recommendedMedicines.map((medicine, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <Pill size={28} className="text-green-600" />
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">{medicine}</h3>
                          <p className="text-sm text-gray-600">Over-the-counter medicine</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSearchMedicine(medicine)}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
                      >
                        Find Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Medical Disclaimer */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertCircle size={24} className="text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2 text-lg">⚕️ Important Medical Disclaimer</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>These are <strong>suggested over-the-counter medicines</strong> based on common symptoms.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>This is <strong>not a substitute for professional medical advice</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>Please <strong>consult a doctor</strong> for accurate diagnosis and prescription.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>If symptoms persist or worsen, <strong>seek medical attention immediately</strong>.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomCheckerPage;
