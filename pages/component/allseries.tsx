
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import MovieSkeleton from "../reuseable/skeleton";
import { useWishlist } from "../../context/WishlistContext";

interface Movie {

    id:number,
    title: string,
    name: string
    backdrop_path: string,
    poster_path: string;
    overview:string,
    runtime?: number,
    vote_average: number,
    genres: string[]; 
}
type props = {
    isSidebarOpen : boolean,
}
export default function TvShow ({isSidebarOpen}:props){
    const [movies, setMovies] = useState<Movie[]>([])
   const [isLoading, setIsLoading] = useState(true);
 const { wishlist, addToWishlist } = useWishlist(); 

    useEffect(() => {
        const getMovie = async () => {
            try{
                const res = await fetch("/api/tv");
                const data = await res.json()
                setTimeout(() => {
                  setMovies(data);
                  setIsLoading(false); // Hide loading after 5 seconds
                }, 5000);
           
            }catch(error){
               console.log(error, "Failed to get movies") 
            }
           

        };
        getMovie();

    }, [])

    
   

    return(
   
        <section className="bg-black">
                    <div className={`p-5 ${isSidebarOpen ? 'pl-[230px]':'pl-10'} `}>
            <h1 className="text-white flex items-start mb-10 font-semibold">Series</h1>
                {isLoading  ? (
                      <MovieSkeleton  />
                    ) : (
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 ">
          {movies.map((movie:Movie) => (
            <div key={movie.id} className=" rounded-lg overflow-hidden relative">
            
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
                <h6 className="text-sm mb-2 text-white">{movie.name}</h6>
                </Link>
                <div className="flex absolute bottom-25 right-2">
                  <p className="text-yellow-600 text-lg font-bold relative ">
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
  
    )
}