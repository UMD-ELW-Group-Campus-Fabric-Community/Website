import { useState } from 'react';

type reqParams = {
    endpoint: string;
    method: string;
}

export type formResponse = {
    statusCode: number;
    message: string;
}

const useForm = (params:reqParams, initialState = {}, callback: any) => {
    const [values, setValues] = useState(initialState);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await fetch(`http://localhost:3000${params.endpoint}`, {
            method: params.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        const response = await res.json();
        await callback(response);
    }

    return {
        values,
        onChange,
        onSubmit
    }
}

export default useForm;

