import React, { useState } from "react";
import { useRouter } from 'next/router';

type popUpProps = {
    title: string;
    message: string;
    redirect: string;
    callback: any;
}

const PopUp = (props: popUpProps) => {
    const { title, message, redirect, callback } = props;
    const router = useRouter();

    const [isShown, setShown] = useState(true);
    
    const closePopUp = async () => { 
        setShown(false);
        await callback();
        router.push(redirect);
     }

    return (
        <div className="popup" style={{
            display: isShown ? 'block' : 'none'
        }}>
            <div className="popup_inner">
                <h1>{title}</h1>
                <p>{message}</p>
                <button onClick={closePopUp}>Close</button>
            </div>
        </div>
    )
}
export default PopUp;