import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute(){
    const { session, loading } = useAuth()

    if (loading){
        return(
            <div className="form-base">
                <div className="flex items-center justify-center">
                    <span className="size-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <p className="text-white font-bold text-2xl">Loading... Thank you for your patience.</p>
                </div>
            </div>
        ) 
    } 

    return session ? <Outlet /> : <Navigate to="/login" replace />
}