import { ReactNode, useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import React from "react";

interface MainLayoutProps {
    children: ReactNode;
  }
  
  interface ChildProps {
    isSidebarOpen: boolean;
  }

export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Pass isSidebarOpen to children
//   const childrenWithProps = React.Children.map(children, (child) => {
//     if (React.isValidElement(child)) {
//       return React.cloneElement(child, { isSidebarOpen });
//     }
//     return child;
//   });
  // Pass isSidebarOpen to children
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement<ChildProps>(child)) {
      return React.cloneElement(child, { isSidebarOpen });
    }
    return child;
  });


  return (
    <div className="">
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex justify-between">
        <div className="flex-grow pt-20">{childrenWithProps}</div>
        {isSidebarOpen && (
          <div className="pt-30">
            <Sidebar />
          </div>
        )}
      </div>
    </div>
  );
}