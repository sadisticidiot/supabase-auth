import clsx from "clsx";

export default function BaseInput({
    value,
    onChange,
    type = "text",
    placeholder,
    name,
    autoComplete,
    className = "",
    disabled
}){
    return(
        <input
            disabled={disabled}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            name={name}
            autoComplete={autoComplete}
            className ={clsx(
                "input-base",
                {"bg-neutral-700 text-neutral-900 inset-shadow-none cursor-not-allowed": disabled,}, 
                className
            )}
        />
    )
}