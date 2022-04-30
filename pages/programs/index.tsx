import Link from "next/link";
import { NextPage, GetStaticProps } from "next";
import React from "react";

import DefaultHeader from "../../library/utils/metadata/header";
import DefaultNav, { SubNav } from "../../library/components/anchors/header";
import DefaultFooter from "../../library/components/anchors/footer";

import defaultStyle from "../../styles/pages/Default.module.css";
import searchStyles from "../../styles/components/Search.module.css";
import styles from "../../styles/pages/Program.module.css";
import { SearchColors } from "../../styles/_colors";

export type programProps = {
  program_id: string;
  program_name: string;
  program_description: string;
  program_website: string;
  program_focus: string[];
  department_id: string;
  department_name: string;
  organization_id: string;
  organization_name: string;
  organization_website: string;
};

type programsProps = {
  programs: programProps[];
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${process.env.API_URL}/programs`, {
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
      programs: data.body,
    },
    revalidate: 1 * 60 * 60, // 1 hour
  };
};

const Programs: NextPage<programsProps> = ({ programs }) => {
  const [selectedPrograms, _] = React.useState<programProps[]>(programs);
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
        <SubNav page="programs" />
        <div
          className={searchStyles.searchContainer}
          style={{
            backgroundColor: SearchColors.background.secondary,
            color: SearchColors.text.secondary,
          }}
        >
          <div className={searchStyles.searchHead}>
            <div className={searchStyles.icon}>
              <img
                src={"/icons/programs.png"}
                alt="Programs Icon"
                className={styles.icon}
              />
              <h1>Programs</h1>
            </div>
            <input
              type="text"
              placeholder="Search Programs"
              className={styles.search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  const text = e.currentTarget.value;
                  setFilters([...filters, text]);
                  e.currentTarget.value = "";
                  setSearch("");
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
                    style={{
                      backgroundColor: SearchColors.background.fill,
                      color: SearchColors.text.secondary,
                    }}
                  >
                  <h5> 🞨 {filter}</h5>
                  </div>
                );
              })}
            </div>
            <hr />
          </div>
          {/* Selected Programs */}

          <div
            className={styles.programContainer}
            style={{
              backgroundColor: SearchColors.background.primary,
              color: SearchColors.text.primary,
            }}
          >
            {selectedPrograms
              .filter((program) => {
                if (filters.length === 0) {
                  return program;
                }
                return filters.every((filter) => {
                  return (
                    modIncludes(program.program_name, filter) ||
                    modIncludes(program.program_description, filter) ||
                    modIncludes(program.program_focus.join(", "), filter) ||
                    modIncludes(program.department_name, filter) ||
                    modIncludes(program.organization_name, filter)
                  );
                });
              })
              .filter((program) => {
                if (search === "") {
                  return program;
                } else if (
                  modIncludes(program.program_name, search) ||
                  modIncludes(program.program_description, search) ||
                  modIncludes(program.program_focus.join(", "), search) ||
                  modIncludes(program.department_name, search) ||
                  modIncludes(program.organization_name, search)
                ) {
                  return program;
                }
                return null;
              })
              .map((program) => {
                return (
                  <div
                    key={program.program_id}
                    className={styles.program}
                    style={{
                      backgroundColor: SearchColors.background.fill,
                    }}
                  >
                    <div className={styles.programName}>
                      <h2>{program.program_name}</h2>
                      <p>{
                        program.program_description.length > 200 ?
                          program.program_description.substring(0, 200) + "..." : 
                          program.program_description
                      }</p>
                      <button
                        className={styles.readMore}
                        onClick={() => {
                          window.location.href = `/programs/${program.program_name}`;
                        }}
                        style={{
                          backgroundColor: SearchColors.button.primary,
                          color: SearchColors.text.over,
                        }}
                      >
                        {" "}
                        Learn More
                      </button>
                    </div>
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

export default Programs;
