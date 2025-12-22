import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import clsx from "clsx";
import Header from "../ui/Header";

export default function ProtectedRoute(){
    const { session, loading } = useAuth()

    if (loading){
        return(
        <div 
            className={clsx(
                "form-base flex flex-col items-center justify-center",
                "animate-pulse",
            )}
        >
            <Header />
            <div 
                className={clsx(
                    "parent-base",
                    {"animate-pulse": loading,},
                )}
            >
                <h1 className="text-center">Loading...</h1>
            </div>
        </div>
        ) 
    } 

    return session ? <Outlet /> : <Navigate to="/login" replace />
}