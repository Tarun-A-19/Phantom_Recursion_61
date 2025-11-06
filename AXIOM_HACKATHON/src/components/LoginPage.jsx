import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Activity, Shield, Heart, CheckCircle, Stethoscope, Users, Phone, Building2, Award } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [userType, setUserType] = useState('patient'); // 'patient' or 'doctor'
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    specialty: '',
    qualification: '',
    experience: '',
    licenseNo: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      specialty: '',
      qualification: '',
      experience: '',
      licenseNo: ''
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      
      if (userType === 'doctor') {
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
          newErrors.phone = 'Invalid phone number';
        }
        
        if (!formData.specialty) {
          newErrors.specialty = 'Specialty is required';
        }
        
        if (!formData.qualification.trim()) {
          newErrors.qualification = 'Qualification is required';
        }
        
        if (!formData.experience.trim()) {
          newErrors.experience = 'Experience is required';
        }
        
        if (!formData.licenseNo.trim()) {
          newErrors.licenseNo = 'Medical license number is required';
        }
      }
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const userData = {
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        userType: userType,
        ...(userType === 'doctor' && {
          phone: formData.phone,
          specialty: formData.specialty,
          qualification: formData.qualification,
          experience: formData.experience,
          licenseNo: formData.licenseNo,
          isDoctor: true
        })
      };
      
      sessionStorage.setItem('user', JSON.stringify(userData));
      onLogin(userData);
    }
  };

  const handleDemoLogin = (type) => {
    const demoUser = type === 'patient' 
      ? {
          name: 'Demo Patient',
          email: 'patient@medilocate.com',
          userType: 'patient'
        }
      : {
          name: 'Dr. Demo',
          email: 'doctor@medilocate.com',
          userType: 'doctor',
          phone: '9876543210',
          specialty: 'General Physician',
          qualification: 'MBBS, MD',
          experience: '10 years',
          licenseNo: 'MED12345',
          isDoctor: true
        };
    
    sessionStorage.setItem('user', JSON.stringify(demoUser));
    onLogin(demoUser);
  };

  const specialties = [
    'General Physician',
    'Pediatrician',
    'Cardiologist',
    'Dermatologist',
    'Orthopedic',
    'Gynecologist',
    'ENT Specialist',
    'Dentist',
    'Psychiatrist',
    'Neurologist'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <div className="max-w-md w-full">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-4 rounded-2xl shadow-2xl inline-block mb-6 animate-pulse">
              <Activity size={48} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-3">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                MediLocate
              </span>
            </h1>
            <p className="text-gray-300 text-lg">Complete Healthcare Platform</p>
          </div>

          {/* User Type Selection */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => handleUserTypeChange('patient')}
              className={`flex-1 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                userType === 'patient'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/50 scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/15 border-2 border-white/20'
              }`}
            >
              <Users size={24} />
              <div className="text-left">
                <div className="text-sm opacity-80">I am a</div>
                <div className="text-lg font-bold">Patient</div>
              </div>
            </button>
            <button
              onClick={() => handleUserTypeChange('doctor')}
              className={`flex-1 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                userType === 'doctor'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl shadow-green-500/50 scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/15 border-2 border-white/20'
              }`}
            >
              <Stethoscope size={24} />
              <div className="text-left">
                <div className="text-sm opacity-80">I am a</div>
                <div className="text-lg font-bold">Doctor</div>
              </div>
            </button>
          </div>

          {/* Login/Signup Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            {/* Tab Toggle */}
            <div className="flex gap-2 mb-6 bg-white/5 p-1.5 rounded-2xl">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isLogin
                    ? `bg-gradient-to-r ${userType === 'patient' ? 'from-cyan-500 to-blue-600' : 'from-green-500 to-emerald-600'} text-white shadow-lg`
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  !isLogin
                    ? `bg-gradient-to-r ${userType === 'patient' ? 'from-cyan-500 to-blue-600' : 'from-green-500 to-emerald-600'} text-white shadow-lg`
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field (Signup only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    {userType === 'doctor' ? 'Full Name (Dr.)' : 'Full Name'}
                  </label>
                  <div className="relative">
                    <User size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={userType === 'doctor' ? 'Dr. John Doe' : 'Enter your name'}
                      className={`w-full pl-12 pr-4 py-3.5 bg-white/10 border-2 rounded-xl outline-none transition-all text-white placeholder-gray-400 ${
                        errors.name ? 'border-red-400' : 'border-white/20 focus:border-cyan-400'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full pl-12 pr-4 py-3.5 bg-white/10 border-2 rounded-xl outline-none transition-all text-white placeholder-gray-400 ${
                      errors.email ? 'border-red-400' : 'border-white/20 focus:border-cyan-400'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Doctor-specific fields (Signup only) */}
              {!isLogin && userType === 'doctor' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className={`w-full pl-12 pr-4 py-3.5 bg-white/10 border-2 rounded-xl outline-none transition-all text-white placeholder-gray-400 ${
                          errors.phone ? 'border-red-400' : 'border-white/20 focus:border-green-400'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      Specialty
                    </label>
                    <div className="relative">
                      <Stethoscope size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3.5 bg-white/10 border-2 rounded-xl outline-none transition-all text-white ${
                          errors.specialty ? 'border-red-400' : 'border-white/20 focus:border-green-400'
                        }`}
                      >
                        <option value="" className="bg-slate-800">Select Specialty</option>
                        {specialties.map(spec => (
                          <option key={spec} value={spec} className="bg-slate-800">{spec}</option>
                        ))}
                      </select>
                    </div>
                    {errors.specialty && <p className="text-red-400 text-xs mt-1">{errors.specialty}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      Qualification
                    </label>
                    <div className="relative">
                      <Award size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        placeholder="e.g., MBBS, MD"
                        className={`w-full pl-12 pr-4 py-3.5 bg-white/10 border-2 rounded-xl outline-none transition-all text-white placeholder-gray-400 ${
                          errors.qualification ? 'border-red-400' : 'border-white/20 focus:border-green-400'
                        }`}
                      />
                    </div>
                    {errors.qualification && <p className="text-red-400 text-xs mt-1">{errors.qualification}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      Experience
                    </label>
                    <div className="relative">
                      <Building2 size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="e.g., 10 years"
                        className={`w-full pl-12 pr-4 py-3.5 bg-white/10 border-2 rounded-xl outline-none transition-all text-white placeholder-gray-400 ${
                          errors.experience ? 'border-red-400' : 'border-white/20 focus:border-green-400'
                        }`}
                      />
                    </div>
                    {errors.experience && <p className="text-red-400 text-xs mt-1">{errors.experience}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      Medical License Number
                    </label>
                    <div className="relative">
                      <Shield size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="licenseNo"
                        value={formData.licenseNo}
                        onChange={handleChange}
                        placeholder="License number"
                        className={`w-full pl-12 pr-4 py-3.5 bg-white/10 border-2 rounded-xl outline-none transition-all text-white placeholder-gray-400 ${
                          errors.licenseNo ? 'border-red-400' : 'border-white/20 focus:border-green-400'
                        }`}
                      />
                    </div>
                    {errors.licenseNo && <p className="text-red-400 text-xs mt-1">{errors.licenseNo}</p>}
                  </div>
                </>
              )}

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 py-3.5 bg-white/10 border-2 rounded-xl outline-none transition-all text-white placeholder-gray-400 ${
                      errors.password ? 'border-red-400' : 'border-white/20 focus:border-cyan-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full bg-gradient-to-r ${
                  userType === 'patient' ? 'from-cyan-500 to-blue-600' : 'from-green-500 to-emerald-600'
                } text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-[1.02] mt-6`}
              >
                {isLogin ? 'Sign In' : `Register as ${userType === 'doctor' ? 'Doctor' : 'Patient'}`}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="text-sm text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            {/* Demo Login */}
            <button
              onClick={() => handleDemoLogin(userType)}
              className={`w-full bg-white/10 border-2 ${
                userType === 'patient' ? 'border-cyan-400/50 hover:border-cyan-400' : 'border-green-400/50 hover:border-green-400'
              } text-white py-4 rounded-xl font-semibold hover:bg-white/15 transition-all`}
            >
              🚀 Try Demo {userType === 'doctor' ? 'Doctor' : 'Patient'} Login
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm items-center justify-center p-12">
        <div className="max-w-lg">
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            {userType === 'patient' ? (
              <>Complete Healthcare<br /><span className="text-cyan-400">At Your Fingertips</span></>
            ) : (
              <>Empower Your<br /><span className="text-green-400">Medical Practice</span></>
            )}
          </h2>
          
          <p className="text-xl text-gray-200 mb-10">
            {userType === 'patient' 
              ? 'Find medicines, check symptoms, and consult doctors easily.'
              : 'Connect with patients, manage appointments, and grow your practice.'}
          </p>

          {/* Feature List */}
          <div className="space-y-5">
            {userType === 'patient' ? (
              <>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
                  <div className="bg-cyan-500 p-3 rounded-xl"><Activity size={24} className="text-white" /></div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">Find Medicines Instantly</h3>
                    <p className="text-gray-300 text-sm">Compare prices across nearby pharmacies</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
                  <div className="bg-blue-500 p-3 rounded-xl"><Shield size={24} className="text-white" /></div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">AI Symptom Checker</h3>
                    <p className="text-gray-300 text-sm">Get medicine recommendations</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
                  <div className="bg-indigo-500 p-3 rounded-xl"><Heart size={24} className="text-white" /></div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">Consult Doctors</h3>
                    <p className="text-gray-300 text-sm">Chat or book appointments easily</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
                  <div className="bg-green-500 p-3 rounded-xl"><Users size={24} className="text-white" /></div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">Connect with Patients</h3>
                    <p className="text-gray-300 text-sm">Reach thousands of patients online</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
                  <div className="bg-emerald-500 p-3 rounded-xl"><Stethoscope size={24} className="text-white" /></div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">Online Consultations</h3>
                    <p className="text-gray-300 text-sm">Chat and video consultations</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
                  <div className="bg-teal-500 p-3 rounded-xl"><CheckCircle size={24} className="text-white" /></div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">Verified Profile</h3>
                    <p className="text-gray-300 text-sm">Build trust with verified badge</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
