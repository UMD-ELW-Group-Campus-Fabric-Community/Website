import type { NextPage,
    GetStaticProps, 
    GetStaticPropsContext,
    GetStaticPaths,
    GetStaticPathsResult } from "next";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import withAuth from "../library/utils/withAuth";

const Manage: NextPage = () => {

    return (
        <h2>This is a manage page</h2>
    )
}

export default withAuth(Manage);