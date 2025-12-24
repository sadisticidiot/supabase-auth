import clsx from "clsx"

export default function MobileSubmit({variant = "", loading = false }) {

    const labels = {
        google: {
            idle: "Continue with Google",
            loading: ""
        },
        login: {
            idle: "Log in",
            loading: "Logging in..."
        },
        signup: {
            idle: "Sign up",
            loading: "Signing up..."
        },
        forgot : {
            idle: "Submit Email",
            loading: "Sending Reset Email..."
        },
        reset: {
            idle: "Change Password",
            loading: "Updating..."
        }
    }

    const label = loading
    ? labels[variant].loading
    : labels[variant].idle
    return(
        <button
            type="submit"
            disabled={loading}
            className={clsx(
                "button-base",
                "flex items-center gap-2 justify-center py-5",
                {
                    "cursor-default border-none bg-neutral-900 text-white/50": loading,
                }
            )}
        >
            {loading && (
                <span className="spinner" />
            )}
            {label}
        </button>         
    )
}
