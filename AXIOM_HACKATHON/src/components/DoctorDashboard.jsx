import { useState, useEffect } from 'react';
import { Calendar, Users, MessageCircle, Clock, CheckCircle, X, Phone, Video, User, Mail, FileText, TrendingUp, Activity } from 'lucide-react';

const DoctorDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments', 'consultations', 'patients', 'profile'
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'Rahul Kumar',
      patientAge: 32,
      patientGender: 'Male',
      date: '2025-11-07',
      time: '10:00 AM',
      reason: 'Fever and cold for 3 days',
      status: 'pending',
      phone: '+91-9876543210',
      email: 'rahul@gmail.com'
    },
    {
      id: 2,
      patientName: 'Priya Sharma',
      patientAge: 28,
      patientGender: 'Female',
      date: '2025-11-07',
      time: '11:30 AM',
      reason: 'Skin allergy and itching',
      status: 'confirmed',
      phone: '+91-9876543211',
      email: 'priya@gmail.com'
    },
    {
      id: 3,
      patientName: 'Amit Patel',
      patientAge: 45,
      patientGender: 'Male',
      date: '2025-11-07',
      time: '2:00 PM',
      reason: 'Regular checkup for diabetes',
      status: 'pending',
      phone: '+91-9876543212',
      email: 'amit@gmail.com'
    },
    {
      id: 4,
      patientName: 'Sneha Gupta',
      patientAge: 35,
      patientGender: 'Female',
      date: '2025-11-08',
      time: '9:00 AM',
      reason: 'Headache and body pain',
      status: 'pending',
      phone: '+91-9876543213',
      email: 'sneha@gmail.com'
    }
  ]);

  const [consultRequests, setConsultRequests] = useState([
    {
      id: 1,
      patientName: 'Vikram Singh',
      message: 'I have been experiencing chest pain for the last 2 hours. Should I be worried?',
      timestamp: '10 mins ago',
      status: 'waiting'
    },
    {
      id: 2,
      patientName: 'Anjali Reddy',
      message: 'My daughter has high fever (103°F) and vomiting. What should I do?',
      timestamp: '25 mins ago',
      status: 'waiting'
    }
  ]);

  const handleAppointmentAction = (id, action) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: action } : apt
    ));
    
    const appointment = appointments.find(apt => apt.id === id);
    if (action === 'confirmed') {
      alert(`✅ Appointment confirmed for ${appointment.patientName} on ${appointment.date} at ${appointment.time}`);
    } else if (action === 'cancelled') {
      alert(`❌ Appointment cancelled for ${appointment.patientName}`);
    }
  };

  const handleConsultRequest = (id, action) => {
    if (action === 'accept') {
      alert('💬 Starting consultation chat...');
    } else {
      setConsultRequests(consultRequests.filter(req => req.id !== id));
    }
  };

  const stats = {
    todayAppointments: appointments.filter(apt => apt.date === '2025-11-07').length,
    pendingRequests: appointments.filter(apt => apt.status === 'pending').length,
    consultations: consultRequests.length,
    totalPatients: 45
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <nav className="bg-white shadow-lg border-b-4 border-green-500">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl">
                <Activity size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Doctor Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-bold text-gray-800">{user.name}</p>
                <p className="text-sm text-green-600">{user.specialty}</p>
              </div>
              <button
                onClick={onLogout}
                className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-xl font-semibold transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Today's Appointments</p>
                <p className="text-3xl font-bold text-blue-600">{stats.todayAppointments}</p>
              </div>
              <Calendar size={40} className="text-blue-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Requests</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pendingRequests}</p>
              </div>
              <Clock size={40} className="text-orange-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Chat Requests</p>
                <p className="text-3xl font-bold text-green-600">{stats.consultations}</p>
              </div>
              <MessageCircle size={40} className="text-green-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Patients</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalPatients}</p>
              </div>
              <Users size={40} className="text-purple-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
              activeTab === 'appointments'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            📅 Appointments
          </button>
          <button
            onClick={() => setActiveTab('consultations')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
              activeTab === 'consultations'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            💬 Chat Requests
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            👤 My Profile
          </button>
        </div>

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Appointment Requests</h2>
            {appointments.map(appointment => (
              <div key={appointment.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-3 rounded-xl">
                        <User size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{appointment.patientName}</h3>
                        <p className="text-sm text-gray-600">{appointment.patientAge} years • {appointment.patientGender}</p>
                      </div>
                      <span className={`ml-auto px-4 py-1 rounded-full text-sm font-semibold ${
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        appointment.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {appointment.status === 'confirmed' ? '✅ Confirmed' :
                         appointment.status === 'cancelled' ? '❌ Cancelled' :
                         '⏳ Pending'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={18} className="text-blue-600" />
                        <span className="font-semibold">{appointment.date}</span>
                        <Clock size={18} className="text-blue-600 ml-2" />
                        <span className="font-semibold">{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone size={18} className="text-green-600" />
                        <span>{appointment.phone}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl mb-4">
                      <p className="text-sm text-gray-600 mb-1 font-semibold">Reason for Visit:</p>
                      <p className="text-gray-800">{appointment.reason}</p>
                    </div>

                    {appointment.status === 'pending' && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleAppointmentAction(appointment.id, 'confirmed')}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <CheckCircle size={20} />
                          Confirm Appointment
                        </button>
                        <button
                          onClick={() => handleAppointmentAction(appointment.id, 'cancelled')}
                          className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <X size={20} />
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Consultations Tab */}
        {activeTab === 'consultations' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Online Consultation Requests</h2>
            {consultRequests.map(request => (
              <div key={request.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-xl">
                    <MessageCircle size={24} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{request.patientName}</h3>
                      <span className="text-sm text-gray-500">{request.timestamp}</span>
                    </div>
                    <p className="text-gray-700 mb-4 bg-gray-50 p-4 rounded-xl">{request.message}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleConsultRequest(request.id, 'accept')}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        <MessageCircle size={18} />
                        Start Chat
                      </button>
                      <button
                        onClick={() => handleConsultRequest(request.id, 'video')}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        <Video size={18} />
                        Video Call
                      </button>
                      <button
                        onClick={() => handleConsultRequest(request.id, 'decline')}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Doctor Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  value={user.phone}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Specialty</label>
                <input
                  type="text"
                  value={user.specialty}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Qualification</label>
                <input
                  type="text"
                  value={user.qualification}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
                <input
                  type="text"
                  value={user.experience}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">License Number</label>
                <input
                  type="text"
                  value={user.licenseNo}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
