import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../supabase-client"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [fetchLoad, setFetchLoad] = useState(true)
  const [error, setError] = useState("")

  //Get session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: {session} }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    
    return () => subscription.unsubscribe()
  }, [])

  //Fetch posts from backend
  const fetchPosts = async () => {
      const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", {ascending: false})
        
      if (error){
          setError("An error occured. Please try again.")
          setFetchLoad(false)
       } else {
          setPosts(data)
      }
      setFetchLoad(false)
  }

    //Subscribe to posts table for auto update
    useEffect(() => {
        const channel = supabase
            .channel("posts-realtime")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "posts",
                },
                (payload) => {
                    if (payload.eventType === "INSERT") {
                        setPosts(prev => [payload.new, ...prev])
                    }

                    if (payload.eventType === "UPDATE") {
                        setPosts(prev =>
                            prev.map(post =>
                                post.id === payload.new.id ? payload.new : post
                            )
                        )
                    }

                    if (payload.eventType === "DELETE") {
                        setPosts(prev =>
                            prev.filter(post => post.id !== payload.old.id)
                        )
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    useEffect(() => {
      fetchPosts()
    }, [])

  return (
    <AuthContext.Provider value={{ session, loading, fetchLoad, error, fetchPosts, posts, setPosts }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
