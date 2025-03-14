
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    try {

  
const apiKey = '1a4ccc89abfa206e97d2fc3f73b1e3e2';
 const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`);
 if(!response.ok){
    throw new Error("Failed to get movie")
 }
 const data = await response.json()
 const movie = data.results[0];
 res.status(200).json(movie)
} catch (error){
    console.log(error)
    res.status(500).json({error:"Failed to get movie"})
}
}