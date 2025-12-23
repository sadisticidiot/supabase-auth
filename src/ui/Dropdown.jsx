import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { supabase } from "../supabase-client"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Dropdown({ setIsDropdown }){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [loading, setLoading] = useState(true)


    const handleSignOut = async () => {
        await supabase.auth.signOut()
        setIsDropdown(false)
    }

   //Get names from Supabase on render
    const getNames = async () => {
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
        setLoading(false)
    }

    useEffect(() => {
        getNames()
    }, [])

function Fetching(){
    return (
        <div className="parent-base p-1 h-40 w-30 bg-neutral-800 gap-1">
            <div className="parent-base shadow-none w-full animate-pulse" />
            <div className="parent-base flex-1 shadow-none w-full animate-pulse" />
        </div>
    )
}

    return(
            <motion.div 
                className="parent-base p-1 absolute top-12 w-30 h1 bg-neutral-800"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0}}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
            >
                {loading ? (
                    <Fetching />
                ) : (
                    <>
                        <div className="items-start flex flex-col pb-0 border-none rounded-sm button-base bg-neutral-800 shadow-none cursor-pointer inset-shadow-none hover:bg-neutral-700">
                            <button className="text-xl mb-2 cursor-pointer">
                                {firstName} {lastName}
                            </button>

                            <span className="text-neutral-100/20 font-normal">Edit Profile</span>
                        </div>

                        <hr className="border-t w-full border-neutral-100/20" />

                        <button
                            className="button-base border-none rounded-sm flex items-center justify-center gap-2 hover:bg-neutral-700 pr-2 py-2" 
                            onClick={handleSignOut}
                        >
                            <ArrowLeftStartOnRectangleIcon className="size-8"/>
                            Log Out
                        </button>
                    </>
                )}
        </motion.div>
    )
}