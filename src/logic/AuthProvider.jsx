import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../supabase-client"

const AuthContext = createContext(null)

/**
 * Ensures the user has a profile row.
 * - Returns existing profile if found
 * - Creates one if missing (Google OAuth case)
 */
async function ensureProfile(user) {
  // 1. Try to fetch existing profile
  try {
    const { data: existingProfile } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("user_id", user.id)
    .single()

  if (existingProfile) return existingProfile

  // 2. Extract name from metadata
  const meta = user.user_metadata

  const firstName =
    meta.first_name ||
    meta.given_name ||
    meta.name?.split(" ")[0] ||
    ""

  const lastName =
    meta.last_name ||
    meta.family_name ||
    meta.name?.split(" ").slice(1).join(" ") ||
    ""

  // 3. Create profile
  const { data: newProfile } = await supabase
    .from("profiles")
    .insert({
      user_id: user.id,
      first_name: firstName,
      last_name: lastName,
    })
    .select()
    .single()

  return newProfile
  } catch (err) {
    console.error("Failed to ensure profile:", err)
    return null
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Runs on initial app load
    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        const session = data.session
        setSession(session)

        if (session?.user) {
          const profile = await ensureProfile(session.user)
          setProfile(profile)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

      init()

      // Runs on login/logout
      const { data: { subscription } } =
        supabase.auth.onAuthStateChange(async (_event, session) => {
          setSession(session)

          if (session?.user) {
            const profile = await ensureProfile(session.user)
            setProfile(profile)
          } else {
            setProfile(null)
          }
        })

      return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ session, profile, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
