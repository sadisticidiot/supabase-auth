import { Link } from "react-router-dom";
import GoogleBtn from "../ui/GoogleBtn";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import MobileGoogle from "./MobileGoogle";

export default function MobileAuth({ children, error, setError, emailLink, loading, googleLoad, setGoogleLoad }){
    return(
        <motion.div 
            className="form-base flex-col p-5 justify-between"
            initial={{ scale: 1.02 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut"}}
        >
            {children}

            <div className="flex w-full items-center gap-2">
                <hr className="border-t border-white/20 flex-1" />
                <p className="text-white">OR</p>
                <hr className="border-t border-white/20 flex-1" />
            </div>

            <MobileGoogle setError={setError} loading={loading} googleLoad={googleLoad} setGoogleLoad={setGoogleLoad}/>

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

            <div className="grid grid-cols-3 items-center w-full text-sm mt-2">
                <div className="text-right">
                    <Link
                        to="/forgot-password"
                        className="text-blue-500 underline"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <div className="text-center text-neutral-100/20">|</div>

                <div className="text-left">
                    <Link
                        to={emailLink}
                        className="text-blue-500 underline"
                    >
                        {emailLink === "/login" ? "Log in" : "Sign up"}
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}