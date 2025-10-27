export type UserType = {
    id: number;
    username: string;
    password: string;
    email: string;
};

export type UserPreferenceType = {
    id: number;
    userid: number;
    travelStyle: string;
    budget: string;
    favoriteFoods: string[];
    createdAt: Date;
    updatedAt: Date;
};

export type TripType = {
    id: number;
    userid: number;
    city: string;
    startDate: string;
    endDate: string;
    createdAt: Date;
    updatedAt: Date;
};

export type TripPlanType = {
    id: number;
    tripid: number;
    plan: any; // JSON object
    createdAt: Date;
    updatedAt: Date;
};