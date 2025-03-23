import { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "@/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useUser } from "./usercontext";


interface Movie {
  id: number;
  title: string;
  name:string
  poster_path: string;
  vote_average: number;
}

interface WishlistContextType {
  wishlist: Movie[];
  addToWishlist: (movie: Movie) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Movie[]>([]);
  const { user } = useUser(); 

  // Fetch wishlist from Firestore on load
  useEffect(() => {
    if (!user) return;

    const fetchWishlist = async () => {
      try {
        const wishlistRef = collection(firestore, "wishlist", user.id, "movies");
        const snapshot = await getDocs(wishlistRef);
        const movies = snapshot.docs.map((doc) => doc.data() as Movie);
        setWishlist(movies);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [user]);

  // Function to add a movie to wishlist
  const addToWishlist = async (selectedMovie: Movie) => {
    if (!user) {
      alert("Log in to add a movie to wishlist");
      return;
    }

    const movieRef = doc(collection(firestore, "wishlist", user.id, "movies"), `${selectedMovie.id}`);

    // Check if movie is already in wishlist
    const alreadyInWishlist = wishlist.some((item) => item.id === selectedMovie.id);
    
    if (!alreadyInWishlist) {
      try {
        await setDoc(movieRef, {
          userId: user.id,
          movieId: selectedMovie.id,
          title: selectedMovie.title || selectedMovie.name,
          poster_path: selectedMovie.poster_path,
          vote_average: selectedMovie.vote_average,
        });

        setWishlist([...wishlist, selectedMovie]);
        console.log(`Added ${selectedMovie.title || selectedMovie.name} to wishlist`);
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    } else {
      console.log(`${selectedMovie.title || selectedMovie.name} is already in the wishlist`);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
