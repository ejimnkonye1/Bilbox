

import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    try {

 const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.ApiKey}&page=2`);
 
 if(!response.ok){
    throw new Error("Failed to get movie")
 }
 const data = await response.json()
 const movie = data.results;
 res.status(200).json(movie)
} catch (error){
    console.log(error)
    res.status(500).json({error:"Failed to get movie"})
}
}