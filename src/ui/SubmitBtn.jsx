import clsx from "clsx"

export default function SubmitBtn({variant = "", loading = false }) {

    const labels = {
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
                "flex items-center gap-2 justify-center",
                {
                    "bg-neutral-900/50 cursor-not-allowed inset-shadow-neutral-900/60 scale-98 font-light": loading,
                }
            )}
        >
            {loading && (
                <span className="size-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            {label}
        </button>         
    )
}
