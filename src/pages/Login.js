import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginImg from '../assests/SignUp.png'; 
import CustomAlert from '../components/CustomAlert'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState({ visible: false, message: '', type: '' });
  
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      if (!emailRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Please enter a valid email address.',
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
      }
    }

    if (name === 'password') {
      if (value.length < 8) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: 'Password must be at least 8 characters long.',
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!errors.email && !errors.password && formData.email && formData.password) {
      try {
        const response = await fetch('https://capstonelogin.onrender.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
  
        const data = await response.text();
  
        if (response.ok && data === 'authenticated' ) {
          // Handle successful login
          setAlert({ visible: true, message: 'Login Successful!', type: 'success' });
          setFormData({ email: '', password: '' });
  
          localStorage.setItem('isLoggedIn', 'true');
          // Redirect or save token if needed
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          // Handle server error response
          setAlert({
            visible: true,
            message: data.message || 'Invalid email or password. Please try again.',
            type: 'error',
          });
        }
      } catch (error) {
        console.error('Error during login:', error);
        setAlert({
          visible: true,
          message: 'Something went wrong. Please try again later.',
          type: 'error',
        });
      }
    } else {
      setAlert({ visible: true, message: 'Please fill out all fields correctly.', type: 'error' });
    }
  };
  
  
  const handleCloseAlert = () => {
    setAlert({ visible: false, message: '', type: '' });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
        <div className="flex flex-col gap-y-4 md:w-1/2">
          <h1 className="text-4xl font-bold mb-2">Login</h1>
          <p className="text-gray-600 mb-6">Sign in to your account</p>
          <form onSubmit={handleSubmit}>
            {alert.visible && (
              <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">Sign up here</Link>.
          </p>
        </div>
        <div className="max-w-full md:max-w-[500px]">
          <img alt="login page" src={LoginImg} />
        </div>
      </div>
    </div>
  );
};

export default Login;
