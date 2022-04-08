import React, { useState } from "react";
import { useRouter } from 'next/router';

type popUpProps = {
    title: string;
    message: string;
    redirect: string;
}

const PopUp = (props: popUpProps) => {
    const { title, message } = props;
    const router = useRouter();

    const [isShown, setShown] = useState(true);
    
    const closePopUp = () => { 
        setShown(false);
        router.push(props.redirect);
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