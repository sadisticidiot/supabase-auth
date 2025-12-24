import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { supabase } from "../supabase-client"
import BaseInput from "../ui/BaseInput";

export default function Posts(){
    const textareaRef = useRef(null)

    const [note, setNote] = useState("")
    const [error, setError] = useState("")
    const [title, setTitle] = useState("")

    const [loading, setLoading] = useState(false)

    const autoResize = () => {
        const el = textareaRef.current
        if (!el) return
        el.style.height = "auto"
        el.style.height = `${el.scrollHeight}px`
    }

    useEffect(() => {
        autoResize()
    }, [note])

    const handleThoughts = (e) => {
        setError("")
        setNote(e.target.value)
        autoResize()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const { data: { user } } = await supabase.auth.getUser()

        const { error } = await supabase
            .from("posts")
            .insert({
                title: title || null,
                description: note,
                user_id: user.id,
            })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        } else {
            setNote("")
            setError("")
        }
        setLoading(false)
    }

    return(
        <div className="form-base">
            <motion.form 
                onSubmit={handleSubmit}
                className={clsx(
                    "parent-base",
                    "p-1 box-border border-0 rounded-xl max-w-[300px]",
                    {"border-1 border-neutral-900": note}
                )}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, ease: "easeOut"}}
            >
                <textarea className="input-base resize-none inset-shadow-xs inset-shadow-neutral-800 outline-none focus:ring-0" ref={textareaRef} value={note} onChange={handleThoughts} placeholder="What are your thoughts?" />

                <AnimatePresence mode="wait"> 
                {note &&
                    <motion.div 
                        className="flex w-full justify-between items-center gap-2 pb-1 "
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 40 }}
                        exit={{ opacity: 0, height: 0}}
                        transition={{ duration: 0.15, ease: "easeIn"}}
                    >
                        <motion.input 
                            placeholder="Title" 
                            className="input-base w-1 inset-shadow-xs inset-shadow-neutral-700/80" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "190px" }}
                            exit={{ opacity: 0, width: 0 }}
                        />
                        <motion.button 
                            disabled={loading}
                            className={clsx(
                                "button-base",
                                "w-22 flex gap-2 items-center justify-center",
                                loading && "cursor-default border-none bg-neutral-950 text-white/50",
                            )}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15, ease: "easeIn" }}
                        >
                            {loading && <span className="spinner" />}
                            Submit
                        </motion.button>
                    </motion.div>
                }
                </AnimatePresence>

                <AnimatePresence mode="wait">
                {error && 
                    <motion.p 
                        className="text-red-400" 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.80 }}
                        transition={{ duration: 0.2, ease: "easeIn"}}
                    >
                        {error}
                    </motion.p>
                }
                </AnimatePresence>
            </motion.form>

            </div>
    )
}