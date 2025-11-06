import { useState, useEffect } from 'react';
import { Video, Phone, Calendar, MapPin, Star, Clock, MessageCircle, ArrowLeft, Filter, User, Award, Languages, IndianRupee, Search } from 'lucide-react';
import { getNearbyDoctors, getSpecialties } from '../data/doctorsData';

const DoctorConsultPage = ({ onBack, userLocation }) => {
  const [consultMode, setConsultMode] = useState('chat'); // 'chat' or 'appointment'
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [nearbyDoctors, setNearbyDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  
  // Booking form state
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    reason: ''
  });

  useEffect(() => {
    if (userLocation) {
      const doctors = getNearbyDoctors(userLocation.lat, userLocation.lng, 10);
      setNearbyDoctors(doctors);
      setFilteredDoctors(doctors);
    }
  }, [userLocation]);

  useEffect(() => {
    let filtered = nearbyDoctors;
    
    // Filter by specialty
    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter(doc => doc.specialty === selectedSpecialty);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.hospital.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredDoctors(filtered);
  }, [selectedSpecialty, searchQuery, nearbyDoctors]);

  const handleStartChat = (doctor) => {
    if (!doctor.online) {
      alert('This doctor is not available for online consultation. Please book an appointment.');
      return;
    }
    setSelectedDoctor(doctor);
    setConsultMode('chat');
    setChatMessages([
      {
        id: 1,
        sender: 'doctor',
        text: `Hello! I'm ${doctor.name}. How can I help you today?`,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      text: chatInput,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setChatInput('');
    
    // Simulate doctor response
    setTimeout(() => {
      const responses = [
        "I understand. Can you tell me more about your symptoms?",
        "How long have you been experiencing this?",
        "I recommend we schedule a detailed consultation. Would you like to book an appointment?",
        "Based on what you've told me, I suggest getting some tests done. Let me prescribe them.",
        "That sounds manageable. I'll prescribe some medication for you."
      ];
      
      const doctorReply = {
        id: chatMessages.length + 2,
        sender: 'doctor',
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages(prev => [...prev, doctorReply]);
    }, 2000);
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingForm(true);
    setConsultMode('appointment');
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    if (!bookingData.name || !bookingData.phone || !bookingData.date || !bookingData.time) {
      alert('Please fill all required fields');
      return;
    }
    
    alert(`✅ Appointment Booked Successfully!\n\nDoctor: ${selectedDoctor.name}\nDate: ${bookingData.date}\nTime: ${bookingData.time}\n\nYou will receive a confirmation call at ${bookingData.phone}`);
    
    // Reset form
    setBookingData({
      name: '',
      phone: '',
      date: '',
      time: '',
      reason: ''
    });
    setShowBookingForm(false);
    setSelectedDoctor(null);
  };

  const handleCallDoctor = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const specialties = ['all', ...getSpecialties()];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 pt-20 pb-10">
      <div className="medical-particles"></div>
      
      <div className="container mx-auto px-4 relative z-10">
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
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
                <User size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Consult a Doctor</h1>
                <p className="text-gray-600">Chat online or book an appointment with doctors near you</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat View */}
        {selectedDoctor && consultMode === 'chat' && (
          <div className="medical-container medical-card max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-t-xl -mx-6 -mt-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={selectedDoctor.photo} alt={selectedDoctor.name} className="w-12 h-12 rounded-full border-2 border-white" />
                  <div>
                    <h3 className="font-bold text-white">{selectedDoctor.name}</h3>
                    <p className="text-sm text-blue-100">{selectedDoctor.specialty}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 outline-none transition-all"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* Booking Form */}
        {showBookingForm && selectedDoctor && (
          <div className="medical-container medical-card max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Calendar size={28} className="text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Book Appointment</h2>
                <p className="text-gray-600">with {selectedDoctor.name}</p>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                <input
                  type="text"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 outline-none transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 outline-none transition-all"
                  placeholder="10-digit mobile number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time *</label>
                  <input
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Visit (Optional)</label>
                <textarea
                  value={bookingData.reason}
                  onChange={(e) => setBookingData({...bookingData, reason: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 outline-none transition-all"
                  placeholder="Brief description of your symptoms or reason for consultation"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all text-lg"
                >
                  Confirm Booking
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowBookingForm(false);
                    setSelectedDoctor(null);
                  }}
                  className="px-6 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Doctors List */}
        {!selectedDoctor && !showBookingForm && (
          <>
            {/* Filters */}
            <div className="medical-container medical-card mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={24} className="text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">Find Doctors</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name, specialty, or hospital..."
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Specialty</label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 outline-none transition-all"
                  >
                    <option value="all">All Specialties</option>
                    {specialties.filter(s => s !== 'all').map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="medical-container medical-card hover:shadow-xl transition-all"
                >
                  <div className="flex gap-4 mb-4">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-24 h-24 rounded-xl object-cover border-2 border-gray-200"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
                      <p className="text-cyan-600 font-semibold mb-2">{doctor.specialty}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{doctor.rating}</span>
                          <span>({doctor.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award size={16} className="text-blue-600" />
                          <span>{doctor.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-800">{doctor.hospital}</p>
                        <p className="text-gray-600">{doctor.address}</p>
                        <p className="text-cyan-600 font-semibold">{doctor.distance.toFixed(1)} km away</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-500" />
                      <p className="text-gray-600">{doctor.availability[0]}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Languages size={16} className="text-gray-500" />
                      <p className="text-gray-600">{doctor.languages.join(', ')}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <IndianRupee size={16} className="text-gray-500" />
                      <p className="font-semibold text-gray-800">₹{doctor.consultationFee} consultation fee</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {doctor.online ? (
                      <button
                        onClick={() => handleStartChat(doctor)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={20} />
                        Chat Now
                      </button>
                    ) : (
                      <div className="flex-1 bg-gray-100 text-gray-500 px-4 py-3 rounded-xl font-semibold text-center">
                        <MessageCircle size={20} className="inline mr-2" />
                        Offline
                      </div>
                    )}

                    <button
                      onClick={() => handleBookAppointment(doctor)}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Calendar size={20} />
                      Book
                    </button>

                    <button
                      onClick={() => handleCallDoctor(doctor.phone)}
                      className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      <Phone size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <div className="medical-container medical-card text-center py-16">
                <User size={64} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Doctors Found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorConsultPage;
