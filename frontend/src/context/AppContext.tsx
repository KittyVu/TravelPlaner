import { useState, useContext, createContext } from "react";
import { useEffect } from "react";
import type { AppContextType } from "../libs/types";

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [username, setUsername] = useState<string>("");
    const [userid, setUserid] = useState<number | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("https://travelplaner.onrender.com/api/user/info", {
                    credentials: "include",
                });
                const data = await res.json(); console.log("Auth check data:", data);
                if (data.success) {
                    setUsername(data.user.username);
                    setUserid(data.user.id);
                    setIsLoggedIn(true);
                }
            } catch (err) {
                console.error("Auth check failed", err);
            }
        })();
    }, []);

    return (
        <AppContext.Provider value={{ username, setUsername, userid, setUserid, isLoggedIn, setIsLoggedIn }}>
            {children}
        </AppContext.Provider>
    );
}

export function useMyContext() {
    const context = useContext(AppContext);
    if (!context) throw new Error("useMyContext must be used within AppContextProvider");
    return context;
}