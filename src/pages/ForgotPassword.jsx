import { useState } from "react";
import BaseInput from "../ui/BaseInput";
import SubmitBtn from "../ui/SubmitBtn";
import { supabase } from "../supabase-client";

export default function ForgotPass(){
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [sent, setSent] = useState(false)

    const validEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regex.test(email)) {
            setError("Invalid email address.")
            return false
        }
        return true
    }

    const handleForgot = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        if (!validEmail()){
            setLoading(false)
            return
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }
        setLoading(false)
        setSent(true)
    }

    if (sent){
        return(
            <div className="form-base">
                <div className="parent-base">
                    <h1>Email Sent!</h1>
                    <span>Check the link we sent to {email} for further instructions.</span>
                </div>
            </div>
        )
    }
    return(
        <form className="form-base" onSubmit={handleForgot}>
            <div className="parent-base">
                <h1>Forgot Password</h1>
                <span className="text-white/40">Resetting your password will send a link to your email. Make sure to set a new, more memorable, and strong password this time.</span>
                <BaseInput 
                    value={email} 
                    onChange={(e) => {
                        setEmail(e.target.value) 
                        setError("")
                    }} 
                    type="email" 
                    placeholder="Email or phone"
                    name="username"
                    autoComplete="username"

                />
                {error && <p className="text-red-400">{error}</p>}
                <SubmitBtn variant="forgot" loading={loading}/>
            </div>
        </form>
    )
}