import React from 'react';

type textInputProps = {
    name: string;
    id: string;
    label: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}   

const TextInput = (props: textInputProps) => {
    const { name, id, label, placeholder, onChange, required } = props;
    return (
        <fieldset>
            <label htmlFor={id}>
                <p>{label}</p>
                <input
                    name={name}
                    id={id}
                    type="text" 
                    placeholder={placeholder}
                    onChange={onChange}
                    required={required}
                />
            </label>
        </fieldset>
    )
}
export default TextInput;