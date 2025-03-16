import Link from "next/link";
import {
    FaHome,
    FaTv,
    FaFilm,
    FaHeart,
    FaDragon,
  
} from "react-icons/fa";

export default function Sidebar() {
    return (
        <div className="fixed inset-0 bg-black lg:w-[18%] w-70 p-8 border-r  transform transition-transform duration-300 ease-in-out">
            {/* Sidebar Menu */}
            <ul className="flex flex-col justify-start items-start lg:pt-20 pt-30 space-y-2">
                {/* Home (Active State) */}
                <li className="w-full">
                    <Link
                        className="text-white flex items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300"
                        href={''}
                    >
                        <FaHome size={24} className="text-white mr-3" />
                        <span className="text-md font-medium">Home</span>
                    </Link>
                </li>

                {/* Other Menu Items */}
                <li className="w-full">
                    <Link
                        className="text-gray-400 flex items-center p-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
                        href={''}
                    >
                        <FaTv size={24} className="text-gray-400 mr-3" />
                        <span className="text-md">TV Show</span>
                    </Link>
                </li>
                <li className="w-full">
                    <Link
                        className="text-gray-400 flex items-center p-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
                        href={''}
                    >
                        <FaFilm size={24} className="text-gray-400 mr-3" />
                        <span className="text-md">Movies</span>
                    </Link>
                </li>
                <li className="w-full">
                    <Link
                        className="text-gray-400 flex items-center p-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
                        href={''}
                    >
                        <FaHeart size={24} className="text-gray-400 mr-3" />
                        <span className="text-md">Wishlist</span>
                    </Link>
                </li>
                <li className="w-full">
                    <Link
                        className="text-gray-400 flex items-center p-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
                        href={''}
                    >
                        <FaDragon size={24} className="text-gray-400 mr-3" />
                        <span className="text-md">Anime</span>
                    </Link>
                </li>
            </ul>

            {/* Footer Section */}
            <div className="absolute bottom-10 left-8 right-8">
    <ul className="flex flex-row flex-wrap gap-4"> {/* Use gap-4 for consistent spacing */}
        {/* Each item takes 50% width */}
        <li className="w-[calc(50%-0.5rem)]"> {/* Adjust width and gap */}
            <Link
                className="text-gray-400 flex items-center text-sm p-2 rounded-lg hover:text-gray-800 transition-all duration-300"
                href={''}
            >
                WhatsApp
            </Link>
        </li>
        <li className="w-[calc(50%-0.5rem)]">
            <Link
                className="text-gray-400 flex items-center text-sm p-2 rounded-lg hover:text-gray-800 transition-all duration-300"
                href={''}
            >
                Telegram
            </Link>
        </li>
        <li className="w-[calc(50%-0.5rem)]">
            <Link
                className="text-gray-400 flex items-center text-sm p-2 rounded-lg hover:text-gray-800 transition-all duration-300"
                href={''}
            >
                Facebook
            </Link>
        </li>
        <li className="w-[calc(50%-0.5rem)]">
            <Link
                className="text-gray-400 flex items-center text-sm p-2 rounded-lg hover:text-gray-800 transition-all duration-300"
                href={''}
            >
                Instagram
            </Link>
        </li>
    </ul>
</div>
        </div>
    );
}