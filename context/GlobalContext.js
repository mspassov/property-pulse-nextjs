'use client';
import { useState, createContext, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import getUnreadCount from "@/app/actions/getUnreadCount";

const GlobalContext = createContext();

export const GlobalProvider = ({children}) =>{
    const [unreadCount, setUnread] = useState(0);

    const {data:session} = useSession();

    useEffect(() =>{
        if(session && session.user){
            const getCount = async () =>{
                const count = await getUnreadCount();
                if(count){
                    setUnread(count);
                }
            }

            getCount();
        }
    }, [getUnreadCount, session])

    return (
        <GlobalContext.Provider value={{
            unreadCount,
            setUnread
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

//Create a custom hook to use this context
export const useGlobalContext = () =>{
    return useContext(GlobalContext);
}