import Head from "next/head";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";

import colors from "../styles/colors";
import { useAuth } from "../components/Firebase/auth";
import { setErrorMessage } from "../components/Firebase/setErrorMessage";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {config} from "../components/Firebase/config";

const Login = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(getAuth(initializeApp(config)));
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (event, email, password) => {
    event.preventDefault();

    if (!auth) return null;

    auth
      .signIn(email, password)
      .then(() => {
        // do something after signing in. For example, router.push("/");
        router.push("/profile");
      })
      .catch((error) => {
        let { title, description } = setErrorMessage(error);
        // do something with error title and description here
        alert(title + ": " + description);
      });
  };

  // loading state
  if (!auth) {
    return <p>Loading...</p>;
  }

  console.log("rendering");
  return (
    <div className="">
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Login"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-md mx-auto mt-20">
        <h1 className="text-2xl font-bold">Login</h1>
        <br />
        <form
          onSubmit={async (event) => await signIn(event, email, password)}
        >
          <div className="flex-initial flex-col">
            <label htmlFor="email" className="inline-block mt-6 mb-3" >Email Address</label>
            <input
              className="w-full border-dashed border-2 border-inherit py-1 px-1 rounded"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="password" className="inline-block mt-6 mb-3" >Password</label>
            <input
              className="w-full border-dashed border-2 border-inherit py-1 px-1 rounded"
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="self-center block rounded px-3 py-2 mx-auto mt-10 text-white"  style={{ backgroundColor: colors.PRIMARY }}  type="submit">
              Login
            </button>
          </div>
        </form>
        <br></br>
        <Link href="/">&larr; Go back</Link>
      </main>
    </div>
  );
};

export default Login;
