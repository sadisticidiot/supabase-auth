import { AnimatePresence } from "framer-motion";
import Header from "../ui/Header";
import { Outlet, useLocation } from "react-router-dom";

export default function Dashboard(){
    const location = useLocation()

    return(
        <div className="form-base flex flex-col justify-start overflow-auto no-scrollbar">
            <Header/>
            <AnimatePresence mode="wait">
                <Outlet key={location.pathname} />
            </AnimatePresence>
        </div>
    )
}