import { useEffect, useState } from "react";
import img from '../images/ii.png';
import Image from "next/image";
import { FaDownload, FaHistory, FaSearch } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

type Props = {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isopen:boolean) => void
  };
type User = {
    id: string;
    email: string;
  };
export default function Navbar({ isSidebarOpen, setIsSidebarOpen }: Props) {

    const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          id: currentUser.uid,
          email: currentUser.email || "",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
    return (
        <>
            {/* Main Navbar */}
            <nav className="fixed top-0 w-full bg-black flex justify-between items-center border-b border-gray-800 p-4 z-10">
                {/* Hamburger and Logo */}
                <div className="flex items-center space-x-4">
                    {/* Hamburger Menu */}
                    <button 
                        className="text-white focus:outline-none"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
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
                    </a>
                </div>

                {/* Search Bar (Hidden on Small Screens) */}
                <div className="flex-grow mx-4 hidden lg:block relative">
                    <div className="relative ">
                        <input 
                            type="search"
                            placeholder="Search Movies/Tv Shows"
                            className="w-full px-10 py-3  bg-gray-800  rounded-lg text-sm  text-white focus:outline-none  placeholder-gray-400"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch size={18} className="text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Buttons (Replaced with Icons on Small Screens) */}
                <div className="flex space-x-4">
                    {/* Download App Icon (Visible on Small Screens) */}
                    <button className="lg:hidden text-white">
                        <FaDownload size={24} />
                    </button>

                    {/* Watch History Icon (Visible on Small Screens) */}
                    <button className="lg:hidden text-white">
                        <FaHistory size={24} />
                    </button>
     
                 {user ?  
                     <button className="hidden lg:block bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300">
                       
                     Logout
                 </button> :
                     <button className="hidden lg:block bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300">
                       
                     Login
                 </button>
                }
                    

                    {/* Watch History Button (Visible on Larger Screens) */}
                    <button className="hidden lg:block bg-transparent border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition duration-300">
                        Wishlist
                    </button>
                </div>
            </nav>

            {/* Search Bar (Visible Below Navbar on Small Screens) */}
            <div className="fixed top-16 w-full p-4 bg-black lg:hidden z-10">
                <div className="relative">
                    <input 
                        type="search"
                        placeholder="Movies/Series"
                        className="w-full px-10 py-3 bg-gray-800  rounded-lg text-sm  text-white  placeholder-gray-400"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch size={18} className="text-gray-400" />
                    </div>
                </div>
            </div>
        </>
    );
}