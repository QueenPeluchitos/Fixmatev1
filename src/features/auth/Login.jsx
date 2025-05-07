import { useState } from 'react';
import { fakeLogin } from './utils/fake_login';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Simulated saved user for demonstration
  const savedUser = {
    name: 'Hamid',
    avatar: '/images/avatar.png' // Placeholder path for the avatar
  };

  // Function that runs when form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate backend request
      const response = await fakeLogin(email, password);
      console.log('User logged in:', response.user);
      Cookies.set('authToken', 'true', {expires: 1, secure: true});
      navigate('/landing');
      setErrorMessage('');
    } catch (error) {
      console.log('Error logging in:', error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to handle saved user login
  const handleSavedUserLogin = () => {
    // Here you would typically auto-fill credentials or directly log in
    // For now, just navigate or show a notification
    setEmail(savedUser.name.toLowerCase() + '@fixmate.com'); // Example email
    // Focus on password field
    document.getElementById('password').focus();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side with background image */}
      <div className="w-1/2 bg-cover bg-center relative" style={{ backgroundImage: "url('/images/cleaning-background.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute top-16 left-16">
          <div className="flex items-center">
            <img src="/images/fixmatelogo.png" alt="FixMate" className="h-12" />
            <span className="text-3xl font-bold text-white ml-2">FixMate</span>
          </div>
        </div>
      </div>
      
      {/* Right side with login form */}
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-96">
          <h1 className="text-3xl font-bold text-yellow-500 mb-2">Logeate</h1>
          <p className="text-gray-600 mb-8">Please select your account</p>
          
          {errorMessage && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
              {errorMessage}
            </div>
          )}
          
          {/* Saved user account */}
          <div className="border rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center" onClick={handleSavedUserLogin} style={{cursor: 'pointer'}}>
              <img src={savedUser.avatar} alt={savedUser.name} className="w-10 h-10 rounded-full" />
              <div className="ml-3">
                <span className="text-gray-400 text-sm">Welcome back,</span>
                <span className="font-semibold ml-1">{savedUser.name}</span>
              </div>
            </div>
            <button className="text-red-500 text-sm font-medium">Remove</button>
          </div>
          
          {/* Divider with text */}
          <div className="my-6 relative">
            <div className="border-t border-gray-200"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-gray-500 text-sm">
              Login to a different account
            </div>
          </div>
          
          {/* Login form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                type="password"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-200"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
          
          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't haven an account? <a href="#" className="text-blue-600 font-medium">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;