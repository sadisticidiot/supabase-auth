import { useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import Header from "../ui/Header";
import clsx from "clsx";
import { motion } from "motion/react"

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

{/*function TestMotionInput() {
  const handleBlur = () => {
    setError(value.trim() === "");
  };

    const [value, setValue] = useState("");
    const [error, setError] = useState(false);

  return (
    <div className="w-64 mx-auto mt-10">
      <motion.input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        placeholder="Type something..."
        className="input-base w-full p-2 rounded outline-none border-2"
        animate={{
          borderColor: error ? "#f87171" : "#3b82f6", 
          scale: error ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      {error && <p className="text-red-500 mt-1 text-sm">This field is required</p>}
    </div>
  );
}*/}

    return(
        <div 
            className={clsx(
                "form-base flex flex-col items-center justify-center",
            )}
        >
            <Header first_name={firstName} last_name={lastName}/>
            <div 
                className={clsx(
                    "parent-base",
                    {"animate-pulse": loading,},
                )}
            >
                <h1 className="text-center">Welcome, {lastName}!</h1>
            </div>
        </div>
    )
}