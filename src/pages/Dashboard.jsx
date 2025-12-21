import { useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import Header from "../ui/Header";

export default function Dashboard(){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

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
    }, []) 

    return(
        <div className="form-base flex flex-col items-center justify-center">
            <Header first_name={firstName} last_name={lastName}/>
            <div className="parent-base">
                <h1 className="text-center">Welcome, {lastName}!</h1>
            </div>
        </div>
    )
}