"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from "react";
import {getUserData} from "@/components/FetchData"
import { userTokenDataInterfaceI } from "@/interface/userTokenDataInterface";

interface ContextProps {
    userId: number;
    setUserId: Dispatch<SetStateAction<number>>;
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    loginStatus: boolean;
    setLoginStatus: Dispatch<SetStateAction<boolean>>;
    getUserDataWithToken :any;
}

// Create the context with default values
const UserData = createContext<ContextProps>({
    userId: -1,
    setUserId: () => -1,
    username: "",
    setUsername: () => "",
    loginStatus: false,
    setLoginStatus: () => false,
    getUserDataWithToken :(token:string)=>""
});

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [userId, setUserId] = useState<number>(-1);
    const [username, setUsername] = useState<string>("");
    const [loginStatus, setLoginStatus] = useState<boolean>(false);
    const getUserDataWithToken=async(token:string)=>{
        try {
            
            if (token) {
                const userData:{ success: boolean, data: userTokenDataInterfaceI } = await getUserData(token);
                
                if (typeof userData !== "string") {
                    setUsername(userData.data.username);
                    setUserId(userData.data.userId); // Make sure 'userId' matches your data structure
                    setLoginStatus(true);
                } else {
                    console.error("Error fetching user data:", userData);
                    setLoginStatus(false);
                }
            } else {
                console.log("No token found");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
    
    return (
        <UserData.Provider value={{ userId, setUserId, username, setUsername, loginStatus, setLoginStatus,getUserDataWithToken }}>
            {children}
        </UserData.Provider>
    );
};

export const useUserContext = () => useContext(UserData);
