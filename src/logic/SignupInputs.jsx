import BaseInput from "../ui/BaseInput"

export default function SignupInputs({ 
    firstName, setFirstName, lastName, setLastName,
    email, setEmail, 
    password, setPassword, confirmPass, setConfirmPass,
    setError
}){
    return(
            <>
                <div className="flex gap-3 mb-2 w-full">
                    <BaseInput
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value)
                            setError("")
                        }}
                        placeholder="First Name"
                        name="firstName"
                        autoComplete="given-name"
                    />
    
                    <BaseInput 
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value)
                            setError("")
                        }}
                        placeholder="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                    />
                </div>
    
                <BaseInput 
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
    
                <BaseInput 
                    value={confirmPass}
                    onChange={(e) => {
                        setConfirmPass(e.target.value) 
                        setError("")
                    }}
                    type="password"
                    placeholder="Confirm Password"
                    name="password" 
                    autoComplete="new-password" 
                />
            </>
    )
}