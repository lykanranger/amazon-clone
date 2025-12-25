import React, { useState, useEffect } from 'react';
import { CreditCard, Lock, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const Checkout = ({ total, onSuccess, onCancel, userProfile, user }) => {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Address State
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState({
    name: userProfile?.name || user?.name || '',
    street: userProfile?.address || '',
    city: userProfile?.city || '',
    state: userProfile?.state || '',
    zip: userProfile?.zip || '',
    country: userProfile?.country || 'India'
  });

  // Card State
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Form Validity State
  const [isFormValid, setIsFormValid] = useState(false);

  // Check form validity whenever inputs change
  useEffect(() => {
    const isAddressValid = Object.values(address).every(val => val && val.trim() !== '');
    const isCardValid = 
      cardNumber.replace(/\s/g, '').length === 16 && 
      cardName.trim() !== '' && 
      expiry.length === 5 && 
      cvv.length >= 3;

    setIsFormValid(isAddressValid && isCardValid);
  }, [address, cardNumber, cardName, expiry, cvv]);

  // --- Handlers ---

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formattedValue);
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
    let formattedValue = value;
    if (value.length >= 3) {
      formattedValue = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setExpiry(formattedValue);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
    setCvv(value);
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    setIsEditingAddress(false);
  };

  const validateForm = () => {
    // 1. Validate Address
    const isAddressValid = Object.values(address).every(val => val && val.trim() !== '');
    if (!isAddressValid) {
        setError('Please fill in all delivery address fields.');
        return false;
    }

    // 2. Validate Card Details
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Invalid Card Number. Must be 16 digits.');
      return false;
    }
    if (cvv.length < 3) {
      setError('Invalid CVV.');
      return false;
    }
    const [expMonth, expYear] = expiry.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (!expMonth || !expYear || parseInt(expMonth) > 12 || parseInt(expMonth) < 1) {
      setError('Invalid Expiry Date.');
      return false;
    }
    // Simple expiry check (year must be >= current year)
    if (parseInt(expYear) < currentYear || (parseInt(expYear) === currentYear && parseInt(expMonth) < currentMonth)) {
      setError('Card has expired.');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Run Complete Validation
    if (!validateForm()) return;

    // 2. Start Processing
    setProcessing(true);
    
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        onSuccess(address); 
      }, 2500);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full border border-gray-200">
          <div className="flex justify-center mb-6">
            <CheckCircle size={64} className="text-green-500 animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Thank you for shopping with us. Your order is on its way.</p>
          <p className="text-xs text-gray-400">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans pb-10 scrollbar-hide">
      {/* Hide Scrollbar Style */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      {/* Header */}
      <div className="bg-[#131921] border-b border-gray-700 p-4 sticky top-0 z-50">
        <div className="max-w-screen-lg mx-auto flex items-center justify-between">
          <div className="flex items-center">
              {/* Back Button added here */}
              <button onClick={onCancel} className="mr-4 text-gray-300 hover:text-white">
                <ArrowLeft size={24} />
              </button>
              
              <img 
                src="/amazon-logo.png" 
                alt="Amazon" 
                className="h-8 mt-2 object-contain cursor-pointer"
                onClick={onCancel} 
              />
          </div>
          <h1 className="text-2xl font-medium text-white hidden sm:block">Checkout</h1>
          <Lock size={20} className="text-gray-400" />
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Col: Forms */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Address Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex justify-between border-b pb-2">
              1. Delivery Address 
              {!isEditingAddress && (
                <span 
                  onClick={() => setIsEditingAddress(true)}
                  className="text-sm text-blue-600 font-normal cursor-pointer hover:underline"
                >
                  Change
                </span>
              )}
            </h3>
            
            {isEditingAddress ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <input 
                    name="name" 
                    value={address.name} 
                    onChange={handleAddressChange} 
                    placeholder="Full Name"
                    className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <input 
                    name="street" 
                    value={address.street} 
                    onChange={handleAddressChange} 
                    placeholder="Street Address"
                    className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    name="city" 
                    value={address.city} 
                    onChange={handleAddressChange} 
                    placeholder="City"
                    className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <input 
                    name="state" 
                    value={address.state} 
                    onChange={handleAddressChange} 
                    placeholder="State"
                    className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    name="zip" 
                    value={address.zip} 
                    onChange={handleAddressChange} 
                    placeholder="ZIP Code"
                    className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <input 
                    name="country" 
                    value={address.country} 
                    onChange={handleAddressChange} 
                    placeholder="Country"
                    className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                {/* Updated Button to use handleSaveAddress */}
                <button 
                  onClick={handleSaveAddress}
                  className="bg-[#ffd814] border border-[#fcd200] px-4 py-1 rounded text-sm font-medium hover:bg-[#f7ca00] shadow-sm"
                >
                  Save Address
                </button>
              </div>
            ) : (
              <div className="text-sm text-gray-600 ml-4">
                <p className="font-bold text-gray-800">{address.name || 'Name Required'}</p>
                <p>{address.street || 'Street Required'}</p>
                <p>{address.city}, {address.state} {address.zip}</p>
                <p>{address.country}</p>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-orange-700 mb-4 border-b pb-2">2. Payment Method</h3>
            
            {/* The Main Form */}
            <form id="checkout-form" onSubmit={handleSubmit} className="ml-0 md:ml-4 space-y-4">
              <div className="border border-gray-300 rounded p-4 bg-gray-50">
                <div className="flex items-center mb-4">
                  <input type="radio" checked className="w-4 h-4 text-orange-600" readOnly />
                  <span className="ml-2 font-bold text-gray-800 flex items-center">
                    Credit or Debit Card
                    <div className="flex ml-2 space-x-1 opacity-75">
                        <div className="w-8 h-5 bg-blue-800 rounded-sm"></div>
                        <div className="w-8 h-5 bg-red-600 rounded-sm"></div>
                        <div className="w-8 h-5 bg-orange-500 rounded-sm"></div>
                    </div>
                  </span>
                </div>

                <div className="space-y-4 max-w-sm">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Card Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="0000 0000 0000 0000" 
                        className="w-full border border-gray-300 rounded p-2 pl-10 focus:ring-2 focus:ring-orange-500 outline-none shadow-inner font-mono"
                        required
                        maxLength="19"
                        minLength="19" // Ensures spaces are counted
                      />
                      <CreditCard size={18} className="absolute left-3 top-2.5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Name on Card</label>
                    <input 
                      type="text" 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      placeholder="YOUR NAME" 
                      className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-orange-500 outline-none shadow-inner"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Expiry Date</label>
                      <input 
                        type="text" 
                        value={expiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY" 
                        className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-orange-500 outline-none shadow-inner font-mono"
                        required
                        maxLength="5"
                        minLength="5"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">CVV</label>
                      <div className="relative">
                        <input 
                          type="password" 
                          value={cvv}
                          onChange={handleCvvChange}
                          placeholder="123" 
                          className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-orange-500 outline-none shadow-inner font-mono"
                          required
                          maxLength="4"
                          minLength="3"
                        />
                        <Lock size={14} className="absolute right-3 top-3 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center text-red-600 text-sm mt-2">
                  <AlertCircle size={16} className="mr-1" />
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Col: Summary */}
        <div className="md:col-span-1">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 sticky top-24">
            
            {/* BUTTON CONNECTED TO FORM via form="checkout-form"
              This triggers HTML5 validation on the form above.
            */}
            <button 
              type="submit"
              form="checkout-form"
              disabled={processing || !isFormValid}
              className={`w-full py-2 rounded text-sm font-medium mb-4 shadow-sm transition-colors ${
                processing || !isFormValid
                ? "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300" 
                : "bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] text-black"
              }`}
            >
              {processing ? "Processing..." : "Place Your Order"}
            </button>

            <div className="text-xs text-gray-500 text-center mb-4 px-2">
              By placing your order, you agree to Amazon's privacy notice and conditions of use.
            </div>

            <hr className="my-3"/>

            <h3 className="font-bold text-lg mb-2">Order Summary</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Items:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-xl font-bold text-red-700">
                <span>Order Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;