import { ReactNode, useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import React from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Pass isSidebarOpen to children
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { isSidebarOpen });
    }
    return child;
  });

  return (
    <div className="bg-black">
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