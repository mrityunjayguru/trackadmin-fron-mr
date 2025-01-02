import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo/TrPro.png';
import login from '../../images/user/login.jpg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { adminLogin } from '../../api/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Footer } from '../../components/Footer/Footer';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // State management for form inputs and password visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset error message
    setError('');

    // Validation
    if (!email) {
      setError('Please enter a valid UserID.');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }
    // Dispatch the login action if validation passes
    const payload: any = { email: email.trim(), password: password.trim() };
    let response: any = await dispatch(adminLogin(payload));
    if (response.payload) {
      navigate('/');
    }
  };

  return (
    <>
      {/* Main container with flex and min-height to ensure footer placement */}
      <div className="flex flex-col min-h-screen ">
        {/* Main Content */}
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="w-full max-w-4xl rounded-lg overflow-hidden md:flex ">
            {/* Left Side: Form */}
            <div className="w-full md:w-1/2 p-8">
              <div className="flex justify-center mb-6 bg-[#000] rounded-md">
                <img
                  className="w-[300px] h-40 object-contain"
                  src={logo}
                  alt="Logo"
                />
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
                Login Into Your Account
              </h2>

              <form onSubmit={handleAdminLogin}>
                <div className="mb-4">
                  <label className="block text-gray-600 font-semibold mb-2">
                    User Id
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-6 pr-10 text-black outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter User Id"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-600 font-semibold mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-6 pr-10 text-black outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your password"
                    />
                    <span
                      className="absolute right-4 top-3 cursor-pointer text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className="mb-4">
                  <input
                    type="submit"
                    value="Login"
                    className="w-full bg-[#000] text-yellow-400 cursor-pointer rounded-lg py-3 font-semibold transition hover:bg-opacity-90"
                  />
                </div>

                <div className="text-center mt-4">
                  <p className="text-gray-600">
                    Forgot Password?
                    <Link to="#" className="text-primary font-semibold ml-1">
                      Click here to reset
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Right Side: Image */}
            <div className="md:block w-full h-full md:w-1/2 overflow-hidden">
              <img
                className="mt-[30px] w-[677px] h-[514px] object-cover rounded-md"
                src={login}
                alt="Login Illustration"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='w-[65%] mx-auto'><Footer /></div>
      </div>
    </>
  );
};

export default SignIn;
