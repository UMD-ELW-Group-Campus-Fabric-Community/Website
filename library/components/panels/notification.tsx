import React, { useState } from "react";
import { useRouter } from 'next/router';

import style from '../../../styles/components/Popup.module.css'
import { formColors } from '../../../styles/_colors';

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
        <div className={style.popup} style={{
            display: isShown ? 'block' : 'none'
        }}>
            <div className={style.popupInner}>
                <h1>{title}</h1>
                <p>{message}</p>
                <button onClick={closePopUp} style={{
                    backgroundColor: formColors.button.primary,
                    color: '#000'
                }}>Close</button>
            </div>
        </div>
    )
}
export default PopUp;