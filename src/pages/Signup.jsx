import { useEffect, useState } from "react"
import SignupInputs from "../logic/SignupInputs"
import { supabase } from "../supabase-client"
import SubmitBtn from "../ui/SubmitBtn"
import verifyImg from "/Icon.png"
import AuthForm from "../logic/AuthForm"

export default function Signup(){    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState("")
    const [resending, setResending] = useState(false)

    //Props passed down for inputs
    const input = { 
        firstName, setFirstName, lastName, setLastName,
        email, setEmail, 
        password, setPassword, confirmPass, setConfirmPass,
        setError
    }

    //Auto clear error after 6s
    useEffect(() => {
        if (!error) return

        const timer = setTimeout(() => setError(""), 6000)
        return () => clearTimeout(timer)
    }, [error])

    //VALIDATIONS
    const validNames = () => {
        const nameRegex = /^[A-Z][a-zA-Z-' ]*$/ 

        if (!firstName.trim() || !lastName.trim()) {
            setError("First and last name are required.")
            return false
        } else if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            setError("Names must start with a capital letter and cotain only letters.")
            return false
        }
        return true
    }
    const validEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regex.test(email)) {
            setError("Invalid email address.")
            return false
        }
        return true
    }
    const validPassword = () => {
        if (password.length === 0) {
            setError("Invalid password. Password cannot be empty.")
            return false
        } else if (password.length < 8) {
            setError("Password is too short. Must be at least 8 characters.")
            return false
        }
        return true
    }
    const validConfirmPass = () => {
        if (password !== confirmPass) {
            setError("Password do not match.")
            return false
        }
        return true
    }

    //Handle signup
    const handleSignup = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        if (!validNames() || !validEmail() || !validPassword() || !validConfirmPass()) {
            setLoading(false)
            return
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/login`,
                data: {
                    first_name: firstName,
                    last_name: lastName,
                },   
            }
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }
        setLoading(false)
        setSubmitted(true)
    }

    //Handle resend
    const handleResend = async () => {
        setResending(true)
        setMessage("")

        const { error } = await supabase.auth.resend({
            type: "signup",
            email,
        })

        if (error) {
            setMessage(error.message)
            setResending(false)
            return
        } else {
            setMessage("Verification email resent.")
        }
        setResending(false)
    }

    function Verification(){
        return(
            <div className="form-base">
                <div className="parent-base">
                    <img src={verifyImg} />
                    <h1>Verify your email</h1>
                    <span>Click the link sent to {email}.</span>
                    <button 
                        onClick={handleResend} 
                        disabled={resending} 
                        className="button-base"
                    >
                        {resending ? "Resending..." : "Resend verification email."}
                    </button>
                    {message && <p>{message}</p>}
                </div>
            </div>
        )
    }


    return(
        <>
            {submitted
                ? (
                <Verification />
                ) : (
                    <form onSubmit={handleSignup} autoComplete="on">
                    <AuthForm emailLink="/login" loading={loading}>
                        <h1>Create your account</h1>
                        <SignupInputs {...input} />
                        {error && <p className="text-red-400">{error}</p>}
                        <SubmitBtn variant="signup" loading={loading} />
                    </AuthForm>
                    </form>
                )}


        </>
    )
}