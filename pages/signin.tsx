import type { NextPage } from "next";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginAsync } from "../app/_reducers/user.thunk";
import { UserState } from "../app/_constants/user.types";

import DefaultFooter from "../library/components/anchors/footer";
import DefaultHeader from "../library/components/anchors/header";

import style from "../styles/pages/Signin.module.css";
import TextInput from "../library/utils/input/text";

const Signin: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [redirect, setRedirect] = useState("/");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");

  const { status } = useAppSelector<UserState>((state) => state.user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }
    dispatch(
      loginAsync({
        email,
        password,
      })
    );
  };

  useEffect(() => {
    switch (status) {
      case "loaded":
        router.push(redirect);
        break;
      case "error":
        setError("Invalid email or password");
        break;
      default:
        break;
    }
  }, [status, router]);

  useEffect(() => {
    if ( router && router.query.redirect ) {
      setError("You must be logged in to access this page");
      setRedirect(String(router.query.redirect));
    }
  }, [router]);

  return (
    <div>
      <Head>
        <title>Signin</title>
        <meta name="description" content="Signin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultHeader />
      <main>
        {status === "loading" && <p>Loading...</p>}
        <div className={style.formWrapper}>
          <form onSubmit={handleSubmit}>
            <h1 id="title">Sign In</h1>
            <TextInput
              name="email"
              id="email"
              label="Email"
              placeholder="Email"
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              maxLimit={255}
            />
            <TextInput
              name="password"
              id="password"
              label="Password"
              placeholder="Password"
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              maxLimit={255}
            />
            {error && (
              <p className={style.error} style={{ color: "red" }}>
                {error}
              </p>
            )}

            <button type="submit">Sign In</button>

            <p>Do not have an account?</p>
          </form>
        </div>
      </main>
      <DefaultFooter />
    </div>
  );
};

Signin.getInitialProps = ({ query }) => {
  return { query };
}

export default Signin;
