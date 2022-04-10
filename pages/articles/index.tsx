import Link from "next/link";
import { 
    NextPage, 
    GetStaticProps } from "next";
import React from "react";

import styles from '../../styles/Home.module.css'

import DefaultHeader from '../../library/utils/metadata/header'
import DefaultNav from '../../library/components/bars/nav'
import DefaultFooter from '../../library/components/bars/footer'


export type articleProps = {
    user_id:              number;
    user_fname:           string;
    user_lname:           string;
    article_id:           number;
    article_title:        string;
    article_content:      string;
    article_created_at:   Date;
    article_updated_at:   Date;
    organization_id:      number;
    organization_name:    string;
    organization_website: string;
}

type articlesProps = {
    articles: articleProps[];
}

export const getStaticProps: GetStaticProps<articlesProps> = async () => {
    const response = await fetch("http://localhost:1433/api/articles", {
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
            articles: data
        },
        revalidate: 1 * 60 * 60 // 1 hour
    }
}


const Articles: NextPage<articlesProps> = ( {articles} ) => {
    
    return (
        <div className={styles.container}>
          {/* This is the head of the DOM, not of the body */}
          <DefaultHeader/>
          <DefaultNav/>
          
            <main className={styles.main}>
                {
                    articles.map((article: articleProps) => {
                        return (
                            <div key={article.article_id}>
                                <Link href={`/articles/${article.article_id}`} as={`/articles/${article.article_id}`}>
                                    <a>{article.article_title}</a>
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

export default Articles;