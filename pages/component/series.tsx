/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image"
import Link from "next/link";
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
export default function MovieCardSeries (){
    const [movie, setMovie] = useState<Movie>()
   const [wishlist, setWishlist] = useState<number[]>([]); 



    useEffect(() => {
        const getMovie = async () => {
            try{
                const res = await fetch("/api/series");
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
    } 
    
    const addToWishlist = (movieId: number) => {
        if (!wishlist.includes(movieId)) {
          setWishlist([...wishlist, movieId]);
          console.log(`Added movie ${movieId} to wishlist`);
        } else {
          console.log(`Movie ${movieId} is already in the wishlist`);
        }
      };

    return(
        <section className="bg-black">
            <div className="p-10">
            <h1 className="text-white flex items-start mb-10 font-semibold">Series</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 ">
          {movie.map((movie:Movie) => (
            <div key={movie.id} className=" rounded-lg overflow-hidden relative">
            
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full h-64 object-cover"
              />
  
        
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
  
              <div className="p-4">
              <Link href={`/${movie.id}`}>
                <h6 className="text-sm mb-2 text-white">{movie.title}</h6>
                </Link>
                <div className="flex absolute bottom-10 right-2">
                  <p className="text-yellow-600 text-lg font-bold relative ">
                 {movie.vote_average.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
            </div>

    
      </section>
    )
}