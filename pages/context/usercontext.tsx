import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type User = {
    id: string;
    email: string;
  };
  
interface UserContextType {
    user: User | null;

  }
  interface UserProviderProps {
    children: ReactNode;
}
  const UserContext = createContext<UserContextType | null>(null)
export function UserProvider ({children}: UserProviderProps){
       const [user, setUser] = useState<User | null>(null);

       useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setUser({
              id: currentUser.uid,
              email: currentUser.email || "",
            });
          } else {
            setUser(null);
          }
        });
    
        return () => unsubscribe();
      }, []);
      
      return <UserContext.Provider value={{user}}>{children}</UserContext.Provider>
}

export  function useUser(){

const context = useContext(UserContext);
if(!context){
    throw new Error("useUser must be used within a UserProvider");
}
return context
}