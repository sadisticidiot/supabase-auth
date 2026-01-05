import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react"
import { supabase } from "../supabase-client";

export default function Editor({ setOpen, activePost }){
    const emptyPost = { title: "", description: "" }
    const [post, setPost] = useState(emptyPost)

    const [initialLoad, setInitialLoad] = useState(true)
    const [loading, setLoading] = useState(false)

    //Fetch post on inital render
    useEffect(() => {
        if (!activePost) return

        const fetchPost = async () => {
            const { data, error } = await supabase
                .from("posts")
                .select("title, description")
                .eq("id", activePost)
                .single()
            
            if (!error) setPost(data)
            setInitialLoad(false)
        }
        fetchPost()
    }, [activePost])

    const editPost = async () => {
        const { error } = await supabase
            .from("posts")
            .update({
                title: post.title,
                description: post.description
            })
            .eq("id", activePost)

        return { error }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await editPost()

        if (error) {
            console.error(error)
            setLoading(false)
            return
        }

        setPost(emptyPost)
        setOpen(false)
        setLoading(false)
    }

    if (initialLoad) {
        return(
            <div className="form-base z-988 border-2 border-blue-400 bg-transparent p-15">
                <div className="absolute inset-0 backdrop-blur-[2px] bg-black/70" />

                <div className="parent-base size-full p-2 z-999">
                    <header className="relative flex justify-center items-center w-full">
                        <button 
                            className="absolute left-0 text-neutral-100 rounded-sm"
                        >
                        <XMarkIcon className="size-[20px]"/>
                        </button>
                        <h1 className="text-[30px] text-white">Edit Post</h1>
                    </header>

                    <div className="animate-pulse input-base z-999 size-full resize-none outline-none focus:ring-0" />

                    <div className="flex gap-2 w-full justify-end items-center z-999">
                        <div className="animate-pulse input-base flex-1 text-center"/> 
                        <button 
                            disabled
                            className="button-base bg-neutral-900 flex gap-2 justify-center items-center w-[80px]"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>            
        )
    }

    return(
        <form onSubmit={handleSubmit} className="form-base z-988 border-2 border-blue-400 bg-transparent p-15">
            <div className="absolute inset-0 backdrop-blur-[2px] bg-black/70" />

            <div className="parent-base size-full p-2 z-999">
                <header className="relative flex justify-center items-center w-full">
                    <button 
                        onClick={() => setOpen(false)} 
                        className="absolute left-0 text-neutral-100 rounded-sm"
                    >
                    <XMarkIcon className="size-[20px]"/>
                    </button>
                    <h1 className="text-[30px] text-white">Edit Post</h1>
                </header>

                <textarea 
                    value={post.description}
                    className="input-base z-999 size-full resize-none outline-none focus:ring-0" 
                    onChange={(e) => setPost(p => ({...p, description: e.target.value }))} 
                    placeholder="Start writing now!" 
                />

                <div className="flex gap-2 w-full justify-end items-center z-999">
                    <input 
                        value={post.title} 
                        onChange={(e) => setPost(p => ({...p, title: e.target.value }))} 
                        className="input-base flex-1 text-center" placeholder="Set Title" /> 
                    <button 
                        className="button-base flex gap-2 justify-center items-center w-[80px]"
                    >
                        {loading && <p className="spinner" />}
                        Post
                    </button>
                </div>
            </div>
        </form>
    )
}