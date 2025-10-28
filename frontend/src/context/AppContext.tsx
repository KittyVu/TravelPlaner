import { useState, useContext, createContext } from "react";
import { useEffect } from "react";

const AppContext = createContext(null);

export function AppContextProvider({ children }) {
    const [username, setUsername] = useState("");
    const [userid, setUserid] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("http://localhost:5000/api/user/info", {
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
    return useContext(AppContext);
}