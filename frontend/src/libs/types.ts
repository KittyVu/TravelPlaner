export type AppContextType = {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    userid: number | null;
    setUserid: React.Dispatch<React.SetStateAction<number | null>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export type TripPlanProps = {
    plan: any;
    city?: string;
}

export type TripType = {
    id: number;
    userid: number;
    city: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
}

export const API_URL = import.meta.env.VITE_API_URL;