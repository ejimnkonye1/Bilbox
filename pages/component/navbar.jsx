import { useState } from "react";
import img from '../images/image.png'
import Image from "next/image";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full bg-black flex justify-between items-center border-b border-white p-4 z-10">
            {/* Hamburger, Logo, and App Name */}
            <div className="flex items-center space-x-4">
                {/* Hamburger Menu */}
                <button 
                    className="text-white focus:outline-none"
                  
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4 6h16M4 12h16M4 18h16" 
                        />
                    </svg>
                </button>

                {/* Logo and App Name */}
                <a href="#" className="flex items-center space-x-2">
                    <Image 
                        src={img.src}
                        alt="Logo"
                        width={50}
                        height={50}
                    />
                    <span className="text-white text-xl font-bold">Bilbox</span>
                </a>
            </div>

            {/* Search Bar */}
            <div className="flex-grow mx-4">
                <input 
                    type="search"
                    placeholder="Search"
                    className="w-full px-4 py-2 border border-gray-300 rounded-full bg-black text-white focus:outline-none focus:border-white"
                />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
                <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300">
                    Download App
                </button>
                <button className="bg-transparent border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition duration-300">
                    Watch History
                </button>
            </div>

       
        </nav>
    );
}