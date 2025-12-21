import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../logic/AuthProvider";
import { useEffect, useState } from "react";
import { supabase } from "../supabase-client";

export default function Landing(){
  const [error, setError] = useState()

  const { session } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (session) {
      navigate("/dashboard", { replace: true })
    }
  }, [])

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (error) {
      setError(error.message)
    }
  }
  
  return(
    <div className="form-base">
      <div className="parent-base">
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
      </div>
    </div>
  )
}