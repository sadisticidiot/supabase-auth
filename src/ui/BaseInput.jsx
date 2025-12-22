import clsx from "clsx";

export default function BaseInput({
    error,
    className = "",
    disabled,
    ...props
}){
    return(
        <input
            {...props}
            disabled={disabled}
            className ={clsx(
                "input-base",
                {
                    "bg-neutral-700 text-neutral-900 inset-shadow-none cursor-not-allowed": 
                    disabled,

                    "border border-red-500 focus:ring-red-500":
                    error
                }, 
                className
            )}
        />
    )
}