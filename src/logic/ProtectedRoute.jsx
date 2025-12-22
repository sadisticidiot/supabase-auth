import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
export default function ProtectedRoute(){
    const { session, loading } = useAuth()

  if (loading) {
    return(
      <div className="form-base flex-col">
        <span className="spinner size-10"></span>
        <h1>Loading... thank you for your patience.</h1>
      </div>
    )
  }

    return session ? <Outlet /> : <Navigate to="/login" replace />
}