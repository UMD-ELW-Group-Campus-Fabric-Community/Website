import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import { programProps } from './index';

import { ParsedUrlQuery } from "querystring";

import styles from '../../styles/Home.module.css'

import DefaultHeader from '../../library/utils/metadata/header'
import DefaultNav from '../../library/components/bars/nav'
import DefaultFooter from '../../library/components/bars/footer'


export const getServerSideProps: GetServerSideProps<programProps> = async (context: GetServerSidePropsContext) => {
    const { programId } = context.params as ParsedUrlQuery;
    const response = await fetch(`http://localhost:3000/api/programs/${programId}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (response.status != 200) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            ...data
        }
    }
}


const Program: NextPage<programProps> = ( program ) => {
    return (
        <div className={styles.container}>
            {/* This is the head of the DOM, not of the body */}
            <DefaultHeader/>
            <DefaultNav/>
            
            <main className={styles.main}>
                <h1>{program.program_name}</h1>
                <p>{program.program_description}</p>
            </main>

            <DefaultFooter />   

        </div>
        
    )
};
export default Program;