import { NextPage, GetStaticPaths, GetServerSideProps, GetServerSidePropsContext } from "next";
import { articleProps } from './index';

import { ParsedUrlQuery } from "querystring";

import styles from '../../styles/Home.module.css'

import DefaultHeader from '../../library/utils/metadata/header'
import DefaultNav from '../../library/components/bars/nav'
import DefaultFooter from '../../library/components/bars/footer'


export const getServerSideProps: GetServerSideProps<articleProps> = async (context: GetServerSidePropsContext) => {
    const { articleId } = context.params as ParsedUrlQuery;
    const response = await fetch(`http://localhost:3000/api/articles/${articleId}`);
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


const Article: NextPage<articleProps> = ( {article} ) => {
    return (
        <div className={styles.container}>
            {/* This is the head of the DOM, not of the body */}
            <DefaultHeader/>
            <DefaultNav/>
            
            <main className={styles.main}>
                <h1>{article.article_title}</h1>
                <p>{article.article_content}</p>
            </main>

            <DefaultFooter />   

        </div>
        
    )
};
export default Article;