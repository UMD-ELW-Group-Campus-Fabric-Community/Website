import Link from "next/link";
import { NextPage, GetStaticProps } from "next";
import React, { useEffect } from "react";

import DefaultHeader from "../../library/utils/metadata/header";
import DefaultNav, { SubNav } from "../../library/components/anchors/nav";
import DefaultFooter from "../../library/components/anchors/footer";

import defaultStyle from "../../styles/pages/Default.module.css";
import styles from "../../styles/pages/Article.module.css";

export type articleProps = {
  user_id: number;
  user_fname: string;
  user_lname: string;
  article_id: number;
  article_title: string;
  article_content: string;
  article_created_at: Date;
  article_updated_at: Date;
  organization_id: number;
  organization_name: string;
  organization_website: string;
};

type articlesProps = {
  articles: articleProps[];
};

export const getStaticProps: GetStaticProps<articlesProps> = async () => {
  const response = await fetch("http://localhost:1433/api/articles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (response.status != 200) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      articles: data.body,
    },
    revalidate: 1 * 60 * 60, // 1 hour
  };
};

const Articles: NextPage<articlesProps> = ({ articles }) => {
  const [selectedArticles, _] = React.useState<articleProps[]>(articles);
  const [search, setSearch] = React.useState<string>("");
  const [filters, setFilters] = React.useState<string[]>([]);

  const modIncludes = (value: string, target: string) => {
    return value.toLowerCase().includes(target.toLowerCase()) ? value : null;
  };

  return (
    <div className={defaultStyle.container}>
      {/* This is the head of the DOM, not of the body */}
      <DefaultHeader />
      <DefaultNav />

      <main className={defaultStyle.main}>
        <SubNav page="articles" />
        <div className={styles.searchContainer}>
          {/* Search bar thats filters selected articles */}
          <div>
            <img
              src={"/icons/articles.jpg"}
              alt="Articles Icon"
              className={styles.icon}
            ></img>
            <h1>Articles</h1>
          </div>
          <input
            type="text"
            placeholder="Search Articles"
            className={styles.search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                const text = e.currentTarget.value;
                if (!filters.includes(text)) {
                  setFilters([...filters, text]);
                }
              }
            }}
          />
        </div>
        Filters
        {filters.map((filter, index) => {
          return (
            <div
              key={index}
              className={styles.filter}
              onClick={() => {
                const newFilters = [...filters];
                newFilters.splice(newFilters.indexOf(filter), 1);
                setFilters(newFilters);
              }}
            >
              {filter}
            </div>
          );
        })}
        Article
        {selectedArticles
          .filter((article) => {
            if (filters.length === 0) {
              return article;
            }
            return filters.every((filter) => {
              return (
                modIncludes(article.article_title, filter) ||
                modIncludes(article.article_content, filter) ||
                modIncludes(article.organization_name, filter)
              );
            });
          })
          .filter((article) => {
            if (search === "") {
              return article;
            } else if (
              modIncludes(article.article_title, search) ||
              modIncludes(article.article_content, search) ||
              modIncludes(article.organization_name, search)
            ) {
              return article;
            }
            return null;
          })
          .map((article) => {
            return (
              <div key={article.article_id} className={styles.article}>
                <div className={styles.articleTitle}>
                  <Link href={`/articles/${article.article_title}`}>
                    <a>{article.article_title}</a>
                  </Link>
                </div>
              </div>
            );
          })}
      </main>

      <DefaultFooter />
    </div>
  );
};

export default Articles;
