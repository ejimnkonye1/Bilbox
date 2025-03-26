
import { NextApiRequest, NextApiResponse } from "next";
// Define the interfaces
interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    type: "movie"; // This will help identify the type
  }
  type Result = Movie 
export default async function handler(req:NextApiRequest, res:NextApiResponse){
    try {
        const fetchAllPages = async (url: string): Promise<Result[]> => {
            let page = 1;
            let totalPages = 1;
            let allResults: Result[] = [];
      
            while (page <= totalPages) {
              const response = await fetch(`${url}&page=${page}`);
              if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
      
              const data = await response.json();
              totalPages = data.total_pages > 10 ? 10 : data.total_pages; // Limit to 10 pages max to avoid hitting API limits
              allResults = [...allResults, ...data.results];
              page++;
            }
            
            return allResults;
          };
        const movieCategories = ["popular", "top_rated", "now_playing", "upcoming"];

    // Fetch all movie data
    const allMovies = await Promise.all(
        movieCategories.map((category) =>
          fetchAllPages(`https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.ApiKey}`)
        )
      );
      // Flatten arrays & remove duplicates
      const movies: Movie[] = allMovies.flat().map((m) => ({ ...m, type: "movie" } as Movie));

      const Results: Result[] = [...movies];

      res.status(200).json(Results);
} catch (error){
    console.log(error)
    res.status(500).json({error:"Failed to get movie"})
}
}