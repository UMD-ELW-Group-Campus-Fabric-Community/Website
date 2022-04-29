import Link from "next/link";
import { NextPage, GetStaticProps } from "next";
import React, { useEffect } from "react";

import DefaultHeader from "../../library/utils/metadata/header";
import DefaultNav, { SubNav } from "../../library/components/anchors/nav";
import DefaultFooter from "../../library/components/anchors/footer";

import defaultStyle from "../../styles/pages/Default.module.css";
import searchStyles from "../../styles/components/Search.module.css";
import styles from "../../styles/pages/Article.module.css";
import { SearchColors } from "../../styles/_colors";

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

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div className={defaultStyle.container}>
      {/* This is the head of the DOM, not of the body */}
      <DefaultHeader />
      <DefaultNav />

      <main className={defaultStyle.main}>
        <SubNav page="articles" />
        <div
          className={searchStyles.searchContainer}
          style={{
            backgroundColor: SearchColors.background.secondary,
            color: SearchColors.text.secondary,
          }}
        >
          {/* Search bar thats filters selected articles */}
          <div className={searchStyles.searchHead}>
            <div className={searchStyles.icon}>
              <img src={"/icons/articles.png"} alt="Articles Icon"></img>
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
          {/* Filters */}
          <div className={searchStyles.filterContainer}>
            <hr />
            <div className={searchStyles.filterWrapper}>
              {filters.map((filter, index) => {
                return (
                  <div
                    key={index}
                    className={searchStyles.filter}
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
            </div>
            <hr />
          </div>
          {/* Selected Articles */}
          <div
            className={styles.articleContainer}
            style={{
              backgroundColor: SearchColors.background.primary,
              color: SearchColors.text.primary,
            }}
          >
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
                  <div
                    key={article.article_id}
                    className={styles.article}
                    style={{
                      backgroundColor: SearchColors.background.fill,
                    }}
                  >
                    <h2>{article.article_title}</h2>
                    <h6>
                      Written by {article.user_fname + " " + article.user_lname}
                      .{" "}
                      <em>
                        Last Updated:{" "}
                        {formatDate(article.article_updated_at.toString())}
                      </em>{" "}
                    </h6>
                    <p>{article.article_content.substring(0, 250) + "..."}</p>
                    <button
                      className={styles.readMore}
                      onClick={() => {
                        window.location.href = `/articles/${article.article_title}`;
                      }}
                      style={{
                        backgroundColor: SearchColors.button.primary,
                        color: SearchColors.text.over,
                      }}
                    >
                      Read More
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </main>

      <DefaultFooter />
    </div>
  );
};

export default Articles;
