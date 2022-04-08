import Link from "next/link";
import { NextPage, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";

import styles from '../../styles/Home.module.css'

import DefaultHeader from '../../library/utils/metadata/header'
import DefaultNav from '../../library/components/bars/nav'
import DefaultFooter from '../../library/components/bars/footer'



export type programProps = {
    program_id:           string;
    program_name:         string;
    program_description:  string;
    program_website:      string;
    program_focus:        string[];
    department_id:        string;
    department_name:      string;
    organization_id:      string;
    organization_name:    string;
    organization_website: string;
}

type programsProps = {
    programs: programProps[];
}

export const getStaticProps: GetStaticProps = async ( context: GetStaticPropsContext ) => {
    const response = await fetch("http://localhost:3000/api/programs", {
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
            programs: data.programs
        }
    }
}

const Programs: NextPage<programsProps> = ( {programs} ) => {
    return (
        <div className={styles.container}>
          {/* This is the head of the DOM, not of the body */}
          <DefaultHeader/>
          <DefaultNav/>
          
            <main className={styles.main}>
                {
                    programs.map((program: programProps) => {
                        return (
                            <div key={program.program_id}>
                                <Link href={`/programs/${program.program_id}`} as={`/programs/${program.program_id}`}>
                                    <a>{program.program_name}</a>
                                </Link>
                            </div>
                        )
                    })
                }                
            </main>

            <DefaultFooter />
      
        </div>
    )
};

export default Programs;