
import { auth, firestore } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import MovieSkeleton from "../reuseable/skeleton";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  runtime?: number;
  vote_average: number;
  genres: { id: number; name: string }[]; // Corrected type
}

type Props = {
  isSidebarOpen: boolean;
};

type User = {
  id: string;
  email: string;
};

export default function MovieCard({ isSidebarOpen }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]); // Fixed state to be an array
  const [wishlist, setWishlist] = useState<Movie[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  // Fetch Movies from API
  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch("/api/card");
        const data = await res.json();
        setTimeout(() => {
          setMovies(data);
          setIsLoading(false); // Hide loading after 5 seconds
        }, 5000);
      } catch (error) {
        console.error("Failed to get movies", error);
        setIsLoading(false); 
      }
    };

    getMovies();
  }, []);


  const addToWishlist = async (selectedMovie: Movie) => {
    if (!user) {
      alert("Log in to add movie to wishlist");
      return;
    }
    const movieRef = doc(collection(firestore, "wishlist", user.id, "movies"), `${selectedMovie.id}`); 

    //check if movie is already in wishlist
 const alreadyWhishlist = wishlist.some((item) => item.id === selectedMovie.id )
 if (!alreadyWhishlist){
  try {
    await setDoc(movieRef, {
      userId: user.id,
      movieId: selectedMovie.id,
      title: selectedMovie.title,
      poster_path: selectedMovie.poster_path,
      vote_average: selectedMovie.vote_average,


    })
    setWishlist([...wishlist , selectedMovie])
    console.log(`Added ${selectedMovie.title} to wishlist`);
  } catch(error){
    console.log(error)
  }


 } else{
  console.log(`${selectedMovie.title} is already in the wishlist`);
 }

  };

  return (
    <section className="bg-black">
      <div className={`p-5 ${isSidebarOpen ? "lg:pl-[230px]" : "pl-10"} `}>
        <h1 className="text-white flex items-start mb-10 font-semibold">
          Popular Movies {user?.email}
        </h1>
        {isLoading ? (
          <MovieSkeleton  />
        ) : (
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 ">
          {movies.map((movie) => (
            <div key={movie.id} className="rounded-lg overflow-hidden relative">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full h-40 md:h-56 lg:h-64 object-cover"
              />

              <button
                onClick={() => addToWishlist(movie)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Add to wishlist"
              >
                <FaHeart
                  className={`text-lg ${
                    wishlist.some((item) => item.id === movie.id) ? "text-red-500" : "text-gray-500"
                  }`}
                />
              </button>

              <div className="p-4">
                <Link href={`/${movie.id}`}>
                  <h6 className="text-sm mb-2 text-white">{movie.title}</h6>
                </Link>
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
}
