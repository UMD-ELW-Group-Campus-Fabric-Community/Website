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
}

const Dropdown = (props: dropdownProps) => {
    const { name, id, label, values, required } = props;
    return (
        <fieldset>
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
    )
}

export default Dropdown;