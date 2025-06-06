

import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    try {


 const response = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.ApiKey}&with_genres=16`);
 
 if(!response.ok){
    throw new Error("Failed to get movie")
 }
 const data = await response.json()
 const movie = data.results.slice(0,10);
 res.status(200).json(movie)
} catch (error){
    console.log(error)
    res.status(500).json({error:"Failed to get movie"})
}
}