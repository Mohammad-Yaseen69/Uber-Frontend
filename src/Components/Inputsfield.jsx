import React from 'react'

const Inputsfield = ({
    type = "text",
    required = true,
    onChange = () => { },
    placeholder ="",
    value = "",
    className,
    name
}) => {
    return (
        <input
            type={type}
            required={required}
            value={value}
            onChange={onChange}
            name={name}
            placeholder={placeholder}
            className={`w-full border-none-custom  border-none  bg-gray-100 p-3 custom-shadow outline-none rounded-md mt-4 border-black placeholder:text-[15px] ${className}`}
        />
    )
}

export default Inputsfield