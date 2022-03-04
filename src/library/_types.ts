import { CSSProperties, ReactNode } from "react";

export interface hasChildren { 
    children?: ReactNode;
}

/* Interface for Styleable Properities */
export interface DefaultStyle {
    [key: string]: CSSProperties;
}
export interface isStyleable {
    style?: CSSProperties;
}