import Link from "next/link";
import {
    FaHome,
    FaTv,
    FaFilm,
    FaHeart,
    FaDragon,
    FaWhatsapp,
    FaTelegram,
    FaFacebook,
} from "react-icons/fa";

export default function Sidebar() {
    return (
        <div className="fixed inset-0 bg-black w-[18%] p-10 border border-white">
            {/* Sidebar Menu */}
            <ul className="flex flex-col justify-start items-start pt-20">
                <li className="w-full hover:border-l-4 hover:border-white hover:pl-2 transition-all duration-300">
                    <Link className="text-white flex items-center mb-3" href={''}>
                        <FaHome size={30} className="text-white pr-3" /> Home
                    </Link>
                </li>
                <li className="w-full hover:border-l-4 hover:border-white hover:pl-2 transition-all duration-300">
                    <Link className="text-white flex items-center mb-3" href={''}>
                        <FaTv size={30} className="text-white pr-3" /> TV Show
                    </Link>
                </li>
                <li className="w-full hover:border-l-4 hover:border-white hover:pl-2 transition-all duration-300">
                    <Link className="text-white flex items-center mb-3" href={''}>
                        <FaFilm size={30} className="text-white pr-3" /> Movies
                    </Link>
                </li>
                <li className="w-full hover:border-l-4 hover:border-white hover:pl-2 transition-all duration-300">
                    <Link className="text-white flex items-center mb-3" href={''}>
                        <FaHeart size={30} className="text-white pr-3" /> Wishlist
                    </Link>
                </li>
                <li className="w-full hover:border-l-4 hover:border-white hover:pl-2 transition-all duration-300">
                    <Link className="text-white flex items-center mb-3" href={''}>
                        <FaDragon size={30} className="text-white pr-3" /> Anime
                    </Link>
                </li>
            </ul>

            {/* Footer Section */}
            <div className="absolute bottom-10 left-10">
                <ul className="flex flex-col space-y-2">
                    <li>
                        <Link className="text-white flex items-center text-sm" href={''}>
                            <FaWhatsapp size={20} className="text-white pr-2" /> WhatsApp
                        </Link>
                    </li>
                    <li>
                        <Link className="text-white flex items-center text-sm" href={''}>
                            <FaTelegram size={20} className="text-white pr-2" /> Telegram
                        </Link>
                    </li>
                    <li>
                        <Link className="text-white flex items-center text-sm" href={''}>
                            <FaFacebook size={20} className="text-white pr-2" /> Facebook
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}