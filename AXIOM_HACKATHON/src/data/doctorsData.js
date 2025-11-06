// Doctors near Bangalore (Kengeri area and surrounding)
export const doctorsData = [
  // Kengeri Area (near SJBIT)
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    specialty: "General Physician",
    experience: "15 years",
    qualification: "MBBS, MD",
    rating: 4.8,
    reviews: 245,
    lat: 12.9100,
    lng: 77.4860,
    hospital: "Apollo Clinic, Kengeri",
    address: "Kengeri Main Road, Bangalore",
    consultationFee: 500,
    languages: ["English", "Hindi", "Kannada"],
    availability: ["Mon-Sat: 10AM-2PM, 5PM-8PM"],
    phone: "+91-9876543210",
    online: true,
    photo: "https://via.placeholder.com/150/4A90E2/FFFFFF?text=Dr.RK"
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    experience: "12 years",
    qualification: "MBBS, MD (Pediatrics)",
    rating: 4.9,
    reviews: 312,
    lat: 12.9150,
    lng: 77.4830,
    hospital: "MedPlus Clinic, Kengeri",
    address: "Kengeri Satellite Town, Bangalore",
    consultationFee: 600,
    languages: ["English", "Hindi", "Kannada", "Tamil"],
    availability: ["Mon-Fri: 9AM-1PM, 4PM-7PM"],
    phone: "+91-9876543211",
    online: true,
    photo: "https://via.placeholder.com/150/E91E63/FFFFFF?text=Dr.PS"
  },
  {
    id: 3,
    name: "Dr. Arun Reddy",
    specialty: "Cardiologist",
    experience: "20 years",
    qualification: "MBBS, DM (Cardiology)",
    rating: 4.7,
    reviews: 189,
    lat: 12.9210,
    lng: 77.4940,
    hospital: "Heart Care Clinic, RR Nagar",
    address: "RR Nagar Main Road, Bangalore",
    consultationFee: 1000,
    languages: ["English", "Telugu", "Kannada"],
    availability: ["Mon-Sat: 11AM-3PM"],
    phone: "+91-9876543212",
    online: true,
    photo: "https://via.placeholder.com/150/FF5722/FFFFFF?text=Dr.AR"
  },
  {
    id: 4,
    name: "Dr. Sneha Gupta",
    specialty: "Dermatologist",
    experience: "10 years",
    qualification: "MBBS, MD (Dermatology)",
    rating: 4.6,
    reviews: 156,
    lat: 12.9595,
    lng: 77.5010,
    hospital: "Skin Care Clinic, Nagarbhavi",
    address: "Nagarbhavi Circle, Bangalore",
    consultationFee: 700,
    languages: ["English", "Hindi"],
    availability: ["Tue-Sun: 10AM-1PM, 5PM-8PM"],
    phone: "+91-9876543213",
    online: true,
    photo: "https://via.placeholder.com/150/9C27B0/FFFFFF?text=Dr.SG"
  },
  {
    id: 5,
    name: "Dr. Mohammed Ali",
    specialty: "Orthopedic",
    experience: "18 years",
    qualification: "MBBS, MS (Orthopedics)",
    rating: 4.8,
    reviews: 201,
    lat: 12.8860,
    lng: 77.4930,
    hospital: "Bone & Joint Clinic, Ullal",
    address: "Ullal Main Road, Bangalore",
    consultationFee: 800,
    languages: ["English", "Hindi", "Urdu", "Kannada"],
    availability: ["Mon-Sat: 9AM-12PM, 4PM-7PM"],
    phone: "+91-9876543214",
    online: false,
    photo: "https://via.placeholder.com/150/00BCD4/FFFFFF?text=Dr.MA"
  },
  
  // Central Bangalore
  {
    id: 6,
    name: "Dr. Kavita Menon",
    specialty: "Gynecologist",
    experience: "14 years",
    qualification: "MBBS, MD (Gynecology)",
    rating: 4.9,
    reviews: 278,
    lat: 12.9720,
    lng: 77.5950,
    hospital: "Women's Health Center, MG Road",
    address: "MG Road, Bangalore",
    consultationFee: 900,
    languages: ["English", "Malayalam", "Hindi"],
    availability: ["Mon-Sat: 10AM-2PM, 5PM-8PM"],
    phone: "+91-9876543215",
    online: true,
    photo: "https://via.placeholder.com/150/8BC34A/FFFFFF?text=Dr.KM"
  },
  {
    id: 7,
    name: "Dr. Vikram Singh",
    specialty: "ENT Specialist",
    experience: "16 years",
    qualification: "MBBS, MS (ENT)",
    rating: 4.7,
    reviews: 167,
    lat: 12.9760,
    lng: 77.6080,
    hospital: "ENT Care Clinic, Brigade Road",
    address: "Brigade Road, Bangalore",
    consultationFee: 650,
    languages: ["English", "Hindi", "Punjabi"],
    availability: ["Mon-Fri: 11AM-2PM, 6PM-9PM"],
    phone: "+91-9876543216",
    online: true,
    photo: "https://via.placeholder.com/150/FFC107/FFFFFF?text=Dr.VS"
  },
  {
    id: 8,
    name: "Dr. Lakshmi Rao",
    specialty: "Dentist",
    experience: "11 years",
    qualification: "BDS, MDS",
    rating: 4.8,
    reviews: 234,
    lat: 12.9840,
    lng: 77.5985,
    hospital: "Smile Dental Clinic, Shivaji Nagar",
    address: "Shivaji Nagar, Bangalore",
    consultationFee: 500,
    languages: ["English", "Kannada", "Tamil"],
    availability: ["Mon-Sat: 9AM-1PM, 3PM-7PM"],
    phone: "+91-9876543217",
    online: false,
    photo: "https://via.placeholder.com/150/03A9F4/FFFFFF?text=Dr.LR"
  }
];

// Calculate distance between two coordinates
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Get nearby doctors
export const getNearbyDoctors = (userLat, userLng, maxDistance = 10, specialty = null) => {
  let filteredDoctors = doctorsData;
  
  // Filter by specialty if provided
  if (specialty && specialty !== 'all') {
    filteredDoctors = filteredDoctors.filter(doc => doc.specialty === specialty);
  }
  
  // Calculate distance and filter
  const doctorsWithDistance = filteredDoctors.map(doctor => ({
    ...doctor,
    distance: calculateDistance(userLat, userLng, doctor.lat, doctor.lng)
  })).filter(doctor => doctor.distance <= maxDistance);
  
  // Sort by distance
  return doctorsWithDistance.sort((a, b) => a.distance - b.distance);
};

// Get unique specialties
export const getSpecialties = () => {
  const specialties = [...new Set(doctorsData.map(doc => doc.specialty))];
  return specialties.sort();
};
