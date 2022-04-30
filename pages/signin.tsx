import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginAsync } from "../app/_reducers/user.thunk";
import { UserState } from "../app/_constants/user.types";

import DefaultFooter from "../library/components/anchors/footer";
import DefaultHeader from "../library/components/anchors/header";

import defaultStyles from "../styles/pages/Default.module.css";
import style from "../styles/pages/Signin.module.css";
import TextInput from "../library/utils/input/text";
import { navColors } from "../styles/_colors";

const Signin: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");

  const { status } = useAppSelector<UserState>((state) => state?.user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }
    dispatch(
        //@ts-ignore
      loginAsync({
        email,
        password,
      })
    );
  };

  useEffect(() => {
    switch (status) {
      case "loaded":
        router.push("/");
        break;
      case "error":
        setError("Invalid email or password");
        break;
      default:
        break;
    }
  }, [status]);

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

            <p>Don't have an account?</p>
          </form>
        </div>
      </main>
      <DefaultFooter />
    </div>
  );
};

export default Signin;
