
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import MovieSkeleton from "../reuseable/skeleton";
import { useUser } from "../context/usercontext";
import { useWishlist } from "../context/WishlistContext";

interface Movie {
  id: number;
  title: string;
  name: string
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


export default function MovieCard({ isSidebarOpen }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]); // Fixed state to be an array
  
  const [isLoading, setIsLoading] = useState(true);
  
 const {user} = useUser()
 const { wishlist, addToWishlist } = useWishlist(); 

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
              <div className="absolute lg:top-53 top-2 left-2 lg:right-2 bg-black bg-opacity-10 text-white text-sm font-bold px-2 py-1 rounded-md">

<p className="text-yellow-600 text-sm font-bold relative">
  {movie.vote_average.toFixed(1)}
</p>
</div>
              <div className="lg:p-4">
                <Link href={`/${movie.id}`}>
                  <h6 className="text-sm mb-2  text-white">{movie.title}</h6>
                </Link>
            
              </div>
            </div>
          ))}
        </div>
           )}
      </div>
    </section>
  );
}
