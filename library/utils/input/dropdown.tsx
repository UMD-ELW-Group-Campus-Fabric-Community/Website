import React from 'react';

type dropdownProps = {
    name: string;
    id: string;
    label: string;
    values: Array<{
        value: string;
        label: string;
    }>;
    required?: boolean;
    className?: string;
}

const Dropdown = (props: dropdownProps) => {
    const { name, id, label, values, required } = props;
    return (
        <div>
            <fieldset style={{
                width: '100%',
                height: '100%',
            }}>
                <label htmlFor={id}>
                    <p>{label} {required ? <span style={{ color: 'red' }}>*</span> : null}</p>
                </label>
                    <select
                        name={name}
                        id={id}
                        >
                        {
                            values.map((value, index) => {
                                return (
                                    <option key={index} value={value.value}>{value.label}</option>
                                )
                            })
                        }
                        </select>
            </fieldset>
        </div>
    )
}

export default Dropdown;