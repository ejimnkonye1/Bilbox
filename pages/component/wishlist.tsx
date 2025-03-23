"use client"; // Ensures it runs on the client side

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
// Ensure you have authentication context
import Image from "next/image"; // Import Next.js Image component

import {  firestore } from "@/firebase";
import MovieSkeleton from "../reuseable/skeleton";
import { useUser } from "../context/usercontext";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

  type props = {
    isSidebarOpen : boolean,
}
export default function Wishlist  ({isSidebarOpen}:props)  {
  
 const {user} = useUser()

  const [wishlist, setWishlist] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (!user) return;

    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, "wishlist", user.id, "movies"));
        const movies: Movie[] = querySnapshot.docs.map((doc) => ({
          id: doc.data().movieId,
          title: doc.data().title,
          poster_path: doc.data().poster_path,
          vote_average: doc.data().vote_average,
        }));
        
        setWishlist(movies);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);


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


