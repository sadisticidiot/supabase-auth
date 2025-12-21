import { useEffect, useState } from "react"
import LoginInputs from "../logic/LoginInputs"
import { supabase } from "../supabase-client"
import { useNavigate } from "react-router-dom"
import SubmitBtn from "../ui/SubmitBtn"
import AuthForm from "../logic/AuthForm"

export default function Login(){
    const navigate = useNavigate()

    const [submitting, setSubmitting] = useState(false)
    const [googleLoad, setGoogleLoad] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    //Props passed in for Login Inputs
    const input = { email, setEmail, password, submitting, setPassword, setError}

    //Auto clear error after 5s
    useEffect(() => {
        if (!error) return

        const timer = setTimeout(() => setError(""), 5000)
        return () => clearTimeout(timer)
    }, [error])


    //Handles login
    const handleLogin = async (e) => {
        e.preventDefault()
        setError("")
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

    return(
        <form onSubmit={handleLogin} autoComplete="on">
            <AuthForm 
                emailLink="/signup"
                submitting={submitting}
                googleLoad={googleLoad}
                setGoogleLoad={setGoogleLoad}
            >
                <h1>Log into Ewan</h1>
                <LoginInputs {...input} />
                {error && <p className="text-red-400">{error}</p>}
                <SubmitBtn variant="login" loading={submitting} />
            </AuthForm>
        </form>
    )
}