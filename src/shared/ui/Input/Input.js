export const Input = ({ type, placeholder, required, className }) => {
    return(
        <input 
            type={type} 
            placeholder={placeholder} 
            required={required} 
            className={className}
        />
    )
}