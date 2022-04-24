import React, { useState } from "react";
import style from '../../../styles/pages/Home.module.css'

import { hasStyle } from '../../_types'

interface loadingProps extends hasStyle {
    message: string;
}

const Loading = (props: loadingProps) => {
    return (
        <div className={style.main}>
            <h1>{props.message}</h1>                
        </div>
    )
}

export default Loading;