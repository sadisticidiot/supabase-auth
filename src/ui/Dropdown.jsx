import { supabase } from "../supabase-client"
import logout from "/Icon (1).png"

export default function Dropdown({ first_name, last_name, setIsDropdown }){

    const handleSignOut = () => {
        setIsDropdown(false)
        supabase.auth.signOut()
    }

    return(
        <div className="border-1 border-white/20 absolute right-0 flex flex-col gap-1 p-2 bg-neutral-800 shadow-sm shadow-neutral-900 rounded-sm w-50">
            <div className="items-start flex flex-col pb-0 border-none rounded-sm  button-base bg-neutral-800 shadow-none inset-shadow-none hover:bg-neutral-700">
                <button className="text-xl mb-2">
                    {first_name} {last_name}
                </button>

                <span className="text-neutral-100/20 font-normal">Edit Profile</span>
            </div>
            <hr className="border-t border-neutral-100 mb-1" />

            <button
                className="button-base border-none rounded-sm bg-neutral-800 shadow-none inset-shadow-none flex gap-2 hover:bg-neutral-700 p-1 py-2" 
                onClick={() => supabase.auth.signOut()}
                            >
                <img src={logout} className="h-[25px]" />
                    Log Out
            </button>
        </div>
    )
}