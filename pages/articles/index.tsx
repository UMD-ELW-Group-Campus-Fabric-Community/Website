import Link from "next/link";
import { 
    NextPage, 
    GetStaticProps } from "next";
import React from "react";

import DefaultHeader from '../../library/utils/metadata/header'
import DefaultNav, {SubNav} from '../../library/components/anchors/nav'
import DefaultFooter from '../../library/components/anchors/footer'

import defaultStyle from '../../styles/pages/Default.module.css'

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
            articles: data.body
        },
        revalidate: 1 * 60 * 60 // 1 hour
    }
}


const Articles: NextPage<articlesProps> = ( {articles} ) => {
    return (
        <div className={defaultStyle.container}>
          {/* This is the head of the DOM, not of the body */}
          <DefaultHeader/>
          <DefaultNav/>
          
            <main className={defaultStyle.main}>
                <SubNav page="articles"/>
                <h1>Articles</h1>
                {   
                    articles.map((article: articleProps) => {
                        return (
                            <div key={article.article_id}>
                                <Link href={`/articles/${article.article_title}`} as={`/articles/${article.article_title}`}>
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