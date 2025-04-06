

import { NextApiRequest, NextApiResponse } from "next";
// Define the interfaces
interface TVShow {
    id: number;
    name: string;
    overview: string;
    first_air_date: string;
    poster_path: string;
    type: "tv"; // This will help identify the type
  }
  type Result = TVShow
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
          const tvCategories = ["popular", "top_rated", "on_the_air", "airing_today"];
     
    // Fetch all movie data
    const allTVShows = await Promise.all(
        tvCategories.map((category) =>
          fetchAllPages(`https://api.themoviedb.org/3/tv/${category}?api_key=${process.env.ApiKey}`)
        )
      );
      // Flatten arrays & remove duplicates
      const tvShows: TVShow[] = allTVShows.flat().map((t) => ({ ...t, type: "tv" } as TVShow));

      const Results: Result[] = [...tvShows];

      res.status(200).json(Results);
} catch (error){
    console.log(error)
    res.status(500).json({error:"Failed to get movie"})
}
}