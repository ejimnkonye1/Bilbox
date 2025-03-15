
import Hero from "./component/hero";
import MovieCard from "./component/moviecard";
import MovieCardSeries from "./component/series";
import Sidebar from "./component/sidebar";
import Navbar from './component/navbar'


export default function Home() {
  return (
   <div className="bg-black">
    {/* <Hero /> */}
    <Navbar />
    <div className=" flex justify-between">
<div className=" flex-grow pt-20">
<MovieCard  />
<MovieCardSeries />
</div>
    <div className="pt-30 ">
    <Sidebar />
    </div>
    </div>

  

    </div>
  );
}
