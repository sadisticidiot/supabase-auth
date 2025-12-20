
export default function BaseInput({
    value,
    onChange,
    type = "text",
    placeholder,
    name,
    autoComplete,
    className = ""
}){
    return(
        <input
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            name={name}
            autoComplete={autoComplete}
            className ={`input-base ${className}`}
        />
    )
}