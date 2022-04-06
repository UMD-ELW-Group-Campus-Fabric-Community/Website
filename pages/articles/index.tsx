
import Link from "next/link";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";

export type articleProps = {
    article_id: number;
    article_title: string;
    article_content: string;
    article_created_at: string;
    article_updated_at: string;
    user_id: number;
}

type articlesProps ={
    data: articleProps[]    
}

export const getStaticProps: GetServerSideProps<articlesProps> = async () => {
    const response = await fetch("http://localhost:1433/api/articles");
    const data = await response.json();
    return {
        props: {
            data
        }
    }
}

const Articles: React.FC<articlesProps> = ( props: articlesProps ) => {
    return (
        <>
            {
                props.data.map((article: articleProps) => {
                    return (
                        <div key={article.article_id}>
                            <Link href={`/articles/${article.article_id}`}>
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