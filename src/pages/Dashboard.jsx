import { useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import Header from "../ui/Header";
import clsx from "clsx";

export default function Dashboard(){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [loading, setLoading] = useState(true)

    //Get names from Supabase on render
    useEffect(() => {
        const getLastName = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("last_name, first_name")
                .single()

            if (error) {
                console.error(error)
            } else {
                setFirstName(data.first_name)
                setLastName(data.last_name)
            }
        }
        getLastName()
        setLoading(false)
    }, []) 

    return(
        <div 
            className={clsx(
                "form-base flex flex-col items-center justify-center",
                {"animate-pulse": loading,},
            )}
        >
            <Header first_name={firstName} last_name={lastName}/>
            <div className="parent-base">
                <h1 className="text-center">Welcome, {lastName}!</h1>
            </div>
        </div>
    )
}