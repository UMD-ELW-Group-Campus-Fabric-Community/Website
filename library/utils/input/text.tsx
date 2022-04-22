import React from 'react';

type textInputProps = {
    name: string;
    id: string;
    label: string;
    placeholder: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    type?: string;
}   

export const LongTextInput = (props: textInputProps) => {
    const { name, id, label, placeholder, onChange, required, type } = props;
    return (
        <fieldset>
            <label htmlFor={id}>
                <p>{label} {required ? <span style={{ color: 'red' }}>*</span> : null}</p>
            </label>
            <textarea
                name={name}
                id={id}
                placeholder={placeholder}
                required={required}
            />
        </fieldset>
    )
}


const TextInput = (props: textInputProps) => {
    const { name, id, label, placeholder, onChange, required, type } = props;
    return (
        <fieldset>
            <label htmlFor={id}>
                <p>{label} {required?<span style={{color:'red'}}>*</span>: null}</p>
                <input
                    name={name}
                    id={id}
                    type= {type?type:'text'}
                    placeholder={placeholder}
                    onChange={onChange}
                    required={required}
                />
            </label>
        </fieldset>
    )
}

export default TextInput;