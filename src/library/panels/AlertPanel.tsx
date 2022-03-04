import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { PanelProps } from './Panel';

interface AlertProps extends PanelProps {
    error: string;
    message: string;
    redirect: string | '/';
}

export const AlertPanel = (props: AlertProps) => {
    const style = {
        /* Default Panel Style */
        
        ...props.style,

    } as CSSProperties;

    return (
        <div style={style}>
            <div>
                <h1>{props.error}</h1>
                <p>{props.message}</p>
                <Link to={props.redirect}>Return to Home</Link>
            </div>
        </div>
    );
}