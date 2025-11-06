import { useState, useEffect } from 'react';
import { Upload, FileText, Image, Type, Camera, CheckCircle, AlertCircle, X, Pill, Clock, Trash2, Stethoscope, Activity } from 'lucide-react';
import { getMedicinesForSymptoms, getDetectedSymptoms } from '../data/symptomMedicineMap';

const PrescriptionPage = ({ onBack, onMedicineSelect }) => {
  const [uploadMethod, setUploadMethod] = useState('symptoms'); // ✅ Default to symptoms
  const [uploadedFile, setUploadedFile] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [extractedMedicines, setExtractedMedicines] = useState([]);
  const [detectedSymptoms, setDetectedSymptoms] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prescriptionHistory, setPrescriptionHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(true);

  useEffect(() => {
    const savedHistory = localStorage.getItem('prescriptionHistory');
    if (savedHistory) {
      setPrescriptionHistory(JSON.parse(savedHistory));
    }
  }, []);

  const savePrescriptionToHistory = (medicines, method, fileName = null, symptoms = []) => {
    const newPrescription = {
      id: Date.now(),
      medicines: medicines,
      uploadMethod: method,
      fileName: fileName,
      symptoms: symptoms,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updatedHistory = [newPrescription, ...prescriptionHistory].slice(0, 10);
    setPrescriptionHistory(updatedHistory);
    localStorage.setItem('prescriptionHistory', JSON.stringify(updatedHistory));
  };

  const deletePrescription = (id) => {
    const updatedHistory = prescriptionHistory.filter(p => p.id !== id);
    setPrescriptionHistory(updatedHistory);
    localStorage.setItem('prescriptionHistory', JSON.stringify(updatedHistory));
  };

  const loadFromHistory = (prescription) => {
    setExtractedMedicines(prescription.medicines);
    if (prescription.symptoms) {
      setDetectedSymptoms(prescription.symptoms);
    }
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ SYMPTOM-BASED RECOMMENDATION
  const handleSymptomAnalysis = () => {
    if (textInput.trim()) {
      setIsProcessing(true);
      setTimeout(() => {
        const symptoms = getDetectedSymptoms(textInput);
        const medicines = getMedicinesForSymptoms(textInput);
        
        if (medicines.length === 0) {
          alert('❌ No medicines found for these symptoms. Please describe your symptoms clearly:\n\nExamples:\n• I have fever and headache\n• Suffering from cold and cough\n• Experiencing stomach pain and acidity');
          setIsProcessing(false);
          return;
        }
        
        setDetectedSymptoms(symptoms);
        setExtractedMedicines(medicines);
        savePrescriptionToHistory(medicines, 'symptoms', null, symptoms);
        setIsProcessing(false);
      }, 1500);
    }
  };

  // Extract medicines from prescription text
  const extractMedicinesFromText = (text) => {
    const allMedicines = [
      'Paracetamol 500mg', 'Cetirizine 10mg', 'Azithromycin 500mg',
      'Omeprazole 20mg', 'Vitamin D3 60K', 'Ibuprofen 400mg',
      'Metformin 500mg', 'Amoxicillin 500mg', 'Dolo 650mg',
      'Crocin 500mg', 'Aspirin 75mg', 'Atorvastatin 10mg',
      'Losartan 50mg', 'Pantoprazole 40mg', 'Montelukast 10mg',
      'Levothyroxine 100mcg'
    ];
    
    const textLower = text.toLowerCase();
    const foundMedicines = [];
    
    allMedicines.forEach(medicine => {
      const medicineName = medicine.split(' ')[0].toLowerCase();
      if (textLower.includes(medicineName)) {
        foundMedicines.push(medicine);
      }
    });
    
    return foundMedicines;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
      
      setIsProcessing(true);
      setTimeout(() => {
        const mockText = `Sample prescription with ${file.name}`;
        const medicines = extractMedicinesFromText(mockText);
        
        if (medicines.length === 0) {
          alert('❌ No medicines detected. Please ensure the prescription is clear or try manual text entry.');
          setIsProcessing(false);
          setUploadedFile(null);
          setPreviewUrl(null);
          return;
        }
        
        setExtractedMedicines(medicines);
        setDetectedSymptoms([]);
        savePrescriptionToHistory(medicines, uploadMethod, file.name);
        setIsProcessing(false);
      }, 2000);
    }
  };

  const handlePrescriptionTextSubmit = () => {
    if (textInput.trim()) {
      setIsProcessing(true);
      setTimeout(() => {
        const medicines = extractMedicinesFromText(textInput);
        
        if (medicines.length === 0) {
          alert('❌ No medicines found. Please enter medicine names like:\n• Paracetamol\n• Cetirizine\n• Azithromycin');
          setIsProcessing(false);
          return;
        }
        
        setExtractedMedicines(medicines);
        setDetectedSymptoms([]);
        savePrescriptionToHistory(medicines, 'text', null);
        setIsProcessing(false);
      }, 1000);
    }
  };

  const handleSearchMedicine = (medicine) => {
    onMedicineSelect(medicine);
    onBack();
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
    setTextInput('');
    setExtractedMedicines([]);
    setDetectedSymptoms([]);
    setShowHistory(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 pt-20 pb-10">
      <div className="medical-particles"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="mb-4 text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-2"
          >
            ← Back to Home
          </button>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl">
                  <FileText size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Health Assistant</h1>
                  <p className="text-gray-600">Find medicines by symptoms or prescription</p>
                </div>
              </div>
              {prescriptionHistory.length > 0 && (
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
        {showHistory && prescriptionHistory.length > 0 && (
          <div className="medical-container medical-card mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Clock size={24} className="text-purple-600" />
              <h2 className="text-xl font-bold text-gray-800">Previous Searches</h2>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                {prescriptionHistory.length}
              </span>
            </div>

            <div className="space-y-4">
              {prescriptionHistory.map((prescription) => (
                <div
                  key={prescription.id}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-200 p-2 rounded-lg">
                        {prescription.uploadMethod === 'symptoms' && <Stethoscope size={20} className="text-purple-700" />}
                        {prescription.uploadMethod === 'image' && <Camera size={20} className="text-purple-700" />}
                        {prescription.uploadMethod === 'pdf' && <FileText size={20} className="text-purple-700" />}
                        {prescription.uploadMethod === 'text' && <Type size={20} className="text-purple-700" />}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {prescription.uploadMethod === 'symptoms' ? 'Symptom Search' : (prescription.fileName || 'Manual Entry')}
                        </p>
                        <p className="text-xs text-gray-600">{prescription.date}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deletePrescription(prescription.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {prescription.symptoms && prescription.symptoms.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-600 mb-2">Symptoms:</p>
                      <div className="flex flex-wrap gap-2">
                        {prescription.symptoms.map((symptom, idx) => (
                          <span
                            key={idx}
                            className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-3">
                    {prescription.medicines.slice(0, 4).map((med, idx) => (
                      <span
                        key={idx}
                        className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 border border-purple-200"
                      >
                        💊 {med}
                      </span>
                    ))}
                    {prescription.medicines.length > 4 && (
                      <span className="text-xs text-gray-500 py-1">
                        +{prescription.medicines.length - 4} more
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => loadFromHistory(prescription)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                  >
                    Load This Search
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Method Selection */}
        <div className="medical-container medical-card mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">How would you like to search?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* ✅ SYMPTOM CHECKER */}
            <button
              onClick={() => setUploadMethod('symptoms')}
              className={`p-6 rounded-xl border-2 transition-all ${
                uploadMethod === 'symptoms'
                  ? 'border-cyan-500 bg-cyan-50'
                  : 'border-gray-200 hover:border-cyan-300'
              }`}
            >
              <Stethoscope size={40} className={uploadMethod === 'symptoms' ? 'text-cyan-600' : 'text-gray-400'} />
              <h3 className="font-bold text-gray-800 mt-3">Symptom Checker</h3>
              <p className="text-sm text-gray-600">Describe symptoms</p>
            </button>

            <button
              onClick={() => setUploadMethod('image')}
              className={`p-6 rounded-xl border-2 transition-all ${
                uploadMethod === 'image'
                  ? 'border-cyan-500 bg-cyan-50'
                  : 'border-gray-200 hover:border-cyan-300'
              }`}
            >
              <Camera size={40} className={uploadMethod === 'image' ? 'text-cyan-600' : 'text-gray-400'} />
              <h3 className="font-bold text-gray-800 mt-3">Upload Image</h3>
              <p className="text-sm text-gray-600">JPG, PNG format</p>
            </button>

            <button
              onClick={() => setUploadMethod('pdf')}
              className={`p-6 rounded-xl border-2 transition-all ${
                uploadMethod === 'pdf'
                  ? 'border-cyan-500 bg-cyan-50'
                  : 'border-gray-200 hover:border-cyan-300'
              }`}
            >
              <FileText size={40} className={uploadMethod === 'pdf' ? 'text-cyan-600' : 'text-gray-400'} />
              <h3 className="font-bold text-gray-800 mt-3">Upload PDF</h3>
              <p className="text-sm text-gray-600">PDF format</p>
            </button>

            <button
              onClick={() => setUploadMethod('text')}
              className={`p-6 rounded-xl border-2 transition-all ${
                uploadMethod === 'text'
                  ? 'border-cyan-500 bg-cyan-50'
                  : 'border-gray-200 hover:border-cyan-300'
              }`}
            >
              <Type size={40} className={uploadMethod === 'text' ? 'text-cyan-600' : 'text-gray-400'} />
              <h3 className="font-bold text-gray-800 mt-3">Type Medicines</h3>
              <p className="text-sm text-gray-600">Enter manually</p>
            </button>
          </div>

          {/* ✅ SYMPTOM INPUT */}
          {uploadMethod === 'symptoms' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-xl border border-red-200">
                <div className="flex items-start gap-3">
                  <Activity size={20} className="text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Describe Your Symptoms</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Tell us what you're experiencing and we'll recommend suitable medicines.
                    </p>
                    <div className="text-xs text-gray-600">
                      <strong>Examples:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>I have fever, headache and body pain</li>
                        <li>Suffering from cold, cough and runny nose</li>
                        <li>Experiencing stomach pain and acidity</li>
                        <li>Having allergy, itching and watery eyes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Describe your symptoms here...

Examples:
• I have fever and headache since yesterday
• Suffering from cold and cough
• Stomach pain and acidity after meals
• Allergy with itching and rash"
                rows="8"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-cyan-500 outline-none transition-all"
              />
              <button
                onClick={handleSymptomAnalysis}
                disabled={!textInput.trim()}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Stethoscope size={20} />
                Analyze Symptoms & Recommend
              </button>
            </div>
          )}

          {/* File Upload */}
          {(uploadMethod === 'image' || uploadMethod === 'pdf') && (
            <div className="border-2 border-dashed border-cyan-300 rounded-xl p-8 text-center bg-cyan-50/50">
              {!uploadedFile ? (
                <label className="cursor-pointer block">
                  <input
                    type="file"
                    accept={uploadMethod === 'image' ? 'image/*' : 'application/pdf'}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Upload size={48} className="text-cyan-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Click to upload {uploadMethod === 'image' ? 'image' : 'PDF'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    or drag and drop your {uploadMethod === 'image' ? 'prescription image' : 'PDF file'} here
                  </p>
                </label>
              ) : (
                <div className="space-y-4">
                  {previewUrl && uploadMethod === 'image' && (
                    <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-lg" />
                  )}
                  <div className="flex items-center justify-center gap-4">
                    <CheckCircle size={24} className="text-green-600" />
                    <p className="font-semibold text-gray-800">{uploadedFile.name}</p>
                    <button onClick={resetUpload} className="text-red-600 hover:text-red-700">
                      <X size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Manual Text Input */}
          {uploadMethod === 'text' && (
            <div className="space-y-4">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter medicine names from your prescription...

Example:
- Paracetamol 500mg
- Cetirizine 10mg
- Azithromycin 500mg"
                rows="8"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-cyan-500 outline-none transition-all font-mono text-sm"
              />
              <button
                onClick={handlePrescriptionTextSubmit}
                disabled={!textInput.trim()}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Extract Medicines
              </button>
            </div>
          )}
        </div>

        {/* Processing */}
        {isProcessing && (
          <div className="medical-container medical-card text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold">
              {uploadMethod === 'symptoms' ? 'Analyzing your symptoms...' : 'Processing prescription...'}
            </p>
          </div>
        )}

        {/* Results */}
        {extractedMedicines.length > 0 && !isProcessing && (
          <div className="medical-container medical-card">
            {/* Detected Symptoms */}
            {detectedSymptoms.length > 0 && (
              <div className="mb-6 bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-xl border border-red-200">
                <div className="flex items-center gap-2 mb-3">
                  <Activity size={20} className="text-red-600" />
                  <h3 className="font-bold text-gray-800">Detected Symptoms ({detectedSymptoms.length})</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {detectedSymptoms.map((symptom, idx) => (
                    <span
                      key={idx}
                      className="bg-white px-3 py-1 rounded-full text-sm font-medium text-red-700 border border-red-300 capitalize"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mb-6">
              <CheckCircle size={24} className="text-green-600" />
              <h2 className="text-xl font-bold text-gray-800">
                {uploadMethod === 'symptoms' ? 'Recommended Medicines' : 'Medicines Found'} ({extractedMedicines.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {extractedMedicines.map((medicine, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <Pill size={24} className="text-green-600" />
                      <div>
                        <h3 className="font-bold text-gray-800">{medicine}</h3>
                        <p className="text-sm text-gray-600">Available at nearby pharmacies</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSearchMedicine(medicine)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 text-sm"
                    >
                      Find Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-blue-600 mt-0.5" />
                <div className="text-sm text-gray-700">
                  {uploadMethod === 'symptoms' ? (
                    <p>
                      <strong>Medical Disclaimer:</strong> These are suggested over-the-counter medicines based on common symptoms. 
                      Please consult a doctor for accurate diagnosis and prescription.
                    </p>
                  ) : (
                    <p>
                      <strong>Found {extractedMedicines.length} medicine(s)</strong> from your prescription. 
                      Click "Find Now" to search nearby pharmacies.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionPage;
