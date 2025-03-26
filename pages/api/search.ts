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

interface TVShow {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  poster_path: string;
  type: "tv"; // This will help identify the type
}

type CombinedResult = Movie | TVShow;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const fetchAllPages = async (url: string): Promise<CombinedResult[]> => {
      let page = 1;
      let totalPages = 1;
      let allResults: CombinedResult[] = [];

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

    // **Fetch Movies from different categories**
    const movieCategories = ["popular", "top_rated", "now_playing", "upcoming"];
    const tvCategories = ["popular", "top_rated", "on_the_air", "airing_today"];

    // Fetch all movie data
    const allMovies = await Promise.all(
      movieCategories.map((category) =>
        fetchAllPages(`https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.ApiKey}`)
      )
    );

    // Fetch all TV data
    const allTVShows = await Promise.all(
      tvCategories.map((category) =>
        fetchAllPages(`https://api.themoviedb.org/3/tv/${category}?api_key=${process.env.ApiKey}`)
      )
    );

    // Flatten arrays & remove duplicates
    const movies: Movie[] = allMovies.flat().map((m) => ({ ...m, type: "movie" } as Movie));
    const tvShows: TVShow[] = allTVShows.flat().map((t) => ({ ...t, type: "tv" } as TVShow));

    // Combine Movies + TV Shows
    const combinedResults: CombinedResult[] = [...movies, ...tvShows];

    res.status(200).json(combinedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movies and TV shows" });
  }
}