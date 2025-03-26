import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Loader from "./component/loader";
import { UserProvider } from "../context/usercontext";
import { WishlistProvider } from "../context/WishlistContext";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 8000); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
<UserProvider>
  <WishlistProvider>


    {loading ?(
      <Loader />
    ): (
      <Component {...pageProps} />
    )}
      </WishlistProvider>
    </UserProvider>
    
   
    </>
  )

}
