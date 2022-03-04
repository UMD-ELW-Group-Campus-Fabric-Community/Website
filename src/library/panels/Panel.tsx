import React, { CSSProperties } from "react";

import { hasChildren, isStyleable } from "../_types";
import { Colors } from '../_colors';
import { Fonts } from '../_fonts';

export interface PanelProps extends isStyleable, hasChildren {
    width: number | string;
    height: number | string;
    display?: string | "flex" | "inline-flex";
    justifyContent?: string;
    alighItems?: string;
        
    children?: React.ReactNode;
}

export const Panel = (props: PanelProps) => {
    const style = {
        /* Default Panel Style */

        ...props.style,

    } as CSSProperties;

    return (
        <div style={style}>
            {props.children}
        </div>
    );
}
