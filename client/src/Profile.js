import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Save, ArrowLeft, Edit2, X } from 'lucide-react';

const Profile = ({ user, currentProfile, onSave, goBack }) => {
  // Initialize form with user data (from login) or existing profile data
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(true); // Default to editing (Create mode)

  // Load existing profile if available
  useEffect(() => {
    if (currentProfile) {
      setFormData(prev => ({
        ...prev,
        ...currentProfile,
        email: currentProfile.email || user?.email || '', 
        name: currentProfile.name || user?.name || ''
      }));
      setIsEditing(false); // Switch to View mode if profile exists
    } else {
      setIsEditing(true); // Switch to Create mode if no profile
    }
  }, [currentProfile, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setSaved(true);
    setIsEditing(false); // Switch back to View mode after saving
    setTimeout(() => setSaved(false), 3000); 
  };

  const toggleEdit = () => {
    // If canceling edit, revert form data to saved profile
    if (isEditing && currentProfile) {
      setFormData({ ...currentProfile });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 px-4 py-3 flex items-center shadow-sm">
        <button 
          onClick={goBack} 
          className="flex items-center text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={18} className="mr-1" /> Back to Store
        </button>
        <h1 className="text-xl font-bold text-gray-800 ml-4">Your Profile</h1>
      </div>

      <div className="max-w-2xl mx-auto p-6 md:p-10">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
              <p className="text-sm text-gray-500">Manage your personal details and shipping address.</p>
            </div>
            {currentProfile && (
              <button 
                onClick={toggleEdit}
                className={`text-sm flex items-center px-3 py-1.5 rounded-md font-medium transition-colors ${
                  isEditing 
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300" 
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                }`}
              >
                {isEditing ? <X size={16} className="mr-1"/> : <Edit2 size={16} className="mr-1"/>}
                {isEditing ? "Cancel" : "Edit"}
              </button>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-700 flex items-center">
                <User size={18} className="mr-2 text-orange-500"/> Basic Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Full Name</label>
                  {isEditing ? (
                    <input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-orange-500 outline-none"
                      required
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{formData.name || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Phone Number</label>
                  {isEditing ? (
                    <div className="relative">
                      <input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2 pl-8 focus:ring-2 focus:ring-orange-500 outline-none"
                        placeholder="9876543210"
                      />
                      <Phone size={14} className="absolute left-2.5 top-3 text-gray-400" />
                    </div>
                  ) : (
                    <p className="text-gray-800 font-medium">{formData.phone || 'Not provided'}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Email Address</label>
                {isEditing ? (
                  <div className="relative">
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2 pl-8 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50"
                      readOnly 
                    />
                    <Mail size={14} className="absolute left-2.5 top-3 text-gray-400" />
                  </div>
                ) : (
                  <p className="text-gray-800 font-medium">{formData.email}</p>
                )}
              </div>
            </div>

            <hr />

            {/* Address Details */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-700 flex items-center">
                <MapPin size={18} className="mr-2 text-orange-500"/> Default Address
              </h3>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Street Address</label>
                {isEditing ? (
                  <input 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Flat, House no., Building, Apartment"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{formData.address || 'Not provided'}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">City</label>
                  {isEditing ? (
                    <input 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{formData.city || '-'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">State</label>
                  {isEditing ? (
                    <input 
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{formData.state || '-'}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Zip Code</label>
                  {isEditing ? (
                    <input 
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{formData.zip || '-'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Country</label>
                  {isEditing ? (
                    <input 
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{formData.country || '-'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button - Only show in Edit Mode */}
            {isEditing && (
              <div className="pt-4">
                <button 
                  type="submit" 
                  className={`flex items-center justify-center w-full py-2 rounded shadow-sm font-bold transition-colors ${
                    saved 
                    ? "bg-green-500 text-white border border-green-600" 
                    : "bg-[#f0c14b] border border-[#a88734] hover:bg-[#ddb347] text-black"
                  }`}
                >
                  <Save size={18} className="mr-2" />
                  {saved ? 'Saved Successfully!' : 'Save Changes'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;