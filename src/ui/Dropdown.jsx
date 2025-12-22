import { supabase } from "../supabase-client"
import logout from "/Icon (1).png"
import { motion } from "framer-motion";

export default function Dropdown({ first_name, last_name, setIsDropdown }){

    const handleSignOut = () => {
        setIsDropdown(false)
        supabase.auth.signOut()
    }

    return(
            <motion.div 
                className="parent-base absolute right-0 w-50 bg-neutral-800 border-1 border-neutral-950/40"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0}}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
            >
                <div className="items-start flex flex-col pb-0 border-none rounded-sm button-base bg-neutral-800 shadow-none cursor-pointer inset-shadow-none hover:bg-neutral-700">
                    <button className="text-xl mb-2 cursor-pointer">
                        {first_name} {last_name}
                    </button>

                    <span className="text-neutral-100/20 font-normal">Edit Profile</span>
                </div>
                <hr className="border-t w-full border-neutral-100/20 mb-1" />

                <button
                    className="button-base border-none rounded-sm bg-neutral-800 shadow-none inset-shadow-none flex gap-2 hover:bg-neutral-700 p-1 py-2" 
                    onClick={handleSignOut}
                                >
                    <img src={logout} className="h-[25px]" />
                        Log Out
                </button>
            </motion.div>
    )
}