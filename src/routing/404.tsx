import React, { Component, useState, useEffect } from 'react';

import { AlertPanel } from '../library/panels/AlertPanel';
import { hasChildren } from '../library/_types';

interface Props extends hasChildren{

    children?: React.ReactNode;
}

export const NotFound = (props: Props) => {

    return (
        <AlertPanel width="100%" height="100%" error="404" message="Page not found" redirect="/"/>
    );
};