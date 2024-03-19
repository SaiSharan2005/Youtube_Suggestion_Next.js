"use client"
import { createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from "react";
import GetUserData from "@/hooks/getUserData";

interface UserDataI {
    userId: number;
    username: string;
}

interface ContextProps {
    userId: number;
    setUserId: Dispatch<SetStateAction<number>>;
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    loginStatus:boolean
    setLoginStatus:Dispatch<SetStateAction<boolean>>
}

const UserData = createContext<ContextProps>({
    userId: -1,
    setUserId: (): number => -1,
    username: "",
    setUsername: (): string => "",
    loginStatus:false,
    setLoginStatus: (): boolean =>false

});

export const UserDataProvider = ({ children }: any) => {
    const [userId, setUserId] = useState<number>(-1);
    const [username, setUsername] = useState<string>("");
    const [loginStatus, setLoginStatus] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await GetUserData(localStorage.getItem("token"));
                if (typeof userData !== "string") {
                    setUsername(userData.username);
                    setUserId(userData.id); // Adjusted property name
                    setLoginStatus(true);
                } else {
                    console.error("Error fetching user data:", userData);
                    setLoginStatus(false);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();

    }, []); 
    return (
        <UserData.Provider value={{ userId, setUserId, username, setUsername ,loginStatus,setLoginStatus}}>
            {children}
        </UserData.Provider>
    );
};

export const useUserContext = () => useContext(UserData);
