import clsx from "clsx"

export default function GoogleBtn({ loading, submitting, googleLoad, setGoogleLoad }){
    const handleGoogle = async (e) => {
        e.preventDefault()
        setError("")
        setGoogleLoad(true)

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/dashboard`
            }
        })

        if (error) {
        setError(error.message)
        setGoogleLoad(false)
        }
    }

    function GoogleBtn(){
        return(
            <button
                onClick={handleGoogle}
                type="button"
                disabled={submitting || loading || googleLoad}
                className={clsx(
                    "button-base p-2",
                    "flex items-center gap-2 justify-center",
                    {
                        "cursor-default border-none bg-neutral-950 text-white/50": googleLoad,
                        "cursor-default bg-neutral-950 cursor-not-allowed": submitting || loading,
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

    return <GoogleBtn />
}