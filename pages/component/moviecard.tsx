/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image"
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
interface Movie {
    map: any;
    id:number,
    title: string,
    backdrop_path: string,
    poster_path: string;
    overview:string,
    runtime?: number,
    vote_average: number,
    genres: string[]; 
}
export default function MovieCard (){
    const [movie, setMovie] = useState<Movie>()

    const [wishlist, setWishlist] = useState<number[]>([]); // Store movie IDs in the wishlist



    useEffect(() => {
        const getMovie = async () => {
            try{
                const res = await fetch("/api/card");
                const data = await res.json()
                setMovie(data)
                console.log(data.genres)
            }catch(error){
               console.log(error, "Failed to get movies") 
            }
           

        };
        getMovie();

    }, [])
    if(!movie){
        return<div>Loading.</div>
    }  const addToWishlist = (movieId: number) => {
        if (!wishlist.includes(movieId)) {
          setWishlist([...wishlist, movieId]);
          console.log(`Added movie ${movieId} to wishlist`);
        } else {
          console.log(`Movie ${movieId} is already in the wishlist`);
        }
      };

    return(
        <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {movie.map((movie:Movie) => (
            <div key={movie.id} className="border shadow-md rounded-lg overflow-hidden relative">
              {/* Movie Poster */}
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full h-64 object-cover"
              />
  
              {/* Wishlist Button */}
              <button
                onClick={() => addToWishlist(movie.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Add to wishlist"
              >
                <FaHeart
                  className={`text-lg ${
                    wishlist.includes(movie.id) ? "text-red-500" : "text-gray-500"
                  }`}
                />
              </button>
  
              {/* Movie Details */}
              <div className="p-4">
                <h6 className="text-md font-bold mb-2">{movie.title}</h6>
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">
                    Rating: {movie.vote_average.toFixed(1)}/10
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
}