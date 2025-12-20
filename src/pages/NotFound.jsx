import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-neutral-900">
            <div className="bg-neutral-800/80 text-neutral-100 text-shadow-lg shadow-lg shadow-black/50 rounded-sm p-4 flex flex-col items-center">
                <h1 className="text-4xl">404 Not Found</h1>
                <Link to="/login" className="button-base text-center">Go Home</Link>
            </div>
        </div>
    )
}