import React from 'react';

import { FlexBox } from '../library/layout/Responsive';
import { Panel } from '../library/panels/Panel';
import { hasChildren } from '../library/_types';

interface Props extends hasChildren{

    children?: React.ReactNode;
}

export const Home = (props: Props) => {

    return (
        <FlexBox width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
            <Panel width="100%" height="100%" ></Panel>

        </FlexBox>        
    )
};