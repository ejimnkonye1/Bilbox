
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IoIosStar } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import Header from "./component/header";


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

export default function MovieDetails () {
    const router = useRouter()
    const {id} =  router.query
   const [movie, setmovie] = useState<Movie>()
   const [releaseDate , setReleaseDate] = useState('')
   const [genres, setGenres] = useState<string[]>([]);
   useEffect(() => {
    const getmovie = async () => {
        if (!id) return;

        try {
            // Fetch all APIs in parallel
            const [res1, res2, res3, res4] = await Promise.all([
                fetch("/api/card"),
                fetch("/api/series"),
                fetch("/api/movies"),
                fetch("/api/tv")
            ]);

            // Convert responses to JSON
            const [card, series, movies, tv] = await Promise.all([
                res1.json(),
                res2.json(),
                res3.json(),
                res4.json()
            ]);

            // Combine all results into a single array
            const allMovies = [...(card || []), ...(series || []), ...(movies || []), ...(tv || [])];

            // Find the movie by ID
            const foundMovie = allMovies.find((m: Movie) => m.id.toString() === id);

            if (foundMovie) {
                setmovie(foundMovie);
                setReleaseDate(foundMovie.release_date || foundMovie.first_air_date || "");
                setGenres(foundMovie.genres || ["Action", "Sci-Fi"]);
            } else {
                console.log("Movie not found");
            }
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    };

    getmovie();
}, [id]);

    if (!movie) return <div>Loading...</div>;
    const rating = Math.round(movie.vote_average / 10 * 10) * 1;
    const date = new Date(releaseDate)
    const year = date.getFullYear()
    const hours = Math.floor(movie.runtime || 120 / 60); // Fallback to 120 minutes if runtime is undefined
    const minutes = (movie.runtime || 130) % 60; // Fallback to 
    const formattedRuntime = `${hours} hour ${minutes} minutes`;

    return(
     <section className="relative h-screen overflow-hidden">
       <div
         className="relative bg-cover bg-center h-screen"
         style={{
           backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
         }}
       >
       <div className="absolute top-0 left-0 w-full z-50">
           <Header />
         </div>
 
         {/* Overlay for readability */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>
 
         <div className="relative z-10 flex items-center  h-full text-white px-2 md:px-12 lg:pt-50 ">
           <div className="max-w-2xl w-full text-center md:text-left">
             <h1 className="text-3xl md:text-5xl font-bold mb-4">
               {movie.title || movie.name} <span className="opacity-80">({year})</span>
             </h1>
 
             {/* Movie Info Row */}
             <div className="flex flex-wrap justify-center md:justify-start items-center space-x-4 text-gray-300 mb-4">
               <p className="flex items-center  gap-2 text-lg">
                 <IoIosStar className="text-yellow-400 text-2xl relative top-[-2px]" />{" "}
                 <span className="font-semibold">{rating}/10</span>
               </p>
               <p className="flex items-center gap-2 text-lg">
                 <CiClock2 className="text-lg" /> <span>{formattedRuntime}</span>
               </p>
             </div>
 
             {/* Overview Section */}
             <h4 className="text-lg font-semibold mb-2">Overview</h4>
             <p className="text-md mb-6 text-gray-300 leading-relaxed max-w-xl line-clamp-3">
               {movie.overview.length > 150
                 ? movie.overview.substring(0, 150) + "..."
                 : movie.overview}
             </p>
 
             {/* Genres */}
             <h6 className="text-lg font-semibold mb-3 ">Genres</h6>
             <div className="flex flex-wrap gap-3 justify-center md:justify-start">
               {genres.length > 0 ? (
                 genres.map((genre: string, index: number) => (
                   <span
                     key={index}
                     className="px-4 py-2 rounded-lg border border-gray-300 bg-white/10 backdrop-blur-md text-sm font-semibold"
                   >
                     {genre}
                   </span>
                 ))
               ) : (
                 <p>No genres available</p>
               )}
             </div>
           </div>
         </div>
       </div>
     </section>
    )
}