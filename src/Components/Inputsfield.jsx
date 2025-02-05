import React from 'react'

const Inputsfield = ({
    type = "text",
    required = true,
    onChange = () => { },
    placeholder ="",
    value = "",
    className,
    name,
    style,
    ...props
}) => {
    return (
        <input
            type={type}
            style={style}
            required={required}
            value={value}
            onChange={onChange}
            name={name}
            
            placeholder={placeholder}
            className={`w-full border-none-custom  border-none  bg-gray-100 p-3 custom-shadow outline-none rounded-md mt-4 border-black placeholder:text-[15px] ${className}`}
            {...props}
        />
    )
}

export default Inputsfield