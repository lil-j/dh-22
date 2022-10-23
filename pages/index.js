import Head from "next/head";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useDb} from "../components/Firebase/db";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import SearchBar from "../components/Searchbar";
import Button from "../components/Button";

export default function Home() {
    const db = useDb();
    const [schoolData, setSchoolData] = useState(null);

    useEffect(async () => {
        if (db) {
            console.log("HERE1");
            console.log(db);
            setSchoolData(await db.getSchools());
        }
    }, [db === null]);

    // loading state
    if (!db) {
        return <p>Loading...</p>;
    }

    if (schoolData) {
        schoolData.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    }

    return (
      <div className={styles.container}>
          <Head>
              <title>Home</title>
              <meta
                name="description"
                content="Home"
              />
              <link rel="icon" href="/favicon.ico" />
          </Head>

          <div className="w-full h-full flex flex-col justify-start" style={{ backgroundImage: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)" }}>
              <Navbar noSearchBar/>
              <div className={"absolute left-[12.5%] top-[30%] w-[50%]"}>
                  <h1 className="el-mesiri-font text-8xl text-white">
                      Earn off your success
                  </h1>
                  <br></br>
                  <div className="flex flex-row items-start">
                      <SearchBar/>
                      <Button className={"ml-5 top-0 mb-auto mt-3"} text={"Go!"} />
                  </div>
              </div>
          </div>

      </div>
    );
}
