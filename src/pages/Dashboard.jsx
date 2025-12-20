import { useAuth } from "../logic/AuthProvider";
import Header from "../ui/Header";

export default function Dashboard(){
    const { profile } = useAuth()
    
    return(
        <div className="form-base flex flex-col items-center justify-center">
            <Header />
            <div className="parent-base">
                <h1 className="text-center">Welcome, {profile.last_name}!</h1>
            </div>
        </div>
    )
}