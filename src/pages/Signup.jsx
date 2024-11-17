import { useState } from 'react';
import api from '../axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
    } else {
      try {
        // Send a POST request to register the user
        console.log({ username, email, password })
        const response = await api.post('/auth/register', { username, email, password });

        const { token, user } = response.data;
        localStorage.setItem('token', token); 
        localStorage.setItem('user', JSON.stringify(user)); 
        
        const userInfo = JSON.parse(localStorage.getItem('user'));

        if (userInfo && userInfo.role === 'admin') {
           window.location.href = '/admin-dashboard';
        } else {
          window.location.href = '/bidders';
        }
        
        // window.location.href = '/dashboard'; // Example redirect
      } catch (err) {
        // Handle error if the registration fails
        setError(err.response?.data?.message || 'Something went wrong!');
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={isPasswordVisible ? 'text' : 'password'} // Toggle between password and text
                name="password"
                id="password"
                value={password} // Assuming formData is the state holding the password
                onChange={(e) => setPassword(e.target.value)} // handleChange function for form data
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
              {/* Eye icon */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {isPasswordVisible ? (
                  // Using Heroicons "eye-off" icon if password is visible
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12c0 1.393-.49 2.652-1.309 3.637M12 6a9 9 0 011.7 6.557A4.992 4.992 0 0015 12a5.004 5.004 0 011-3.09M12 6c-1.476 0-2.848.407-4.022 1.104A4.992 4.992 0 009 12a5.004 5.004 0 011-3.09M9 12c0 1.393-.49 2.652-1.309 3.637M12 18a6 6 0 11-6-6 6 6 0 016 6z" />
                  </svg>
                ) : (
                  // Using Heroicons "eye" icon if password is hidden
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12c0 1.393-.49 2.652-1.309 3.637M12 6a9 9 0 011.7 6.557A4.992 4.992 0 0015 12a5.004 5.004 0 011-3.09M12 6c-1.476 0-2.848.407-4.022 1.104A4.992 4.992 0 009 12a5.004 5.004 0 011-3.09M9 12c0 1.393-.49 2.652-1.309 3.637M12 18a6 6 0 11-6-6 6 6 0 016 6z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmPassword"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            { !loading ? "Sign Up" : "Loading..."}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
