import { useEffect, useState } from "react"
import { supabase } from "../supabase-client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

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

    //Fetch posts on render
    useEffect(() => {
        fetchPosts()
    }, []
)

    if (loading) {
        return(
            <div className="form-base flex-col gap-2">
                <span className="spinner size-15"></span>
                <h1 className="text-[15px]">Getting your posts from Mt. Everest, thank you for your paitence</h1>
            </div>
        )
    }
    //Empty page
    if (posts.length === 0) {
        return(
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.2, ease: "easeOut"}}
                className="form-base gap-2"
            >
                <p className="text-neutral-100/20">No posts yet. </p>
                <Link className="text-sky-700/20 hover:underline hover:text-sky-700 transition" to="/dashboard/posts">Make your first one.</Link>
            </motion.div>
        )
    }

    return(
        <>
            <div className="form-base relative top-10 flex-col gap-4 justify-start p-1 px-10 w-full">
                {posts.map(post => (
                    <div
                        key={post.id}
                        className="parent-base"
                    >
                        <h2>{post.description}</h2>
                    </div>
                ))}
            </div>
        </>
    )

}