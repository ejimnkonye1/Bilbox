"use client"; // Ensures it runs on the client side

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
// Ensure you have authentication context
import Image from "next/image"; // Import Next.js Image component
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/firebase";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}
type User = {
    id: string;
    email: string;
  };
  type props = {
    isSidebarOpen : boolean,
}
export default function Wishlist  ({isSidebarOpen}:props)  {
  const [user, setUser] = useState<User | null>(null);

  const [wishlist, setWishlist] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (!user) return <p className="text-center text-lg">Please log in to view your wishlist</p>;

  return (
    <section className="">
<div className={`p-5 ${isSidebarOpen ? 'lg:pl-[230px]' : 'pl-10'}`} >
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
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
    </div>
    </section>
    
  );
};


