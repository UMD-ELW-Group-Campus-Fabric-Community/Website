import { NextPage, 
    GetStaticProps, 
    GetStaticPropsContext,
    GetStaticPaths,
    GetStaticPathsResult } from "next";
import { programProps } from './index';

import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";

import DefaultHeader from '../../library/utils/metadata/header'
import DefaultNav from '../../library/components/bars/nav'
import DefaultFooter from '../../library/components/bars/footer'

import defaultStyle from '../../styles/pages/Default.module.css'

/*
    NextJS will call this function to get the list of all the program ids.
    This is used to generate the program pages; however, you cannot use this
    function to generate the program pages from an internal API (e.g. under localhost:3000/programs)

    To generate the program pages from an internal API, you can just use the server-side
    code to read the program ids from the database and then use the getStaticProps function. 
    
    This will not be sent client-side!

    REF: https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
*/

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult> => {
    const response = await fetch("http://localhost:1433/api/programs", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return {
        paths: data.body.map((program: programProps) => ({
            params: {
                programId: program.program_id.toString()
            }   
        })),
        fallback: true
    }
}


export const getStaticProps: GetStaticProps<programProps> = async (context: GetStaticPropsContext ) => {
    const { programId } = context.params as ParsedUrlQuery;
    const response = await fetch(`http://localhost:1433/api/programs/${programId}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    const program = data.body[0];

    if (response.status != 200) {
        console.log("No program found");
        return {
            notFound: true
        }
    }
    return {
        props: {
            ...program
        },
        revalidate: 1 * 60 * 60 // 1 hour
    }
}

const Program: NextPage<programProps> = ( program ) => {
    
    const router = useRouter();

    if(router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <div className={defaultStyle.container}>
            {/* This is the head of the DOM, not of the body */}
            <DefaultHeader/>
            <DefaultNav/>
            
            <main className={defaultStyle.main}>
                <h1>{program.program_name}</h1>
                <p>{program.program_description}</p>
            </main>

            <DefaultFooter />   

        </div>
        
    )
};
export default Program;