// Comprehensive symptom to medicine mapping
export const symptomMedicineMap = {
  // Pain & Fever
  "fever": ["Paracetamol 500mg", "Ibuprofen 400mg", "Dolo 650mg"],
  "headache": ["Paracetamol 500mg", "Ibuprofen 400mg", "Aspirin 75mg"],
  "body pain": ["Paracetamol 500mg", "Ibuprofen 400mg"],
  "muscle pain": ["Ibuprofen 400mg", "Paracetamol 500mg"],
  "joint pain": ["Ibuprofen 400mg"],
  "back pain": ["Ibuprofen 400mg"],
  
  // Cold & Flu
  "cold": ["Cetirizine 10mg", "Paracetamol 500mg"],
  "cough": ["Cetirizine 10mg"],
  "runny nose": ["Cetirizine 10mg"],
  "sneezing": ["Cetirizine 10mg"],
  "sore throat": ["Azithromycin 500mg", "Paracetamol 500mg"],
  "flu": ["Paracetamol 500mg", "Cetirizine 10mg"],
  
  // Allergies
  "allergy": ["Cetirizine 10mg", "Montelukast 10mg"],
  "itching": ["Cetirizine 10mg"],
  "rash": ["Cetirizine 10mg"],
  "hives": ["Cetirizine 10mg"],
  "watery eyes": ["Cetirizine 10mg"],
  
  // Digestive Issues
  "acidity": ["Omeprazole 20mg", "Pantoprazole 40mg"],
  "heartburn": ["Omeprazole 20mg", "Pantoprazole 40mg"],
  "stomach pain": ["Omeprazole 20mg"],
  "indigestion": ["Omeprazole 20mg"],
  "gastric": ["Pantoprazole 40mg"],
  "ulcer": ["Omeprazole 20mg"],
  
  // Infections
  "infection": ["Azithromycin 500mg", "Amoxicillin 500mg"],
  "bacterial infection": ["Azithromycin 500mg", "Amoxicillin 500mg"],
  "throat infection": ["Azithromycin 500mg"],
  "respiratory infection": ["Azithromycin 500mg"],
  
  // Chronic Conditions
  "diabetes": ["Metformin 500mg"],
  "high sugar": ["Metformin 500mg"],
  "thyroid": ["Levothyroxine 100mcg"],
  "cholesterol": ["Atorvastatin 10mg"],
  "high blood pressure": ["Losartan 50mg"],
  "hypertension": ["Losartan 50mg"],
  
  // Vitamins & Supplements
  "weakness": ["Vitamin D3 60K"],
  "fatigue": ["Vitamin D3 60K"],
  "bone pain": ["Vitamin D3 60K"],
  "vitamin deficiency": ["Vitamin D3 60K"],
  
  // Respiratory
  "asthma": ["Montelukast 10mg"],
  "breathing problem": ["Montelukast 10mg"],
  "wheezing": ["Montelukast 10mg"],
};

// Get medicines for symptoms
export const getMedicinesForSymptoms = (symptomsText) => {
  const textLower = symptomsText.toLowerCase();
  const recommendedMedicines = new Set();
  
  // Check each symptom
  Object.keys(symptomMedicineMap).forEach(symptom => {
    if (textLower.includes(symptom)) {
      symptomMedicineMap[symptom].forEach(medicine => {
        recommendedMedicines.add(medicine);
      });
    }
  });
  
  return Array.from(recommendedMedicines);
};

// Get detected symptoms
export const getDetectedSymptoms = (symptomsText) => {
  const textLower = symptomsText.toLowerCase();
  const detectedSymptoms = [];
  
  Object.keys(symptomMedicineMap).forEach(symptom => {
    if (textLower.includes(symptom)) {
      detectedSymptoms.push(symptom);
    }
  });
  
  return detectedSymptoms;
};
