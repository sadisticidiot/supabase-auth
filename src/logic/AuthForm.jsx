import { Link } from "react-router-dom";
import GoogleBtn from "../ui/GoogleBtn";
import clsx from "clsx";

export default function AuthForm({ children, emailLink, loading, submitting, googleLoad, setGoogleLoad }){
    return(
        <div className="form-base">
            <div className="parent-base">
                {children}

                <div className="flex w-full items-center gap-2 my-2">
                    <hr className="border-t bordr-white/20 flex-1" />
                    <p className="text-white-20">OR</p>
                    <hr className="border-t bordr-white/20 flex-1" />
                </div>

                <GoogleBtn submitting={submitting} loading={loading} googleLoad={googleLoad} setGoogleLoad={setGoogleLoad}/>

                <div className="grid grid-cols-3 items-center w-full text-sm mt-2">
                    <div className="text-right">
                        <Link
                        to="/forgot-password"
                        className={clsx("text-neutral-100/20 hover:text-blue-500 hover:underline")}
                        >
                        Forgot Password?
                        </Link>
                    </div>

                    <div className="text-center text-neutral-100/20">|</div>

                    <div className="text-left">
                        <Link
                        to={emailLink}
                        className={clsx("text-neutral-100/20 hover:text-blue-500 hover:underline")}
                        >
                        {emailLink === "/login" ? "Log in" : "Sign up"}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}