export const demoPharmacies = [
  {
    id: 1,
    name: "Apollo Pharmacy - Connaught Place",
    lat: 28.6315,
    lng: 77.2167,
    contact: "+91-9876543210",
    rating: 4.5,
    inventory: {
      "Paracetamol 500mg": { price: 25.50, stock: 150 },
      "Amoxicillin 250mg": { price: 85.00, stock: 80 },
      "Cetirizine 10mg": { price: 45.00, stock: 120 }
    }
  },
  {
    id: 2,
    name: "MedPlus - Karol Bagh",
    lat: 28.6519,
    lng: 77.1903,
    contact: "+91-9876543211",
    rating: 4.2,
    inventory: {
      "Paracetamol 500mg": { price: 22.00, stock: 200 },
      "Azithromycin 500mg": { price: 120.00, stock: 60 },
      "Cetirizine 10mg": { price: 42.00, stock: 90 }
    }
  },
  {
    id: 3,
    name: "Wellness Forever - Nehru Place",
    lat: 28.5494,
    lng: 77.2501,
    contact: "+91-9876543212",
    rating: 4.7,
    inventory: {
      "Paracetamol 500mg": { price: 28.00, stock: 100 },
      "Ibuprofen 400mg": { price: 35.00, stock: 140 },
      "Omeprazole 20mg": { price: 75.00, stock: 70 }
    }
  },
  {
    id: 4,
    name: "Care Pharmacy - Lajpat Nagar",
    lat: 28.5677,
    lng: 77.2431,
    contact: "+91-9876543213",
    rating: 4.0,
    inventory: {
      "Paracetamol 500mg": { price: 20.00, stock: 180 },
      "Metformin 500mg": { price: 55.00, stock: 110 },
      "Cetirizine 10mg": { price: 40.00, stock: 130 }
    }
  },
  {
    id: 5,
    name: "HealthBuddy - Saket",
    lat: 28.5244,
    lng: 77.2066,
    contact: "+91-9876543214",
    rating: 4.3,
    inventory: {
      "Paracetamol 500mg": { price: 24.00, stock: 160 },
      "Aspirin 75mg": { price: 18.00, stock: 200 },
      "Atorvastatin 10mg": { price: 95.00, stock: 50 }
    }
  }
];

export const medicineSubstitutes = {
  "Paracetamol 500mg": [
    { name: "Calpol 500mg", similarity: 0.95, generic: "Acetaminophen" },
    { name: "Dolo 650", similarity: 0.90, generic: "Acetaminophen" },
    { name: "Crocin 500mg", similarity: 0.93, generic: "Acetaminophen" }
  ],
  "Cetirizine 10mg": [
    { name: "Alerid 10mg", similarity: 0.92, generic: "Cetirizine" },
    { name: "Okacet 10mg", similarity: 0.90, generic: "Cetirizine" }
  ]
};
