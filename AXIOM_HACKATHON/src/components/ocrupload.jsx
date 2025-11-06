import { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { extractMedicineFromImage } from '../utils/api';

const OCRUpload = ({ onExtract }) => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    setLoading(true);
    
    try {
      const medicines = await extractMedicineFromImage();
      
      if (medicines.length > 0) {
        onExtract(medicines[0]);
      }
    } catch (err) {
      console.error("OCR failed:", err);
      alert("Failed to process prescription image");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <label className="flex items-center gap-3 cursor-pointer">
        <div className="bg-blue-500 text-white p-2 rounded-lg">
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-800">
            {loading ? 'Scanning prescription...' : 'Upload Prescription Image'}
          </p>
          <p className="text-sm text-gray-600">
            {fileName || 'AI will extract medicine names automatically'}
          </p>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={loading}
        />
      </label>
    </div>
  );
};

export default OCRUpload;
