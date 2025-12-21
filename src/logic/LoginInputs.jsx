import BaseInput from "../ui/BaseInput"

export default function LoginInputs({ submitting, email, setEmail, password, setPassword, setError }){
    return(
        <>
            <BaseInput
                disabled={submitting}
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                }}
                type="email"
                placeholder="Email or phone"
                name="username" 
                autoComplete="username" 
            />
            <BaseInput 
                disabled={submitting}
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value) 
                    setError("")
                }}
                type="password"
                placeholder="Password"
                name="password" 
                autoComplete="new-password" 
            />
        </>        
    )
}
