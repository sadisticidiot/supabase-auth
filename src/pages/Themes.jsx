import { useState } from "react"
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion"

const titles = [
    { 
        title: "Header", 
        active: "header",
        options: ["Background Color", "UI", "Display"]
    },
    { 
        title: "Body", 
        active: "body",
        options: ["Background Color", "Font", "UI", "Layout"]
    },
    { 
        title: "Footer", 
        active: "footer",
        options: ["Background Color", "UI", "Display"]
    },
]

export default function Themes() {
    const [active, setActive] = useState(null)

    const handleClick = (key) => {
        setActive(prev => (prev === key ? null : key))
    }

function HeaderOptions() {
    return(
        <>
            
        </>
    )
}   

function MainBody() {
    return(
        <>
            {titles.map(item => (
                <div
                    key={item.active} 
                    className="w-full"
                >
                    <h1 
                        className={clsx(
                            "w-full rounded-sm transition",
                            active === item.active
                            ? "bg-[#010101] hover:bg-[#010101]"
                            : "hover:bg-neutral-800 bg-neutral-900 cursor-pointer"
                        )}
                        onClick={() => handleClick(item.active)}
                    >
                        {item.title}
                    </h1>

                    <AnimatePresence mode="wait">
                        {active === item.active && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.1, ease: "easeOut"}}
                                className="w-full bg-zinc-900 flex flex-col"
                            >
                                {item.options.map(opt => (
                                    <p
                                        key={opt}
                                        className="cursor-pointer p-2 w-full text-start hover:bg-neutral-800"
                                    >
                                        {opt}
                                    </p>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </>
    )
}
    return(
        <div className="form-base relative flex-col pb-22">
            <h1 className="text-4xl mt-3">Set Theme</h1>
            <p className="text-white/20">There's a variety of themes already available in the settings.</p>

            <div className="parent-base shadow-none bg-transparent w-98/100 px-4 py-2">
                <MainBody />
            </div>
        </div>
    )
}