import { useState } from "react";

import MovieCard from "./component/moviecard";
import MovieCardSeries from "./component/series";
import Sidebar from "./component/sidebar";
import Navbar from './component/navbar';

export default function Home() {
    // Correctly define the state as a boolean
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    return (
        <div className="bg-black">
            {/* Pass the state and setter function as props */}
            <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex justify-between">
                <div className="flex-grow pt-20">
                    <MovieCard isSidebarOpen={isSidebarOpen}  />
                    <MovieCardSeries isSidebarOpen={isSidebarOpen} />
                </div>
                {/* Conditionally render the Sidebar */}
                {isSidebarOpen && (
                    <div className="lg:pt-30 pt-40">
                        <Sidebar />
                    </div>
                )}
            </div>
        </div>
    );
}