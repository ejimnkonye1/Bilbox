import { ReactNode, useEffect, useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import React from "react";
import SearchPage from "./searchpage";

interface MainLayoutProps {
    children: ReactNode;
  }
  
  interface ChildProps {
    isSidebarOpen: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void
    
  }

export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  // Effect to set initial sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is greater than or equal to 1024px (lg breakpoint)
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true); // Open sidebar on large screens
      } else {
        setIsSidebarOpen(false); // Close sidebar on small screens
      }
    };

    // Set initial state on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement<ChildProps>(child)) {
      return React.cloneElement(child, { isSidebarOpen, searchQuery });
    }
    return child;
  });


  return (
    <>
      
    
       <div className="">
      <Navbar isSidebarOpen={isSidebarOpen}
       setIsSidebarOpen={setIsSidebarOpen}
       searchQuery={searchQuery} 
       setSearchQuery={setSearchQuery}
       />
      <div className="flex justify-between">
        <div className="flex-grow pt-20">
          
        {searchQuery ? <SearchPage searchQuery={searchQuery} isSidebarOpen={isSidebarOpen} /> : childrenWithProps}
          
          </div>
        {isSidebarOpen && (
          <div className="pt-30">
            <Sidebar />
          </div>
        )}
      </div>
    </div>
  
    </>
   
  );
}