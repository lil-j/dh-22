import Head from "next/head";

import { useAuth } from "../components/Firebase/auth";
import {useRouter} from "next/router";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import {useDb} from "../components/Firebase/db";
import React, {useEffect, useState} from "react";

export default function School() {
  const db = useDb();
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(async () => {
    if (db == null || router == null) return;
    const temp = await db.getSchool("3oTyZU3QUoVIBLOkAIZL");
    setData(temp);
    console.log(temp);
  }, [db === null, router === null]);

  if (!db || !router) return <p>Loading...</p>;

  return data ? (
    <div className={styles.container}>


      <Head>
        <title>{data.name}</title>
        <meta
          name="description"
          content={data.name}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full h-full flex flex-col justify-start">
        <div className="w-full h-52 " style={{ backgroundImage: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)" }}>
          <Navbar/>
          <div className={"my-10 h-20 ml-10"}>
            <h1 className={"text-white el-mesiri-font text-6xl"}>{data.name}</h1>
          </div>
        </div>
        <div className={"p-10"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut ipsum at nibh luctus porta. In neque massa, posuere id urna at, rhoncus ornare justo. Mauris neque sem, ornare a accumsan quis, sagittis nec velit. Aliquam erat volutpat. Cras sit amet varius quam. Quisque a mi vel urna viverra vestibulum. Pellentesque fringilla dui dolor, eget convallis erat suscipit eu. Fusce consectetur nulla quis interdum scelerisque. Mauris dapibus porttitor viverra. Etiam ornare diam vitae auctor tincidunt. Fusce ac arcu eget ante vestibulum pellentesque. Nullam pellentesque gravida ex, id consectetur sapien molestie quis. Etiam ut dolor eget elit vulputate rhoncus. Cras vitae dui ullamcorper, vulputate arcu et, imperdiet velit.

          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum aliquam sit amet turpis at consequat. Curabitur ac urna blandit, congue quam id, eleifend mi. Proin id porttitor metus, nec congue eros. Fusce quis mauris cursus lectus dapibus dignissim id in metus. Maecenas tristique erat nec mauris congue rhoncus. Donec rhoncus purus ac efficitur mollis. Ut eu est vel ipsum euismod semper. Sed convallis nibh auctor congue imperdiet. Mauris eros augue, dignissim eu venenatis in, gravida at ligula. Proin tristique, neque eu rhoncus rhoncus, tellus mi consectetur velit, nec pharetra nibh augue non orci. Donec id dignissim mi, eu dictum leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis eu tincidunt neque.

          Donec luctus massa sit amet neque aliquam, in ornare purus mollis. Donec a libero placerat, accumsan nulla in, cursus tellus. Proin sagittis elit enim, ut consectetur tortor convallis vitae. Donec a arcu iaculis, cursus enim ut, euismod ante. Vivamus sit amet tellus nec nibh sollicitudin bibendum. Pellentesque vel molestie ligula. Morbi quis sapien vitae orci condimentum condimentum id vitae nunc. Phasellus ultrices vehicula justo, at ultricies purus feugiat sit amet.

          Vivamus lobortis et nibh sit amet ultrices. Aliquam eget finibus sem. Proin dignissim tristique lectus vel viverra. Aenean lacinia porta condimentum. Duis id porta est, eu facilisis enim. Aliquam in sapien at magna porttitor pretium. Morbi dictum iaculis fermentum. Suspendisse potenti. Etiam dictum sodales erat, id venenatis nulla lobortis hendrerit. Proin placerat consequat purus. Ut bibendum magna a ligula pulvinar luctus ac vitae orci. Duis porta, lectus quis porttitor ultrices, purus diam vestibulum ex, et elementum leo ipsum dignissim justo. Nullam a ipsum blandit, feugiat risus egestas, viverra eros. Nulla facilisi.

          Aliquam at massa at orci dictum vestibulum. Fusce maximus orci non pharetra sagittis. Quisque at viverra ante, quis egestas lacus. Mauris suscipit nec purus at sollicitudin. Mauris laoreet orci ac viverra tristique. Proin aliquet vel turpis sit amet feugiat. Curabitur luctus tincidunt lacus ut sodales. Curabitur semper sodales libero, vel facilisis velit tempor sed. Cras cursus sit amet nisl nec sodales.
        </div>
      </div>
    </div>
  ) : <></>;
}
