import React from 'react';

import style from '../../../styles/components/Input.module.css';
import { inputColors } from '../../../styles/_colors';

type textInputProps = {
    name: string;
    id: string;
    label: string;
    placeholder: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    type?: string;
    maxLimit?: number;
    className?: string;
}   

export const LongTextInput = (props: textInputProps) => {
    const { name, id, label, placeholder, maxLimit, required, type } = props;

    return (
        <div >
            <fieldset style={{
                width: '100%',
                height: '100%',
            }}>
                <label htmlFor={id}>
                    <p>{label} {required ? <span style={{ color: 'red' }}>*</span> : null}</p>
                </label>
                <textarea
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    required={required}
                    maxLength={maxLimit}
                    style={{ 
                        resize: 'none',
                        overflow: 'hidden',
                        width: '100%',
                        height: '200px',
                    }}
                />
            </fieldset>
        </div>
    )
}


const TextInput = (props: textInputProps) => {
    const { name, id, label, placeholder, onChange, required, type } = props;
    return (
        <div>
            <fieldset style={{
                width: '100%',
                height: '100%',
            }}>
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
        </div>

    )
}

export default TextInput;