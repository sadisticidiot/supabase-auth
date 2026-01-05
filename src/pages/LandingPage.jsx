import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../logic/AuthProvider";
import { useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import { motion } from "motion/react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Landing(){
  const [error, setError] = useState()

  const { loading, session } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (session) {
      navigate("/dashboard", { replace: true })
    }
  }, [session])

  if (loading) {
    return(
      <div className="form-base flex-col">
        <h1>Loading... thank you for your patience</h1>
        <span className="spinner size-10"></span>
      </div>
    )
  }
 
  return(
    <>
      <div className="block md:hidden w-full">
        <div 
          className="flex flex-col fixed w-full inset-0 p-3 py-5 items-center justify-center bg-[url('/maka_albarn.webp')] bg-cover bg-center"
        >
          <div className="absolute inset-0 bg-linear-to-b from-neutral-900/95 to-black/95" />
          <div className="flex-1 flex justify-center items-center">
            <h1 className="text-[60px] text-white/98 z-3">basta kay fizz 'to</h1>
          </div>

          <div className="w-full flex flex-col gap-2 z-3">
            <Link to="/login" className="button-base py-3 bg-neutral-950 rounded-md text-neutral-100 z-3">Log in</Link>
            <Link to="/signup" className="button-base py-3 bg-neutral-100 rounded-md text-neutral-950 border-1 z-3">Sign up</Link>
          </div>
            {error && <p className="text-red-400">{error}</p>}
        </div>
      </div>

      <div className="hidden md:block w-full">
        <div className="form-base">
          <motion.div 
            className="parent-base"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h1>basta kay fizz 'to</h1>
            
            <Link to="/login" className="button-base">Log in</Link>
            <Link to="/signup" className="button-base">Sign up</Link>
            {error && <p className="text-red-400">{error}</p>}
          </motion.div>
        </div>
      </div>
    </>
  )
}