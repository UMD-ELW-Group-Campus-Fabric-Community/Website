import React from 'react';

interface Props {
    width: number | string;
    height: number | string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}
interface FlexProps extends Props {
    display: 'flex' | 'inline-flex';
    justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
}

export const FlexBox = (props: FlexProps) => {
    const style = {
        /* Default Panel Style */

        ...props.style,

    } as React.CSSProperties;

    return (
        <div style={style}>
            {props.children}
        </div>
    );
}