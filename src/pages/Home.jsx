import { useEffect, useState } from "react"
import { supabase } from "../supabase-client"
import { Link } from "react-router-dom"
import { motion } from "motion/react"

const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
}

const item = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
}

export default function Home(){
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .order("created_at", {ascending: false})
        
        if (error){
            setError("An error occured. Please try again.")
            setLoading(false)
        } else {
            setPosts(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        console.log(posts)
    }, [posts])

    //Fetch posts on render
    useEffect(() => {
        fetchPosts()
    }, []
)

    //Loading
    if (loading) {
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
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, ease: "easeOut"}}
                className="form-base gap-2"
            >
                <p className="text-neutral-100/20">No posts yet. </p>
                <Link className="text-sky-700/20 hover:underline hover:text-sky-700 transition" to="/dashboard/posts">Make your first one.</Link>
            </motion.div>
        )
    }

    return(
        <motion.ul
            className="form-base relative top-10 flex flex-col align-items justify-start gap-5"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {posts.map(post => (
                <motion.li
                    variants={item}
                    whileHover={{ scale: 1.01, backgroundColor: "#262626" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="parent-base min-h-[100px] items-start cursor-pointer"
                >
                    {post.description}
                </motion.li>
            ))}
        </motion.ul>
    )
}