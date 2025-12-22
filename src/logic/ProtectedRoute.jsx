import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute(){
    const { session, loading } = useAuth()

  if (loading) {
    return(
      <div className="form-base flex-col">
        <h1>Loading... thank you for your patience</h1>
        <span className="spinner size-10"></span>
      </div>
    )
  }

    return session ? <Outlet /> : <Navigate to="/login" replace />
}