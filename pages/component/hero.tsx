
import { Header } from './header'

import { IoIosStar } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import { useEffect, useState } from 'react';


interface Movie {
    id:number,
    title: string,
    backdrop_path: string,
    overview:string,
    runtime?: number,
    vote_average: number,
    genres: string[]; 
}
export  default function Hero(){
    const [movie, setMovie] = useState<Movie>()
    const [releaseDate , setReleaseDate] = useState('')
    const [genres, setGenres] = useState<string[]>([]);


    useEffect(() => {
        const getMovie = async () => {
            try{
                const res = await fetch("/api/movies");
                const data = await res.json()
                setMovie(data)
                setReleaseDate(data.release_date)
                setGenres(data.genres || ['action', 'sci fi']);
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
    const rating = Math.round(movie.vote_average / 10 * 10) * 1;
    const date = new Date(releaseDate)
    const year = date.getFullYear()
    // const runtime = movie.runtime;
    const hours = Math.floor(400 / 60);
    const minutes = 400 % 60;
    const formattedRuntime = `${hours || 2} hour ${minutes || 30}  minutes`;
return(
    <section>
     
            <div className="relative bg-cover bg-center h-screen" style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
            <Header />
<div className="flex items-center justify-start h-full relative z-10 text-white text-start px-10 pt-40">
    <div>
    <div className="absolute inset-0">
    
      </div>
        <h4 className="text-md font-bold mb-4 text-white">{movie.title} ({(year)})</h4>
        <div className='mb-1'>
            <h4 className='text-white'>Overview</h4>
        
            <div className='flex'>
            <p className='p-1 flex items-center'><IoIosStar  className='star'/> <span className='rate px-2'>{rating}/10</span></p>
              <p className='p-1 flex items-center'> <CiClock2 /> <span className='run px-2'>{formattedRuntime}</span></p>

            </div>
        </div>
        <p className='text-md mb-1 max-w-4xl'>
{movie.overview}
        </p>
        <div className=''>
                <h6 className='mb-3 genre-head'>Genre</h6>
              <div className='genres  flex '>
              {genres && genres.length > 0 ? (
                  genres.map((genre: string, index: number) => (
              <div key={index} className="genre px-2   ">
               
                <p className='gap-9 border-1 p-2 border-white bg-transparent rounded-md px-5'> {genre}</p>
              </div>
           ))
        ) : (
          <p>No genres available</p>
        )}
          </div>
              </div>
    </div>
</div>
</div>
    </section>

)

} 