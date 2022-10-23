import Head from "next/head";

import { useAuth } from "../components/Firebase/auth";
import {useRouter} from "next/router";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import {useDb} from "../components/Firebase/db";
import React, {useEffect, useState} from "react";

export default function School() {
  const db = useDb();
  const [data, setData] = useState("");
  const router = useRouter();

  useEffect(async () => {
    if (!db || !router) return;
    setData(await db.getSchool(router.query.id));
  }, [db === null, router === null]);

  if (!db || !router) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <Head>
        <title>{data.data().name}</title>
        <meta
          name="description"
          content={data.data().name}
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
