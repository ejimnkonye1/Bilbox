import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FaHome,
    FaTv,
    FaFilm,
    FaHeart,
    FaDragon,
  
} from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
type User = {
    id: string;
    email: string;
  };
  
export default function Sidebar() {
    const pathname = usePathname(); // Get the current route

    // Function to check if the link is active
    const isActive = (path:string) => pathname === path;
    const [user, setUser] = useState<User | null>(null);

    // Handle Firebase Authentication
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
    const ShortLetter = user?.email || "Guest"
     const Slice =  ShortLetter.slice(0,1) 
    const Firstletter = Slice?.toUpperCase()
    return (

        <div className="fixed inset-0 bg-black lg:w-[18%] w-70 p-8 border-r  transform transition-transform duration-300 ease-in-out">
            {/* Sidebar Menu */}
            <ul className="flex flex-col justify-start items-start lg:pt-20 pt-30 space-y-2">
                <li className="w-full">
                    <Link
                        className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                            isActive("/") ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800"
                        }`}
                        href="/"
                    >
                        <FaHome size={24} className="mr-3" />
                        <span className="text-md font-medium">Home</span>
                    </Link>
                </li>
                <li className="w-full">
                    <Link
                        className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                            isActive("/tv-show") ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800"
                        }`}
                        href="/tv-show"
                    >
                        <FaTv size={24} className="mr-3" />
                        <span className="text-md">TV Show</span>
                    </Link>
                </li>
                <li className="w-full">
                    <Link
                        className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                            isActive("/movies") ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800"
                        }`}
                        href="/movies"
                    >
                        <FaFilm size={24} className="mr-3" />
                        <span className="text-md">Movies</span>
                    </Link>
                </li>
                <li className="w-full">
                    <Link
                        className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                            isActive("/wishlist") ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800"
                        }`}
                        href="/wishlist"
                    >
                        <FaHeart size={24} className="mr-3" />
                        <span className="text-md">Wishlist</span>
                    </Link>
                </li>
                <li className="w-full">
                    <Link
                        className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                            isActive("/anime") ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800"
                        }`}
                        href="/anime"
                    >
                        <FaDragon size={24} className="mr-3" />
                        <span className="text-md">Anime</span>
                    </Link>
                </li>
            </ul>

            {/* Footer Section */}
            <div className="border-t text-white absolute bottom-20 right-[2px] w-full">

            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-row items-center">
        <div className="w-8 h-8 bg-gray-600 text-white flex items-center justify-center rounded-full text-sm font-semibold">
            {Firstletter}
        </div>
        <span className="text-gray-400 text-sm  pl-2">{user?.email || "Guest"}</span>
    </div>
        </div>
    );
}