import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase-client";
import Header from "../ui/Header";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard(){
    const textareaRef = useRef(null)

    const [note, setNote] = useState("")

    const autoResize = () => {
        const el = textareaRef.current
        if (!el) return
        el.style.height = "auto"
        el.style.height = `${el.scrollHeight}px`
    }

    useEffect(() => {
        autoResize()
    }, [])

    const handleThoughts = (e) => {
        setNote(e.target.value)
        autoResize()
    }


    return(
        <div 
            className={clsx(
                "form-base flex flex-col justify-start overflow-auto no-scrollbar",
            )}
        >
            <Header />

            <div 
                className={clsx(
                    "parent-base",
                    "p-1 bg-neutral-900 box-border border-0 rounded-xl relative top-10 w-max-[300]",
                    {"border-1 border-neutral-900": note}
                )}
            >
                <textarea className="input-base resize-none" ref={textareaRef} value={note} onChange={handleThoughts} placeholder="What are your thoughts?" />

                <AnimatePresence mode="wait"> 
                {note &&
                    <motion.div 
                        className="flex w-full justify-end"
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 40 }}
                        exit={{ opacity: 0, height: 0}}
                        transition={{ duration: 0.15, ease: "easeIn"}}
                    >
                        <motion.button 
                            className="button-base w-20"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15, ease: "easeIn" }}
                        >
                            Submit
                        </motion.button>
                    </motion.div>
                }
                </AnimatePresence>
            </div>
        </div>
    )
}