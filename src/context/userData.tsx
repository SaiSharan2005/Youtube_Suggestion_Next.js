
'use client';

import { redirect } from 'react-router-dom';
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";
import GetUserData from "@/hooks/getUserData"

interface ContextProps {
    userId: number,
    setUserId: Dispatch<SetStateAction<number>>,
    username: string,
    setUsername: Dispatch<SetStateAction<string>>
}

const UserData = createContext<ContextProps>({
    userId: -1,
    setUserId: (): number => -1,
    username: "",
    setUsername: (): string => ""
})

export const UserDataProvider = async({ children }:any) => {
    const [userId, setUserId] = useState<number>(-1);
    const [username, setUsername] = useState<string>("");
    let userData = await  GetUserData("1ed0df2c60a0a129cae47bf73341d00348d30423")
    // let userData = await  GetUserData(await localStorage.getItem("token"))
    setUsername(userData.username)
    setUserId(userData.userid)
    return (
        <UserData.Provider value={{ userId, setUserId, username, setUsername }}>
            {children}
        </UserData.Provider>
    )
}

export const useUserContext = () => useContext(UserData);