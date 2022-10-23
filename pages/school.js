import Head from "next/head";
import Link from "next/link";

import { useAuth } from "../components/Auth/auth";
import {useRouter} from "next/router";
import {useEffect} from "react";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";

export default function School() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (!user)
      router.push("/login");
  }, [user]);

  // loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={[styles.container]}>
      <Head>
        <title>University of Washington</title>
        <meta
          name="description"
          content="Login"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full h-full flex flex-col justify-start">
        <div className="w-full h-52 " style={{ backgroundImage: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)" }}>
          <Navbar/>

        </div>
      </div>

    </div>
  );
}
