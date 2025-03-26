"use client"; 

import {  useState } from "react";

// Ensure you have authentication context
import Image from "next/image"; // Import Next.js Image component

import MovieSkeleton from "../reuseable/skeleton";
import { useUser } from "../../context/usercontext";
import { useWishlist } from "../../context/WishlistContext";


  type props = {
    isSidebarOpen : boolean,
}
export default function Wishlist  ({isSidebarOpen}:props)  {
  
 const {user} = useUser()
 const { wishlist,  } = useWishlist(); // Access wishlist and function

  const [loading, setLoading] = useState(true);


setTimeout(() => {
  setLoading(false)
}, 2000);



  if (!user) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#0a0a0a] p-6 rounded-lg shadow-lg text-center">
                <p className="text-white text-lg">Please log in to view your wishlist</p>
            </div>
        </div>
    );
}

  return (
    <section className="px-4">
<div className={`p-5 ${isSidebarOpen ? 'lg:pl-[230px]' : 'pl-14'}`} >
      <h2 className="text-lg text-white text-center font-bold mb-4">Your Wishlist</h2>
           {loading ? (
                <MovieSkeleton />
              ) : (
      <>
      {wishlist.length === 0 ? (
        <p>No movies in wishlist</p>
      ) : (
        
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 ">
          {wishlist.map((movie) => (
            <div key={movie.id} className=" shadow-md rounded-lg relative">

                <Image 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title} 
                  width={500}
                  height={750}
                 className="w-full h-40 md:h-56 lg:h-64 object-cover"
                
                />
           <div className="p-4">
             
                <div className="flex absolute bottom-25 right-2">
                  <p className="text-yellow-600 text-lg font-bold relative">
                    {movie.vote_average.toFixed(1)}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
      </>
    )}
    </div>
    </section>
    
  );
};


