import clsx from "clsx"
import { supabase } from "../supabase-client"

export default function GoogleBtn({ setError, loading, googleLoad, setGoogleLoad }){
    const handleGoogle = async (e) => {
        e.preventDefault()
        setError("")
        setGoogleLoad(true)

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin
            }
        })

        if (error) {
        setError(error.message)
        setGoogleLoad(false)
        }
    }

    return(
        <button
            onClick={handleGoogle}
            type="button"
            disabled={loading || googleLoad}
            className={clsx(
                "button-base p-2",
                "flex items-center gap-2 justify-center",                    
                {
                    "cursor-default border-none bg-neutral-950 text-white/50": googleLoad || loading,
                    "cursor-default bg-neutral-950 cursor-not-allowed": loading,
                }
            )}
        >
            {googleLoad && (
                <span className="spinner" />
            )}
                Continue with Google
        </button>
    )
}