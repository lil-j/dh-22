import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";
import colors from "../styles/colors";
import { useAuth } from "../components/Auth/auth";
import { setErrorMessage } from "../components/Auth/setErrorMessage";

const Login = () => {
  const router = useRouter();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (event, email, password) => {
    event.preventDefault();

    auth
      .signIn(email, password)
      .then(() => {
        // do something after signing in. For example, router.push("/");
        router.push("/");
      })
      .catch((error) => {
        let { title, description } = setErrorMessage(error);
        // do something with error title and description here
        alert(title + ": " + description);
      });
  };

  // loading state
  if (auth.loading) {
    return <p>Loading...</p>;
  }

  // if a user is logged in, redirect to a page of your liking
  if (auth.user) {
    router.push("/");
    return null;
  }

  console.log("rendering");
  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Login"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Login</h1>
        <br />
        <form
          onSubmit={(event) => signIn(event, email, password)}
        >
          <div className="flex-initial flex-col">
            <label htmlFor="email" className="inline-block my-6" >Email Address</label>
            <input
              className="w-full border-dashed border-2 border-inherit py-1 px-1"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="password" className="inline-block my-6" >Password</label>
            <input
              className="w-full border-dashed border-2 border-inherit py-1 px-1"
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="self-center block rounded px-3 py-2 mx-auto mt-10"  style={{ backgroundColor: colors.PRIMARY }}  type="submit">
              Submit
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
