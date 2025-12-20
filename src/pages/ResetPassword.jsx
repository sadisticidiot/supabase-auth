import { useEffect } from "react";
import { supabase } from "../supabase-client";

export default function ResetPassword(){
    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === "PASSWORD_RECOVERY") {

                }
            }
        )
        
        return () => data.subscription.unsubscribe()
    }, [])

}