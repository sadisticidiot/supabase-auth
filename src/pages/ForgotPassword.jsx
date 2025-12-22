import { useEffect, useState } from "react";
import BaseInput from "../ui/BaseInput";
import SubmitBtn from "../ui/SubmitBtn";
import { supabase } from "../supabase-client";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

export default function ForgotPass(){
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [sent, setSent] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (loading) return
        const timer = setTimeout(() => setError(""), 5000)
        return () => clearTimeout(timer)
    }, [error])

    const validEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regex.test(email)) {
            setError("Invalid email address.")
            return false
        }
        return true
    }

    const handleHome = () => {
        navigate("/", { replace: true })
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
                 <motion.div 
                    className="parent-base"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <h1 className="font-bold">Email Sent!</h1>
                    <span>Check the link we sent to {email} for further instructions. This process may take a few minutes to conclude, thank you for your patience.</span>
                    <button onClick={handleHome} className="button-base">Go home</button>
                </motion.div>
            </div>
        )
    }
    return(
        <form className="form-base" onSubmit={handleForgot}>
             <motion.div 
                className="parent-base"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
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
                    error={error}

                />
                <AnimatePresence>
                {error && (
                    <motion.p
                    className="text-red-400 text-sm mt-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    >
                    {error}
                    </motion.p>
                )}
                </AnimatePresence>
                <SubmitBtn variant="forgot" loading={loading}/>
                <Link to="/login" className="text-neutral-100/20 hover:text-blue-500 hover:underline" >Remember password?</Link>
            </motion.div>
        </form>
    )
}