import { useEffect, useState } from "react";
import img from '../images/ii.png';
import Image from "next/image";
import {   FaHistory, FaSearch, FaTimes } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { TbLogin2, TbLogout2 } from "react-icons/tb";
import { GrFavorite } from "react-icons/gr";
import Link from "next/link";
import { CgMenuRight } from "react-icons/cg";
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
                   
                    <label className="flex flex-col gap-2 w-8 cursor-pointer">
      {/* Hidden checkbox to control the state */}
      <input
        type="checkbox"
        className="peer hidden"
        checked={isSidebarOpen}
        onChange={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Hamburger Icon */}
      <CgMenuRight
        className={` text-2xl transition-transform duration-500 ${
          isSidebarOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
        }`}
      />

      {/* Close Icon (X) */}
      <FaTimes
        className={` text-2xl absolute transition-transform duration-500 ${
          isSidebarOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
        }`}
      />
    </label>


                    {/* Logo and App Name */}
                    <a href="#" className="flex hidden lg:flex items-center space-x-2">
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
                            className="w-[50%] px-10 py-3  bg-gray-800  rounded-lg text-sm  text-white focus:outline-none  placeholder-gray-400"
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
                        <TbLogin2 size={24} />
                    </button>

                    {/* Watch History Icon (Visible on Small Screens) */}
                    <button className="lg:hidden text-white">
                        <FaHistory size={24} />
                    </button>
     
                 {user ?  
                    
                    <button
                      className="hideen lg:block items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-transform duration-200 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                      focus-visible:ring-offset-2 disabled:pointer-events-none 
                      disabled:opacity-50 group relative animate-rainbow
                       cursor-pointer border-0 
                       bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] bg-[length:200%] text-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-[0] before:h-[20%] before:w-[60%] before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] before:[filter:blur(calc(0.8*1rem))] dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] hover:scale-105 active:scale-95 h-10 px-4 py-2 inline-flex"
                    >
                      <div className="flex items-center">
                    <span> <TbLogout2 size={20} /></span>
                        <span className="ml-1 text-md text-white lg:inline p-1">Logout</span>
                      </div>
                    
                    </button>
                  
                 :
                   <Link className="hidden lg:flex" href="./login">
   
  
                   <button
                     className=" items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-transform duration-200 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group relative animate-rainbow cursor-pointer border-0 bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] bg-[length:200%] text-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-[0] before:h-[20%] before:w-[60%] before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] before:[filter:blur(calc(0.8*1rem))] dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] hover:scale-105 active:scale-95 h-10 px-4 py-2 inline-flex"
                   >
                     <div className="flex items-center">
                   <span> <TbLogin2 size={20} /></span>
                       <span className="ml-1 text-md text-white lg:inline p-1">Login</span>
                     </div>
                   
                   </button>
                   </Link>               
                }

<Link className="hidden lg:flex" href='/wishlist'>
            
<button
  className="relative inline-flex h-10 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none"
>
  <span
    className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
     bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5f_100%)]"
  >
  </span>
  <span
    className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined"
  >
    Wishlist
   <span><GrFavorite size={15} /></span>
  </span>
</button>
</Link>
                
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