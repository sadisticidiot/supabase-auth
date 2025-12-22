import { useState } from "react";
import { Link } from "react-router-dom";

export default function NotFound(){
    const [loading, setLoading] = useState(true)

    return(
        <div className="form-base">
            <div className="parent-base">
                <h1 className="text-4xl">404 Not Found</h1>
                <div className="flex justify-center items-center gap-2">
                 {loading && <span className="spinner border-l-white/0 border-neutral-100/20"></span>}
                 <p className="text-neutral-100/20">Leading to nowhere...</p>
                </div>
                <Link to="/login" className="button-base text-center">Go Home</Link>
            </div>
        </div>
    )
}