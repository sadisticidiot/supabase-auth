import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../logic/AuthProvider";
import { useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import { motion } from "motion/react";

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
  
  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin
      }
    })

    if (error) {
      setError(error.message)
    }
  }
 
  return(
    <>
      <div className="block md:hidden w-full">
        <motion.div 
          className="flex flex-col fixed w-full inset-0 p-3 py-5 items-center justify-end bg-linear-to-b from-black to-neutral-900/98"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex-1 flex justify-center items-center">
            <h1 className="text-[60px] text-white/98">Saiki</h1>
          </div>

          <div className="w-full flex flex-col gap-2">
            <Link to="/login" className="button-base bg-neutral-950 rounded-md text-neutral-100">Log in</Link>
            <Link to="/signup" className="button-base bg-neutral-100 rounded-md text-neutral-950 border-1">Sign up</Link>
          </div>
            {error && <p className="text-red-400">{error}</p>}
        </motion.div>
      </div>

      <div className="hidden md:block w-full">
        <div className="form-base">
          <motion.div 
            className="parent-base"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h1>Welcome, nerd.</h1>
            
            <Link to="/login" className="button-base">Log in</Link>
            <Link to="/signup" className="button-base">Sign up</Link>

            <div className="flex w-full items-center gap-2">
              <hr className="border-t border-white/20 mb-1 flex-1" />
              <p className="text-white/20">OR</p>
              <hr className="border-t border-white/20 mb-1 flex-1" />
            </div>

            <button onClick={handleGoogle} className="button-base flex gap-2 items-center justify-center">
              Continue with google
            </button>
            {error && <p className="text-red-400">{error}</p>}
          </motion.div>
        </div>
      </div>
    </>
  )
}