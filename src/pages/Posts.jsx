import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { supabase } from "../supabase-client"

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

        const { data: { user } } = await supabase.auth.getUser()

        const { error } = await supabase
            .from("posts")
            .insert({
                description: note,
                user_id: user.id,
            })

        if (error) {
            setError(error.message)
        } else {
            setNote("")
            setError("")
        }
        setLoading(false)
    }

    return(
        <>
            <motion.form 
                onSubmit={handleSubmit}
                className={clsx(
                    "parent-base",
                    "p-1 bg-neutral-900 box-border border-0 rounded-xl relative top-10 max-w-[300px]",
                    {"border-1 border-neutral-900": note}
                )}
                initial={{ opacity: 0, scale: 0.95, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.2, ease: "easeOut"}}
            >
                <textarea className="input-base resize-none" ref={textareaRef} value={note} onChange={handleThoughts} placeholder="What are your thoughts?" />

                <AnimatePresence mode="wait"> 
                {note &&
                    <motion.div 
                        className="flex w-full justify-end items-center gap-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 40 }}
                        exit={{ opacity: 0, height: 0}}
                        transition={{ duration: 0.15, ease: "easeIn"}}
                    >
                        {error && <p className="text-red-400">{error}</p>}
                        <motion.button 
                            type="submit"
                            disabled={loading}
                            className="button-base w-20 flex gap-2 items-center"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15, ease: "easeIn" }}
                        >
                            {loading && <span className="spinner"></span>}
                            Submit
                        </motion.button>
                    </motion.div>
                }
                </AnimatePresence>

            </motion.form>

            </>
    )
}