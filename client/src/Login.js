import React, { useState } from 'react';

const Login = ({ onLogin, goBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the credentials back to App.js to check
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 border border-gray-300">
        <div className="flex justify-center mb-4">
            <img src="/amazon-logo.png" alt="Amazon" className="w-24 object-contain" />
        </div>
        <h1 className="text-2xl font-normal mb-4">Sign-In</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#f0c14b] border border-[#a88734] py-1 rounded shadow-sm hover:bg-[#ddb347]"
          >
            Sign In
          </button>
        </form>

        <button 
            onClick={goBack}
            className="mt-4 text-xs text-blue-600 hover:underline w-full text-center"
        >
            Back to Shopping
        </button>
      </div>
    </div>
  );
};

export default Login;