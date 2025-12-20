import { useEffect, useState } from "react"
import LoginInputs from "../logic/LoginInputs"
import { supabase } from "../supabase-client"
import { Link, useNavigate } from "react-router-dom"
import SubmitBtn from "../ui/SubmitBtn"
import google from '/Icon.png'
import clsx from "clsx"

export default function Login(){
    const navigate = useNavigate()

    const [submitting, setSubmitting] = useState(false)
    const [googleLoad, setGoogleLoad] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    //Props passed in for Login Inputs
    const input = { email, setEmail, password, setPassword, setError}

    //Auto clear error after 3s
    useEffect(() => {
        if (!error) return

        const timer = setTimeout(() => setError(""), 3000)
        return () => clearTimeout(timer)
    }, [error])


    //Handles login
    const handleLogin = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        const { error } = await supabase.auth.signInWithPassword({ 
            email, 
            password 
        })
        
        if (error) {
            setError("Incorrect username or password. Please try again or create an account.")
        }
        setSubmitting(false)

        if (!error) {
            navigate("/dashboard", { replace: true })
        }
    }

    //Handle google
    const handleGoogle = async (e) => {
        e.preventDefault()
        setGoogleLoad(true)

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "http://localhost:5173/dashboard"
            }
        })

        if (error) {
        setError(error.message)
        setGoogleLoad(false)
        }
    }

    //Sign in with google button
    function GoogleBtn(){
        return(
            <button 
                type="button"
                onClick={handleGoogle} 
                disabled={googleLoad} 
                className={clsx(
                    "button-base",
                    "flex items-center gap-2 justify-center",
                    {
                        "bg-neutral-900/50 cursor-not-allowed inset-shadow-neutral-900/60 scale-98 font-light": googleLoad,
                    }
                )}
            >
                {googleLoad && (
                    <span className="size-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
                {!googleLoad && ( 
                    <>
                        <img src={google} />
                        Continue with google
                    </>
                )}
            </button>
        )
    }

    //Links display/UI
    function Links() {
        return (
            <div className="grid grid-cols-3 items-center w-full text-sm">
            <div className="text-right">
                <Link
                to="/forgot-password"
                className="text-neutral-100/20 hover:text-blue-500 hover:underline"
                >
                Forgot Password?
                </Link>
            </div>

            <div className="text-center text-neutral-100/20">
                |
            </div>

            <div className="text-left">
                <Link
                to="/signup"
                className="text-neutral-100/20 hover:text-blue-500 hover:underline"
                >
                Sign up
                </Link>
            </div>
            </div>
        )
    }

    return(
        <form 
            autoComplete="on" 
            onSubmit={handleLogin} 
            className="form-base"
        >
            <div 
                className="parent-base">
                <h1>Log into Ewan</h1>
                <LoginInputs {...input}/>
                {error && <p className="text-red-400 text-md">{error}</p>}
                <SubmitBtn variant="login" loading={submitting} />

                <div className="flex w-full items-center gap-2">
                <hr className="border-t border-white/20 mb-1 flex-1" />
                <p className="text-white/20">OR</p>
                <hr className="border-t border-white/20 mb-1 flex-1" />
                </div>

                <GoogleBtn />
                <Links />
            </div>
        </form>
    )
}