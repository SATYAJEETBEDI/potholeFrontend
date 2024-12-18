import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // Check if the user is logged in from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Function to toggle the menu for mobile view
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn'); // Clear login state
        alert('Logged out successfully.');
        navigate('/'); // Redirect to the homepage
    };

    return (
        <div className="font-serif top-0">
            <div className="h-20 md:h-30 font-semibold flex justify-between items-center px-4 md:px-8">
                <div className="cursor-pointer">
                    Pothole Detection
                </div>
                <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
                    {isOpen ? <HiOutlineX size={30} /> : <HiOutlineMenu size={30} />}
                </div>
                <div className={`absolute top-20 left-0 w-full bg-white flex flex-col items-center space-y-4 p-4 md:static md:flex md:flex-row md:space-y-0 md:space-x-8 md:w-auto md:bg-transparent transition-all duration-500 ease-in-out ${isOpen ? 'block' : 'hidden md:flex'}`}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? 'active border-b-2 border-black' : 'hover:border-b-2 border-black'
                        }
                        onClick={toggleMenu}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? 'active border-b-2 border-black' : 'hover:border-b-2 border-black'
                        }
                        onClick={toggleMenu}
                    >
                        About Us
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive ? 'active border-b-2 border-black' : 'hover:border-b-2 border-black'
                        }
                        onClick={toggleMenu}
                    >
                        Contact Us
                    </NavLink>

                    {/* Conditional Rendering: Sign Up or Logout */}
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="text-white bg-red-500 rounded-lg px-6 py-3"
                        >
                            Logout
                        </button>
                    ) : (
                        <NavLink
                            to="/signup"
                            className={({ isActive }) =>
                                isActive ? 'active' : ''
                            }
                            onClick={toggleMenu}
                        >
                            <button className="text-white bg-black rounded-lg px-6 py-3">
                                Sign Up
                            </button>
                        </NavLink>
                    )}
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Navbar;
