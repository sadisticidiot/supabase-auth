import { useEffect, useState } from "react"
import { supabase } from "../supabase-client"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import Editor from "../ui/Editor"
import { useAuth } from "../logic/AuthProvider"

const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
}

const item = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
}

export default function Home(){
    const { posts, error, fetchLoad, fetchPosts } = useAuth()
    const [open, setOpen] = useState(false)
    const [activePost, setActivePost] = useState(null)

    //Loading
    if (fetchLoad) {
        return(
            <motion.div
                className="form-base relative top-10 flex flex-col align-items justify-start gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeIn" }}
            >
                <motion.span 
                    initial={{ opacity: 0, y: -30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-neutral-100/20"
                >
                    Fetching posts...
                </motion.span>

                <div className="parent-base h-[100px] animate-pulse" />
                <div className="parent-base h-[170px] animate-pulse" />
                <div className="parent-base h-[120px] animate-pulse" />
                <div className="parent-base h-[100px] animate-pulse" />
            </motion.div>
        )
    }

    //Empty page
    if (posts.length === 0) {
        return(
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: [1.01, 1] }}
                transition={{ duration: 0.2, ease: "easeOut"}}
                className="form-base gap-2"
            >
                <p className="text-neutral-100/20">No posts yet. </p>
                <Link className="text-sky-700/20 hover:underline hover:text-sky-700 transition" to="/dashboard/posts">Make your first one.</Link>
            </motion.div>
        )
    }

    if (error) {
        return(
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: [1.01, 1] }}
                transition={{ duration: 0.2, ease: "easeOut"}}
                className="form-base"
            >
                <p className="text-red-500">An unexpected error occured. </p>
            </motion.div>
        )
    }

    if (open) return <Editor setOpen={setOpen} activePost={activePost}/>

function DesktopDisplay(){
    return(
        <motion.ul
            className="form-base relative top-10 flex flex-col align-items justify-start gap-5 mb-5"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {posts.map(post => (
                <motion.li
                    key={post.id}
                    onClick={() => {
                        setActivePost(post.id)
                        setOpen(true)
                    }}
                    variants={item}
                    whileHover={{ scale: 1.01, backgroundColor: "#262626" }}
                    className="parent-base min-h-[100px] items-start cursor-pointer text-left"
                >
                    <h1 className="pt-0">{post.title}</h1>
                    {post.description}
                </motion.li>
            ))}
        </motion.ul>
    )
}

function MobileDisplay(){
    return(
        <motion.ul
            className="form-base relative top-10 flex flex-col align-items justify-start gap-2 px-2 pb-22"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {posts.map(post => (
                <motion.li
                    key={post.id}
                    onClick={() => {
                        setActivePost(post.id)
                        setOpen(true)
                    }}
                    variants={item}
                    whileHover={{ scale: 1.01, backgroundColor: "#262626" }}
                    className="parent-base min-h-[100px] items-start cursor-pointer text-left w-full"
                >
                    <h1 className="pt-0 pb-2">{post.title}</h1>
                    {post.description}
                </motion.li>
            ))}
        </motion.ul>
    )
}

    return(
        <>
            <div className="block md:hidden w-full">
                <MobileDisplay />
            </div>

            <div className="hidden md:block w-full">
                <DesktopDisplay />
            </div>
        </>
    )
}