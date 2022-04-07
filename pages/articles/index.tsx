
import Link from "next/link";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";


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

export const getServerSideProps: GetServerSideProps<articlesProps> = async ( context: GetServerSidePropsContext ) => {
    const response = await fetch("http://localhost:3000/api/articles");
    const data = await response.json();
    return {
        props: {
            articles: data.articles
        }
    }
}

const Articles: React.FC<articlesProps> = ( props: articlesProps ) => {
    return (
        <>
            {
                props.articles.map((article: articleProps) => {
                    return (
                        <div key={article.article_id}>
                            <Link href={`/articles/${article.article_id}`} as={`/articles/${article.article_id}`}>
                                <a>{article.article_title}</a>
                            </Link>
                        </div>
                    )
                })
            }
        </>
    )
};

export default Articles;