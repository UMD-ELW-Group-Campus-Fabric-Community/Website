import Link from "next/link";
import { NextPage, GetStaticProps } from "next";
import React from "react";


import DefaultHeader from '../../library/utils/metadata/header'
import DefaultNav from '../../library/components/bars/nav'
import DefaultFooter from '../../library/components/bars/footer'

import defaultStyle from '../../styles/pages/Default.module.css'



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

export const getStaticProps: GetStaticProps = async ( ) => {
    const response = await fetch("http://localhost:1433/api/programs", {
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
            programs: data
        },
        revalidate: 1 * 60 * 60 // 1 hour
    }
}

const Programs: NextPage<programsProps> = ( {programs} ) => {
    return (
        <div className={defaultStyle.container}>
          {/* This is the head of the DOM, not of the body */}
          <DefaultHeader/>
          <DefaultNav/>
          
            <main className={defaultStyle.main}>
                {
                    // @ts-ignore
                    programs.body.map((program: programProps) => {
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