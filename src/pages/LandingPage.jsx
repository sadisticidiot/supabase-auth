import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../logic/AuthProvider";
import { useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import google from '/Icon.png'

export default function Landing(){
  const [error, setError] = useState()

  const { session, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && session) {
      navigate("/dashboard", { replace: true })
    }
  }, [session, loading])

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/dashboard"
      }
    })

    if (error) {
      setError(error.message)
    }
  }

  if (loading) {
    return(
      <div className="form-base">
        <div className="parent-base">
          <h1>Loading... please wait.</h1>
        </div>
      </div>
    )
  }
  
  return(
    <div className="form-base">
      <div className="parent-base">
        <h1>Welcome!</h1>
        
        <Link to="/login" className="button-base">Log in</Link>
        <Link to="/signup" className="button-base">Sign up</Link>

        <div className="flex w-full items-center gap-2">
          <hr className="border-t border-white/20 mb-1 flex-1" />
          <p className="text-white/20">OR</p>
          <hr className="border-t border-white/20 mb-1 flex-1" />
        </div>

        <button onClick={handleGoogle} className="button-base flex gap-2 items-center justify-center">
          <img src={google} />
          Continue with google
        </button>
        {error && <p className="text-red-400">{error}</p>}
      </div>
    </div>
  )
}