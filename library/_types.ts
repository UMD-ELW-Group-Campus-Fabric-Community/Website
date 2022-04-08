import { CSSProperties, ReactNode } from "react";


export interface hasChildren {  
    children?: ReactNode;
}

export interface hasStyle {
    style?: CSSProperties;
}

export interface StyleMap {
    [key: string]: CSSProperties;
}